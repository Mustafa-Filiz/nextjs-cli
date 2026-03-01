import { Commands } from "../types";

export const DB_LIBRARIES = ["prisma"] as const;

export type DbLibraries = (typeof DB_LIBRARIES)[number];

export type DbLibraryCommands = Record<DbLibraries, Record<Commands, string[]>>;

export function isUILibrary(val: string): val is DbLibraries {
  return (DB_LIBRARIES as readonly string[]).includes(val);
}

export const UI_LIBRARY_COMMANDS: DbLibraryCommands = {
  prisma: {
    dependencies: ["@prisma/client", "@prisma/adapter-pg", "dotenv", "pg"],
    devDependencies: ["prisma", "tsx", "@types/pg"],
    executeCommands: [
      "prisma",
      "init",
      "--db",
      "--output",
      "../app/generated/prisma",
    ],
  },
};
