import path from "path";
import { fileEditor } from "../helpers/file-editor.js";

export const createVsCodeSettings = (projectName: string) => {
  const targetDir = path.join(process.cwd(), projectName);

  const vsCodeSettingsPath = path.join(targetDir, ".vscode/settings.json");
  fileEditor.create(
    vsCodeSettingsPath,
    `
        {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": "always",
            "source.organizeImports": "never"
        },
        "eslint.useFlatConfig": true,
        "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
        "[typescriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }
        }
        `,
  );
};
