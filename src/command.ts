import { Command } from "commander";
import { askQuestions } from "./questions.js";
import { createAntdFiles } from "./ui-libraries/antd.js";
import { createPrismaFiles } from "./db-libraries/prisma.js";
import { createBetterAuthFiles } from "./auth-libraries/better-auth.js";
import { success } from "./helpers/log.js";
import { createNextApp } from "./helpers/create-next-app.js";

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

    // if (hasTanstackQuery) {
    //   installDependencies(projectName, ["@tanstack/react-query"]);
    // }

    success("Project setup is complete! Happy coding! 🚀");
  });
