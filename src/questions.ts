import { confirm, input, select } from "@inquirer/prompts";

export async function askQuestions() {
  const projectName = await input({
    message: "Enter project name",
  });

  const uiLibrary = await select({
    message: "Which UI Library do you want to use?",
    choices: [
      { name: "Ant Design", value: "antd" },
      { name: "Chakra UI", value: "chakra" },
      { name: "Prime React", value: "prime" },
      { name: "shadcn/ui", value: "shadcn" },
      { name: "Material UI", value: "mui" },
      { name: "Mantine", value: "mantine" },
      { name: "None", value: "none" },
    ],
  });

  const authLibrary = await select({
    message: "Which Auth Library do you want to use?",
    choices: [
      { name: "Better Auth", value: "better-auth" },
      { name: "Next Auth", value: "next-auth" },
      { name: "None", value: "none" },
    ],
  });

  const db = await select({
    message: "Which Database Platform do you want to use?",
    choices: [
      { name: "Prisma", value: "prisma" },
      { name: "Drizzle", value: "drizzle" },
      { name: "None", value: "none" },
    ],
  });

  const hasTanstackQuery = await confirm({
    message: "Do you want to install Tanstack Query?",
  });

  return { projectName, uiLibrary, authLibrary, db, hasTanstackQuery };
}
