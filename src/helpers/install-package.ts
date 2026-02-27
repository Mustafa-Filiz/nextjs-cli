import spawn from "cross-spawn";
import { error, success } from "./log";

export function installPackage(packageName: string) {
  const result = spawn.sync("npm", ["install", packageName], {
    stdio: "inherit",
  });

  if (result.status === 0) {
    success("Package installed successfully");
  } else {
    error("Error occured while installing package");
  }
}
