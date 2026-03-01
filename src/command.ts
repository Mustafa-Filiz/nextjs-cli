import { Command } from "commander";
import { askQuestions } from "./questions";
import { createNextApp } from "./helpers/create-next-app";
import { installPackages } from "./helpers/install-packages";
import { error } from "./helpers/log";
import {
  changeLayoutFiles,
  isUILibrary,
  UI_LIBRARY_COMMANDS,
} from "./ui-libraries";

export const program = new Command();

program
  .name("Create Next.js App")
  .description("Create Next.js apps easily")
  .action(async () => {
    const { projectName, uiLibrary, authLibrary, db, hasTanstackQuery } =
      await askQuestions();

    createNextApp(projectName);

    if (!isUILibrary(uiLibrary)) {
      error(`Geçersiz UI Library: ${uiLibrary}`);
      process.exit(1);
    }

    const { dependencies, devDependencies, executeCommands } =
      UI_LIBRARY_COMMANDS[uiLibrary];

    installPackages({
      projectName,
      ...(dependencies.length > 0 ? { dependencies } : {}),
      ...(devDependencies.length > 0 ? { devDependencies } : {}),
      ...(executeCommands.length > 0 ? { executeCommands } : {}),
    });

    changeLayoutFiles[uiLibrary]?.(projectName);
  });
