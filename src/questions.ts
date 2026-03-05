import { confirm, input } from "@inquirer/prompts";

export async function askQuestions() {
  const projectName = await input({
    message: "Enter project name",
    default: "my-app",
  });

  const hasAntDesign = await confirm({
    message: "Do you want to install Ant Design?",
    default: true,
  });

  const hasBetterAuth = await confirm({
    message: "Do you want to install Better Auth?",
    default: true,
  });

  const hasPrisma = await confirm({
    message: "Do you want to install Prisma?",
    default: true,
  });

  const hasTanstackQuery = await confirm({
    message: "Do you want to install Tanstack Query?",
    default: true,
  });

  return {
    projectName,
    hasAntDesign,
    hasBetterAuth,
    hasPrisma,
    hasTanstackQuery,
  };
}
