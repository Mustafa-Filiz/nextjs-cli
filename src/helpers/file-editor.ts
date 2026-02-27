import fs from "fs";
import path from "path";
import { error } from "./log";

export const fileEditor = {
  append(filePath: string, content: string) {
    fs.appendFileSync(filePath, content, "utf-8");
  },

  insertAfter(filePath: string, searchLine: string, newContent: string) {
    const lines = fs.readFileSync(filePath, "utf-8").split("\n");
    const index = lines.findIndex((l) => l.includes(searchLine));

    if (index === -1) {
      error(`"${searchLine}" couldn't find → ${filePath}`);
      process.exit(1);
    }

    lines.splice(index + 1, 0, newContent);
    fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
  },

  replace(filePath: string, search: string | RegExp, replace: string) {
    const content = fs.readFileSync(filePath, "utf-8");
    fs.writeFileSync(filePath, content.replace(search, replace), "utf-8");
  },

  overwrite(filePath: string, content: string) {
    fs.writeFileSync(filePath, content, "utf-8");
  },
};
