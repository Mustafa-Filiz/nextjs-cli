import path from "path";
import { fileEditor } from "../helpers/file-editor";

export const newLayoutWithMantine = (projectName: string) => {
  const targetDir = path.join(process.cwd(), projectName);
  const filePath = path.join(targetDir, "app/layout.tsx");

  fileEditor.insertAfter(
    filePath,
    `plugins: {`,
    `'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },`,
  );

  fileEditor.insertAfter(
    filePath,
    `import "./globals.css"`,
    `import '@mantine/core/styles.css';
    import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';`,
  );

  fileEditor.insertAfter(
    filePath,
    `<html lang="en">`,
    `<head>
        <ColorSchemeScript />
      </head>`,
  );

  fileEditor.replace(
    filePath,
    `<html lang="en">`,
    `<html lang="en" {...mantineHtmlProps}>`,
  );

  fileEditor.replace(
    filePath,
    "{children}",
    "<MantineProvider>{children}</MantineProvider>",
  );
};
