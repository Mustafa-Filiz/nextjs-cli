import path from "path";
import { fileEditor } from "../helpers/file-editor.js";
import { installDevDependencies } from "../helpers/install-packages.js";

export const createPrettierConfig = (projectName: string) => {
  const targetDir = path.join(process.cwd(), projectName);

  installDevDependencies(projectName, ["prettier"]);

  const prettierFilePath = path.join(targetDir, ".prettierrc");
  fileEditor.create(
    prettierFilePath,
    `
    {
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 120,
    tabWidth: 2,
    useTabs: false,
    arrowParens: 'always',
    objectWrap: 'preserve',
    bracketSpacing: true,
    bracketSameLine: false,
    }
    `,
  );

  const prettierIgnoreFilePath = path.join(targetDir, ".prettierignore");

  fileEditor.create(
    prettierIgnoreFilePath,
    `
    node_modules
    .next
    .out
    .dist
    .build
    .cache
    public
    `,
  );
};
