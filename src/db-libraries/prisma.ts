import path from "path";
import { fileEditor } from "../helpers/file-editor.js";
import {
  executeCommands,
  installDependencies,
  installDevDependencies,
} from "../helpers/install-packages.js";

export const createPrismaFiles = (projectName: string) => {
  const targetDir = path.join(process.cwd(), projectName);

  installDependencies(projectName, [
    "@prisma/client",
    "@prisma/adapter-pg",
    "dotenv",
    "pg",
  ]);
  installDevDependencies(projectName, ["prisma", "tsx", "@types/pg"]);

  executeCommands(projectName, [
    "prisma",
    "init",
    "--db",
    "--output",
    "../app/generated/prisma",
  ]);

  executeCommands(projectName, ["prisma", "migrate", "dev", "--name", "init"]);
  executeCommands(projectName, ["prisma", "generate"]);

  fileEditor.create(
    path.join(targetDir, "lib/prisma.ts"),
    `\
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
`,
  );
};
