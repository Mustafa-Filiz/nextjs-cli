import { Commands } from "../types";

export const AUTH_LIBRARIES = ["better-auth"] as const;

export type AuthLibraries = (typeof AUTH_LIBRARIES)[number];

export type AuthLibraryCommands = Record<
  AuthLibraries,
  Record<Commands, string[]>
>;

export function isAuthLibrary(val: string): val is AuthLibraries {
  return (AUTH_LIBRARIES as readonly string[]).includes(val);
}

export const AUTH_LIBRARY_COMMANDS: AuthLibraryCommands = {
  "better-auth": {
    dependencies: ["better-auth"],
    devDependencies: [],
    executeCommands: [],
  },
};
