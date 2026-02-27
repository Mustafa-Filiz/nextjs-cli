import path from "path";
import { fileEditor } from "../helpers/file-editor";

export const newLayoutWithAntd = (projectName: string) => {
  const targetDir = path.join(process.cwd(), projectName);
  const filePath = path.join(targetDir, "app/layout.tsx");

  fileEditor.insertAfter(
    filePath,
    `import "./globals.css"`,
    `import { AntdRegistry } from '@ant-design/nextjs-registry';`,
  );
  fileEditor.replace(
    filePath,
    "{children}",
    "<AntdRegistry>{children}</AntdRegistry>",
  );
};
