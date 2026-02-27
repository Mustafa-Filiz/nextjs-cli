import spawn from "cross-spawn";
import { error, info, success } from "./log";

export function createNextApp(projectName: string) {
  info(`Creating ${projectName}...`);

  const result = spawn.sync(
    "npx",
    ["create-next-app@latest", projectName, "--yes"],
    {
      stdio: "inherit",
    },
  );

  if (result.status === 0) {
    success("Project created successfully");
  } else {
    error("Error occured while creating project");
  }
}
