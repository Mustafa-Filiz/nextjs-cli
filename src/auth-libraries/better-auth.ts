import { execSync } from "child_process";
import path from "node:path";
import { fileEditor } from "../helpers/file-editor";
import { error } from "../helpers/log";
import spawn from "cross-spawn";

export const createBetterAuthFiles = (projectName: string) => {
  const targetDir = path.join(process.cwd(), projectName);

  const betterAuthSecret = execSync("openssl rand -base64 32", {
    encoding: "utf-8",
    cwd: targetDir,
  });

  const envPath = path.join(targetDir, ".env");

  fileEditor.append(
    envPath,
    `
        BETTER_AUTH_SECRET=${betterAuthSecret}
        BETTER_AUTH_URL=http://localhost:3000 # Base URL of your app
    `,
  );

  const authLibFilePath = path.join(targetDir, "lib/auth.ts");

  fileEditor.create(
    authLibFilePath,
    `
        import { betterAuth } from "better-auth";
        import { prismaAdapter } from "better-auth/adapters/prisma";
        // If your Prisma file is located elsewhere, you can change the path
        import { PrismaClient } from "@/generated/prisma/client";

        const prisma = new PrismaClient();
        export const auth = betterAuth({
            database: prismaAdapter(prisma, {
                provider: "postgresql",
            }),
        });
    `,
  );

  const generateAuthTables = spawn.sync("npx", ["auth@latest", "generate"]);

  if (generateAuthTables.error || generateAuthTables.status !== 0) {
    error(`Error while generating auth tables`);
    process.exit(1);
  }

  const authApiFilePath = path.join(
    targetDir,
    "app/api/auth/[...all]/route.ts",
  );

  fileEditor.create(
    authApiFilePath,
    `
        import { auth } from "@/lib/auth"; // path to your auth file
        import { toNextJsHandler } from "better-auth/next-js";

        export const { POST, GET } = toNextJsHandler(auth);
    `,
  );

  const authClientFilePath = path.join(targetDir, "lib/auth-client.ts");

  fileEditor.create(
    authClientFilePath,
    `
        import { createAuthClient } from "better-auth/react"
        export const authClient = createAuthClient({
            /** The base URL of the server (optional if you're using the same domain) */
            baseURL: "http://localhost:3000"
        })
    `,
  );
};
