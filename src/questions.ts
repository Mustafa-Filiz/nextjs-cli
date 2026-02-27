import { select } from "@inquirer/prompts";

export async function askQuestions() {
  const uiLibrary = await select({
    message: "UI Library?",
    choices: [
      { name: "Ant Design", value: "antd" },
      { name: "Chakra UI", value: "@chakra-ui/react" },
      { name: "Prime React", value: "primereact" },
      { name: "None", value: "none" },
    ],
  });

  const authLibrary = await select({
    message: "Auth Library?",
    choices: [
      { name: "Better Auth", value: "better-auth" },
      { name: "Next Auth", value: "next-auth" },
      { name: "None", value: "none" },
    ],
  });

  const db = await select({
    message: "Database Platform",
    choices: [{ name: "Prisma", value: "prisma" }],
  });

  return { uiLibrary, authLibrary, db };
}
