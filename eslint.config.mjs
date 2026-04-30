import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
export default [
    {
        ignores: ['src/types/theme.d.ts', 'dist/'],
    },
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.jsx'],
        languageOptions: {
            parser: tseslintParser,
            sourceType: 'module',
            ecmaVersion: 'latest',
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
        plugins: {
            import: importPlugin,
            '@typescript-eslint': tseslint,
            react,
            'react-hooks': reactHooks,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            'import/named': 'off',
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-boolean-value': 'error',
            'react/no-danger': 'error',
            'react/self-closing-comp': 'error',
            'comma-dangle': ['warn', 'always-multiline'],
            indent: ['error', 4, {SwitchCase: 1}],
            'max-len': ['warn', {code: 166}],
            'no-console': ['error', {allow: ['warn', 'error']}],
            'no-underscore-dangle': ['error', {allowAfterThis: true, allowAfterSuper: true}],
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [['^']],
                },
            ],
            'simple-import-sort/exports': 'error',
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
        },
    },
    {
        files: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                beforeAll: 'readonly',
                beforeEach: 'readonly',
                afterAll: 'readonly',
                afterEach: 'readonly',
                vi: 'readonly',
            },
        },
    },
];
