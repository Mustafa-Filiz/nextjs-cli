import spawn from "cross-spawn";
import { error, info, success } from "./log";
import path from "path";

export function installDependencies(
  projectName: string,
  dependencies: string[],
) {
  const targetDir = path.join(process.cwd(), projectName);

  info(`Installing ${dependencies.join(", ")} using npm...`);

  const result = spawn.sync("npm", ["install", ...dependencies], {
    stdio: "inherit",
    cwd: targetDir,
  });

  if (result.error || result.status !== 0) {
    error(
      `Installation failed. npm exited with code ${result.status || result.error?.message}`,
    );
    process.exit(1);
  }

  success(`Successfully installed: ${dependencies.join(", ")}`);
}

export function installDevDependecies(
  projectName: string,
  devDependencies: string[],
) {
  const targetDir = path.join(process.cwd(), projectName);

  info(`Installing ${devDependencies.join(", ")} using npm...`);

  const result = spawn.sync("npm", ["install", "-D", ...devDependencies], {
    stdio: "inherit",
    cwd: targetDir,
  });

  if (result.error || result.status !== 0) {
    error(
      `Installation failed. npm exited with code ${result.status || result.error?.message}`,
    );
    process.exit(1);
  }

  success(`Successfully installed: ${devDependencies.join(", ")}`);
}

export function installExecuteCommands(
  projectName: string,
  commands: string[],
) {
  const targetDir = path.join(process.cwd(), projectName);

  info(`Executing ${commands.join(", ")} using npx...`);

  const result = spawn.sync("npx", commands, {
    stdio: "inherit",
    cwd: targetDir,
  });

  if (result.error || result.status !== 0) {
    error(
      `Installation failed. npx exited with code ${result.status || result.error?.message}`,
    );
    process.exit(1);
  }

  success(`Successfully installed: ${commands.join(", ")}`);
}
