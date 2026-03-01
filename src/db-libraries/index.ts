import { createPrismaFiles } from "./prisma";
import { DbLibraries } from "./types";

export const createDbFiles: Partial<
  Record<DbLibraries, (projectName: string) => void>
> = {
  prisma: (projectName: string) => createPrismaFiles(projectName),
};
