import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  js.configs.recommended,
  prettierConfig, // Include Prettier config directly
  {
    ignores: [
      "*.js", // Ignore all .js files
      "node_modules",
      "dist",
      ".tap",
      ".vscode",
      "coverage",
    ],
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "indent": ["error", 2, { SwitchCase: 1 }],
      "semi": ["error", "always"],
      "quotes": ["error", "double", { avoidEscape: true }],
      "linebreak-style": 0,
      "no-unused-vars": 0,
    },
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        require: "readonly",
        __dirname: "readonly",
        // add any other Node.js global variables if needed
      },
    },
  },
];
