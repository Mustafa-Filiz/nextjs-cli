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
import {
  DB_LIBRARIES,
  DB_LIBRARY_COMMANDS,
  isDBLibrary,
} from "./db-libraries/types";
import { createDbFiles } from "./db-libraries";
import { AUTH_LIBRARY_COMMANDS, isAuthLibrary } from "./auth-libraries/types";
import { createAuthFiles } from "./auth-libraries";

export const program = new Command();

program
  .name("Create Next.js App")
  .description("Create Next.js apps easily")
  .action(async () => {
    const { projectName, uiLibrary, authLibrary, db, hasTanstackQuery } =
      await askQuestions();

    createNextApp(projectName);

    // Install and create files for selected UI Library

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

    // Install and create files for selected DB Library

    if (!isDBLibrary(db)) {
      error(`Geçersiz DB Library: ${db}`);
      process.exit(1);
    }

    const {
      dependencies: dbDeps,
      devDependencies: dbDevDeps,
      executeCommands: dbExecCmd,
    } = DB_LIBRARY_COMMANDS[db];

    installPackages({
      projectName,
      ...(dependencies.length > 0 ? { dependencies: dbDeps } : {}),
      ...(devDependencies.length > 0 ? { devDependencies: dbDevDeps } : {}),
      ...(executeCommands.length > 0 ? { executeCommands: dbExecCmd } : {}),
    });

    createDbFiles[db]?.(projectName);

    // Install and create files for selected Auth Library

    if (!isAuthLibrary(authLibrary)) {
      error(`Geçersiz Auth Library: ${authLibrary}`);
      process.exit(1);
    }

    const {
      dependencies: authDeps,
      devDependencies: authDevDeps,
      executeCommands: authExecCmd,
    } = AUTH_LIBRARY_COMMANDS[authLibrary];

    installPackages({
      projectName,
      ...(dependencies.length > 0 ? { dependencies: authDeps } : {}),
      ...(devDependencies.length > 0 ? { devDependencies: authDevDeps } : {}),
      ...(executeCommands.length > 0 ? { executeCommands: authExecCmd } : {}),
    });

    createAuthFiles[authLibrary]?.(projectName);
  });
