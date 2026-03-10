import { Command } from "commander";
import { askQuestions } from "./questions.js";
import { createAntdFiles } from "./ui-libraries/antd.js";
import { createPrismaFiles } from "./db-libraries/prisma.js";
import { createBetterAuthFiles } from "./auth-libraries/better-auth.js";
import { success } from "./helpers/log.js";
import { createNextApp } from "./helpers/create-next-app.js";
import { createTanstackQueryFiles } from "./tanstack/tanstack.js";
import { createPrettierConfig } from "./configs/prettier.js";
import { createEslintConfig } from "./configs/eslint.js";
import { createVsCodeSettings } from "./configs/vscode.js";

export const program = new Command();

program
  .name("Create Next.js App")
  .description("Create Next.js apps easily")
  .action(async () => {
    const {
      projectName,
      hasAntDesign,
      hasBetterAuth,
      hasPrisma,
      hasTanstackQuery,
    } = await askQuestions();

    createNextApp(projectName);

    if (hasAntDesign) {
      createAntdFiles(projectName);
    }

    if (hasPrisma) {
      createPrismaFiles(projectName);
    }

    if (hasBetterAuth) {
      createBetterAuthFiles(projectName);
    }

    if (hasTanstackQuery) {
      createTanstackQueryFiles(projectName);
    }

    createPrettierConfig(projectName);
    createEslintConfig(projectName);
    createVsCodeSettings(projectName);

    success("Project setup is complete! Happy coding! 🚀");
  });
