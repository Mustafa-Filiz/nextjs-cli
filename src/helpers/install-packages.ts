import spawn from "cross-spawn";
import { error, info, success } from "./log.js";
import path from "path";

function runCommand(
  projectName: string,
  bin: "npm" | "npx",
  args: string[],
  label: string,
): ReturnType<typeof spawn.sync> {
  const targetDir = path.join(process.cwd(), projectName);

  info(`${label}: ${args.join(" ")} ...`);

  const result = spawn.sync(bin, args, {
    stdio: "inherit",
    cwd: targetDir,
  });

  if (result.error || result.status !== 0) {
    error(
      `Failed. ${bin} exited with code ${result.status ?? result.error?.message}`,
    );
  }

  success(`Done: ${args.join(", ")}`);
  return result;
}

export function installDependencies(
  projectName: string,
  dependencies: string[],
) {
  return runCommand(
    projectName,
    "npm",
    ["install", ...dependencies],
    "Installing dependencies",
  );
}

export function installDevDependencies(
  projectName: string,
  devDependencies: string[],
) {
  return runCommand(
    projectName,
    "npm",
    ["install", "-D", ...devDependencies],
    "Installing dev dependencies",
  );
}

export function executeCommands(projectName: string, commands: string[]) {
  return runCommand(projectName, "npx", commands, "Executing commands");
}
