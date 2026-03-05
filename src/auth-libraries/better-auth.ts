import { execSync } from "child_process";
import path from "path";
import { fileEditor } from "../helpers/file-editor.js";
import { info } from "../helpers/log.js";
import {
  executeCommands,
  installDependencies,
} from "../helpers/install-packages.js";

export const createBetterAuthFiles = (projectName: string) => {
  const targetDir = path.join(process.cwd(), projectName);

  installDependencies(projectName, [
    "better-auth",
    "@better-auth/prisma-adapter",
  ]);

  const betterAuthSecret = execSync("openssl rand -base64 32", {
    encoding: "utf-8",
    cwd: targetDir,
  }).trim();

  const envPath = path.join(targetDir, ".env");

  fileEditor.append(
    envPath,
    `\n\
BETTER_AUTH_SECRET=${betterAuthSecret}
BETTER_AUTH_URL=http://localhost:3000 # Base URL of your app
`,
  );

  fileEditor.create(
    path.join(targetDir, "lib/auth.ts"),
    `\
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
`,
  );

  info(
    "Better Auth setup is complete. Generating auth tables and applying migrations...",
  );

  executeCommands(projectName, ["auth@latest", "generate"]);

  fileEditor.create(
    path.join(targetDir, "app/api/auth/[...all]/route.ts"),
    `\
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
`,
  );

  fileEditor.create(
    path.join(targetDir, "lib/auth-client.ts"),
    `\
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
`,
  );
};
