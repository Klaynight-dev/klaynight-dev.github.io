import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginSvelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import globals from "globals";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginSvelte.configs["flat/recommended"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: {
          ts: tseslint.parser,
          typescript: tseslint.parser,
        },
        extraFileExtensions: [".svelte"],
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    }
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "svelte/require-each-key": "off",
      "svelte/no-unused-props": "off",
      "svelte/no-at-html-tags": "off"
    }
  },
  {
    ignores: [
      "dist/",
      "node_modules/",
      "build/",
      ".svelte-kit/",
      "assets/",
      "public/",
      "src/vite-env.d.ts",
      "vite.config.ts",
      "svelte.config.js",
      "eslint.config.js"
    ],
  }
);
