import { createBetterAuthFiles } from "./better-auth";
import { AuthLibraries } from "./types";

export const createAuthFiles: Partial<
  Record<AuthLibraries, (projectName: string) => void>
> = {
  "better-auth": (projectName: string) => createBetterAuthFiles(projectName),
};
