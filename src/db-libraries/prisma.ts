import path from "path";
import { fileEditor } from "../helpers/file-editor";
import spawn from "cross-spawn";
import { error } from "../helpers/log";

export const createPrismaFiles = (projectName: string) => {
  const targetDir = path.join(process.cwd(), projectName);

  const configPath = path.join(targetDir, "prisma.config.ts");

  fileEditor.appendStart(configPath, `import "dotenv/config";`);

  const prismaMigrate = spawn.sync("npx", [
    "prisma",
    "migrate",
    "dev",
    "--name",
    "init",
  ]);

  if (prismaMigrate.error || prismaMigrate.status !== 0) {
    error(`Prisma migrate error`);
    process.exit(1);
  }

  const generateClient = spawn.sync("npx", ["prisma", "generate"]);

  if (generateClient.error || generateClient.status !== 0) {
    error(`Prisma client generate error`);
    process.exit(1);
  }

  const prismaClientFilePath = path.join(targetDir, "lib/prisma.ts");

  fileEditor.create(
    prismaClientFilePath,
    `
        import { PrismaClient } from "../app/generated/prisma/client"; 
        import { PrismaPg } from "@prisma/adapter-pg"; 

        const globalForPrisma = global as unknown as { prisma: PrismaClient }; 
        const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL }); 
        const prisma = globalForPrisma.prisma || new PrismaClient({ adapter}); 

        if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 
        
        export default prisma; 
    `,
  );
};
