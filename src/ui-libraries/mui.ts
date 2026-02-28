import path from "path";
import { fileEditor } from "../helpers/file-editor";

export const newLayoutWithMui = (projectName: string) => {
  const targetDir = path.join(process.cwd(), projectName);
  const filePath = path.join(targetDir, "app/layout.tsx");

  fileEditor.insertAfter(
    filePath,
    `import "./globals.css"`,
    `+import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';`,
  );
  fileEditor.replace(
    filePath,
    "{children}",
    "<AppRouterCacheProvider>{children}</AppRouterCacheProvider>",
  );
};
