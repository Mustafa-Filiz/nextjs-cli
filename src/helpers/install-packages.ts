import spawn from "cross-spawn";
import { error, info, success } from "./log";
import path from "path";

interface InstallPackagesOptions {
  dependencies?: string[];
  devDependencies?: string[];
  executeCommands?: string[];
  projectName: string;
}

export function installPackages({
  dependencies = [],
  devDependencies = [],
  executeCommands = [],
  projectName,
}: InstallPackagesOptions): void {
  const targetDir = path.join(process.cwd(), projectName);

  const packageManager = "npm";
  const installCmd = "install";

  const runInstall = (packages: string[], isDev: boolean) => {
    if (packages.length === 0) return;

    const args = [installCmd, ...(isDev ? ["-D"] : []), ...packages];
    info(
      `Installing ${isDev ? "dev " : ""}dependencies using ${packageManager}...`,
    );

    const result = spawn.sync(packageManager, args, {
      stdio: "inherit",
      cwd: targetDir,
    });

    if (result.error || result.status !== 0) {
      error(
        `Installation failed. ${packageManager} exited with code ${result.status || result.error?.message}`,
      );
      process.exit(1);
    }
  };

  runInstall(dependencies, false);
  runInstall(devDependencies, true);

  if (executeCommands.length > 0) {
    const runnerArg = "npx";

    const fullArgs = [runnerArg, ...executeCommands];
    info(`Executing: ${runnerArg} ${fullArgs.join(" ")}...`);

    const result = spawn.sync(runnerArg, fullArgs, {
      stdio: "inherit",
      cwd: targetDir,
    });

    if (result.error || result.status !== 0) {
      error(`Execution failed for command: ${executeCommands.join(" ")}`);
      process.exit(1);
    }
  }

  success("Project install completed successfully.");
}
