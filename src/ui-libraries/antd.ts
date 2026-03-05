import path from "path";
import { fileEditor } from "../helpers/file-editor.js";
import { installDependencies } from "../helpers/install-packages.js";

export const createAntdFiles = (projectName: string) => {
  const targetDir = path.join(process.cwd(), projectName);
  const filePath = path.join(targetDir, "app/layout.tsx");

  installDependencies(projectName, ["antd", "@ant-design/nextjs-registry"]);

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
