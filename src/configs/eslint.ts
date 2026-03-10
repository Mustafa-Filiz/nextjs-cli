import path from "path";
import { installDevDependencies } from "../helpers/install-packages.js";
import { fileEditor } from "../helpers/file-editor.js";

export const createEslintConfig = (projectName: string) => {
  const targetDir = path.join(process.cwd(), projectName);

  installDevDependencies(projectName, [
    "typescript-eslint",
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks",
    "eslint-plugin-simple-import-sort",
    "eslint-config-prettier",
    "eslint-plugin-prettier",
  ]);

  const eslintFilePath = path.join(targetDir, "eslint.config.mjs");

  fileEditor.overwrite(
    eslintFilePath,
    `
    import { defineConfig, globalIgnores } from 'eslint/config'
    import nextVitals from 'eslint-config-next/core-web-vitals'
    import nextTs from 'eslint-config-next/typescript'
    import tseslint from 'typescript-eslint'
    import simpleImportSort from 'eslint-plugin-simple-import-sort'
    import prettierPlugin from 'eslint-plugin-prettier'
    import prettierConfig from 'eslint-config-prettier'

    const eslintConfig = defineConfig([
      ...tseslint.configs.recommended,
      ...nextVitals,
      ...nextTs,
      {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
          'simple-import-sort': simpleImportSort,
          prettier: prettierPlugin,
        },
        rules: {
          'prettier/prettier': 'error',
          'simple-import-sort/imports': [
            'error',
            {
              groups: [
                ['^\\u0000'],
                ['^node:'],
                ['^react$', '^react/', '^next$', '^next/'],
                ['^@?\\w'],
                ['^@/'],
                ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                ['^.*\\u0000$'],
              ],
            },
          ],
          'simple-import-sort/exports': 'error',
          'react/no-unescaped-entities': 'off',
          '@next/next/no-page-custom-font': 'off',
          '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
          '@typescript-eslint/no-explicit-any': 'warn',
          '@typescript-eslint/consistent-type-imports': [
            'error',
            { prefer: 'type-imports' },
          ],
          'react/self-closing-comp': 'warn',
          'react-hooks/rules-of-hooks': 'error',
          'react-hooks/exhaustive-deps': 'warn',
          'no-console': ['warn', { allow: ['warn', 'error'] }],
          'prefer-const': 'error',
          'no-var': 'error',
        },
      },

      globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'dist/**',
        'node_modules/**',
        'next-env.d.ts',
        '*.config.js',
        'public/**',
      ]),
    ])

    export default eslintConfig

    `,
  );
};
