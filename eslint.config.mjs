import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRedux from "eslint-plugin-react-redux";
import optimizeRegex from "eslint-plugin-optimize-regex";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default [
    {
        ignores: ["src/types/theme.d.ts", "src/index.js"],
    },
    js.configs.recommended,
    {
        files: ["**/*.ts", "**/*.tsx", "**/*.jsx"],
        languageOptions: {
            parser: tseslintParser,
            sourceType: "module",
            ecmaVersion: "latest",
            globals: globals.browser,
            parserOptions: {
                project: ["./tsconfig.json"],
            },
        },
        plugins: {
            import: importPlugin,
            "optimize-regex": optimizeRegex,
            "@typescript-eslint": tseslint,
            react: react,
            "react-hooks": reactHooks,
            "react-redux": reactRedux,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "warn",
            "import/named": "off",
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "react/jsx-boolean-value": "error",
            "react/no-danger": "error",
            "react/self-closing-comp": "error",
            "comma-dangle": ["warn", "always-multiline"],
            "indent": ["error", 4, { SwitchCase: 1 }],
            "max-len": ["warn", { code: 166 }],
            "no-console": ["error", { allow: ["warn", "error"] }],
            "no-underscore-dangle": [
                "error",
                { allowAfterThis: true, allowAfterSuper: true },
            ],
            "react-redux/useSelector-prefer-selectors": "off",
        },
        settings: {
            react: {
                version: "detect",
            },
            "import/parsers": {
                "@typescript-eslint/parser": [".ts", ".tsx"],
            },
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
        },
    },
];
