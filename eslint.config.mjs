import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  {
    ignores: [
      "**/generated/**",
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "src/generated/**",
      ".next/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React 17+ doesn't require React in scope for JSX
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      // Allow unused vars that start with underscore
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Allow apostrophes in JSX text
      "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
      // Allow any type in specific cases (like Calendar onChange)
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
