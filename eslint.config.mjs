import tsPlugin from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import fs from "node:fs";

const autoImportGlobals = JSON.parse(
  fs.readFileSync("./.eslintrc-auto-import.json", "utf-8")
).globals;

const eslintConfig = defineConfig([
  {
    extends: [tsPlugin.configs.recommended, js.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...autoImportGlobals,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "off",
      "no-redeclare": "off", // Disable base rule as it doesn't understand overloads
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "react/prop-types": "off",
      "react-hooks/immutability": "off",
    },
  },
  globalIgnores(["dist", "build"]),
]);

export default eslintConfig;
