import { Commands } from "../types";

export const UI_LIBRARIES = [
  "antd",
  "shadcn",
  "chakra",
  "prime",
  "mui",
  "mantine",
] as const;

export type UILibraries = (typeof UI_LIBRARIES)[number];

export type UILibraryCommands = Record<UILibraries, Record<Commands, string[]>>;

export function isUILibrary(val: string): val is UILibraries {
  return (UI_LIBRARIES as readonly string[]).includes(val);
}

export const UI_LIBRARY_COMMANDS: UILibraryCommands = {
  antd: {
    dependencies: ["antd", "@ant-design/nextjs-registry"],
    devDependencies: [],
    executeCommands: [],
  },
  shadcn: {
    dependencies: [],
    devDependencies: [],
    executeCommands: ["shadcn@latest", "init"],
  },
  chakra: {
    dependencies: ["@chakra-ui/react", "@emotion/react"],
    devDependencies: [],
    executeCommands: [],
  },
  prime: {
    dependencies: ["primereact"],
    devDependencies: [],
    executeCommands: [],
  },
  mui: {
    dependencies: [
      "@mui/material",
      "@emotion/react",
      "@emotion/styled",
      "@mui/material-nextjs",
      "@emotion/cache",
    ],
    devDependencies: [],
    executeCommands: [],
  },
  mantine: {
    dependencies: ["@mantine/core", "@mantine/hooks"],
    devDependencies: [
      "postcss",
      "postcss-preset-mantine",
      "postcss-simple-vars",
    ],
    executeCommands: [],
  },
};
