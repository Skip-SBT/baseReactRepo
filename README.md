# Base React Repo

This repository serves as a template for React projects configured with Webpack, TypeScript, ESLint, and GitHub Actions for Continuous Integration (CI). The project now utilizes **Gulp** instead of react-scripts and includes a function to deploy to GitHub Pages.

## Features

- **React**: A base setup for React development.
- **Gulp**: Task automation for building and running the project.
- **Webpack**: Bundling configuration for your project.
- **TypeScript**: TypeScript support for static typing.
- **ESLint**: Code linting configured for React and TypeScript.
- **Stylelint**: CSS and SCSS linting to ensure styling consistency.
- **CSpell**: Automated spellchecking to catch typos in the codebase.
- **GitHub Actions**: Automated CI pipeline for linting, spellchecking, style checking, and dependency management.
- **GitHub Pages Deployment**: Functionality to deploy the project to GitHub Pages.

## Continuous Integration (CI) Workflow

This project uses GitHub Actions to automate Continuous Integration (CI) tasks. The CI pipeline is triggered on every push or pull request to the `main`, `live`, or `testing` branches. The workflow ensures that the code is properly linted, spellchecked, style-checked, and that all dependencies are correctly installed.

### Workflow Overview

The following is the GitHub Actions workflow configuration used for this project:

```yaml
name: ci

on:
  push:
    branches:
      - main
      - live
      - testing
  pull_request:
    branches:
      - main
      - live
      - testing

jobs:
  ci:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        os: [ubuntu-latest]
        node: [18]

    steps:
      - name: Checkout
        uses: actions/checkout@main

      - name: Setup node env
        uses: actions/setup-node@v2.1.2
        with:
          node-version: ${{ matrix.node }}

      - name: Cache node_modules
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Install dependencies
        run: npm ci

      - name: Run code eslint check
        run: npm run check:eslint

      - name: Run code stylelint check
        run: npm run check:stylelint

      - name: Run spellcheck
        run: npm run check:spellcheck
```

### How It Works

- **Triggers**: The workflow is triggered on any push or pull request to the `main`, `live`, or `testing` branches.
- **Environment**: The workflow runs on `ubuntu-latest` with Node.js version `18`.
- **Caching**: The workflow caches `node_modules` based on the `package-lock.json` hash to speed up dependency installation.
- **Steps**:
  - **Checkout**: Pulls the latest code from the repository.
  - **Setup Node Environment**: Configures the Node.js environment with version `18`.
  - **Cache Dependencies**: Reuses cached `node_modules` when possible to speed up builds.
  - **Install Dependencies**: Installs project dependencies using `npm ci` for a clean install.
  - **Run ESLint**: Lints the codebase using `npm run lint:no-fix` to ensure code quality without automatically fixing issues.
  - **Run Stylelint**: Checks CSS and SCSS files for style issues using `npm run lint:styles`.
  - **Run Spellcheck**: Uses CSpell to check for spelling mistakes using `npm run lint:spellcheck`.

### Linting & Spellchecking

To tweak the linting rules or add "known" words to the spelling dictionary you can edit `eslint.config.mjs`, `.stylelintrc.cjs` or `cspell.json`

## Deployment to GitHub Pages

This project includes a function to deploy to GitHub Pages using Gulp. The `gulp deploy` task handles the process of publishing the build output to the `gh-pages` branch. You need to enable gh-pages in your github repo settings.

