import { newLayoutWithAntd } from "./antd";
import { newLayoutWithChakra } from "./chakra";
import { newLayoutWithMantine } from "./mantine";
import { newLayoutWithMui } from "./mui";
import { UILibraries } from "./types";
export * from "./types";

export const changeLayoutFiles: Partial<
  Record<UILibraries, (projectName: string) => void>
> = {
  antd: (projectName: string) => newLayoutWithAntd(projectName),
  chakra: (projectName: string) => newLayoutWithChakra(projectName),
  mui: (projectName: string) => newLayoutWithMui(projectName),
  mantine: (projectName: string) => newLayoutWithMantine(projectName),
};
