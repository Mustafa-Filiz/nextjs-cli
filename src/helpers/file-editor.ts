import fs from "fs";
import path from "path";
import { error, info } from "./log.js";

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

function writeFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content, "utf-8");
}

export const fileEditor = {
  create(
    filePath: string,
    content: string = "",
    options: { overwrite?: boolean } = {},
  ) {
    const { overwrite = false } = options;

    if (!overwrite && fs.existsSync(filePath)) {
      error(`File already exists: ${filePath}`);
      process.exit(1);
    }

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    writeFile(filePath, content);
    info(`File created: ${filePath}`);
  },

  appendStart(filePath: string, content: string) {
    writeFile(filePath, `${content}\n${readFile(filePath)}`);
    info(`Content prepended: ${filePath}`);
  },

  append(filePath: string, content: string) {
    fs.appendFileSync(filePath, content, "utf-8");
    info(`Content appended: ${filePath}`);
  },

  insertAfter(filePath: string, searchLine: string, newContent: string) {
    const lines = readFile(filePath).split("\n");
    const index = lines.findIndex((l) => l.includes(searchLine));

    if (index === -1) {
      error(`"${searchLine}" not found → ${filePath}`);
      process.exit(1);
    }

    lines.splice(index + 1, 0, newContent);
    writeFile(filePath, lines.join("\n"));
    info(`Content inserted after "${searchLine}": ${filePath}`);
  },

  replace(filePath: string, search: string | RegExp, replacement: string) {
    writeFile(filePath, readFile(filePath).replace(search, replacement));
    info(`Content replaced in: ${filePath}`);
  },

  overwrite(filePath: string, content: string) {
    writeFile(filePath, content);
    info(`File overwritten: ${filePath}`);
  },
};
