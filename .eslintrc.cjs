const eslintPluginReadableTailwind = require("eslint-plugin-readable-tailwind");

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "scripts/"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "readable-tailwind"],
  rules: {
    // enable all recommended rules to error
    ...eslintPluginReadableTailwind.configs.error.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
