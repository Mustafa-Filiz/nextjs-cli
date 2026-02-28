import fs from "fs";
import path from "path";
import { error, info } from "./log";

export const fileEditor = {
  create(
    filePath: string,
    content: string = "",
    options: {
      overwrite?: boolean;
    } = {},
  ) {
    const { overwrite = false } = options;

    if (!overwrite && fs.existsSync(filePath)) {
      error(`Dosya zaten mevcut: ${filePath}`);
      process.exit(1);
    }

    const dir = path.dirname(filePath);
    fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(filePath, content, "utf-8");
    info(`Dosya oluşturuldu: ${filePath}`);
  },

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
