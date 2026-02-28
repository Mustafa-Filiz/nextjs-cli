import path from "path";
import { fileEditor } from "../helpers/file-editor";

export const newLayoutWithChakra = (projectName: string) => {
  const targetDir = path.join(process.cwd(), projectName);
  const filePath = path.join(targetDir, "app/layout.tsx");

  fileEditor.insertAfter(
    filePath,
    `import "./globals.css"`,
    `import { ChakraProvider } from '@chakra-ui/react';`,
  );

  fileEditor.replace(
    filePath,
    "{children}",
    "<ChakraProvider>{children}</ChakraProvider>",
  );
};
