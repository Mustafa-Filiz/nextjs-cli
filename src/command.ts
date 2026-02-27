import { Command } from "commander";
import { askQuestions } from "./questions";

export const program = new Command();

program
  .name("Create Next.js App")
  .description("Create Next.js apps easily")
  .action(async () => {
    const asnwers = await askQuestions();
    console.log("🚀 ~ asnwers:", asnwers);
  });
