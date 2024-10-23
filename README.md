# Base React Repo

This repository serves as a template for React projects configured with Webpack, TypeScript, ESLint, and GitHub Actions for Continuous Integration (CI).

## Features

- **React**: A base setup for React development.
- **Webpack**: Bundling configuration for your project.
- **TypeScript**: TypeScript support for static typing.
- **ESLint**: Code linting configured for React and TypeScript.
- **GitHub Actions**: Automated CI pipeline for linting and dependency management.


## Continuous Integration (CI) Workflow

This project uses GitHub Actions to automate Continuous Integration (CI) tasks. The CI pipeline is triggered on every push request to the `main`, `live`, or `testing` branches. The workflow ensures that the code is linted using ESLint and all dependencies are properly installed.

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
        run: npm run lint:no-fix
```
### How It Works

- **Triggers**: The workflow is triggered on any push or pull request to the `main`, `live`, or `testing` branches.

- **Environment**: The workflow runs on `ubuntu-latest` with Node.js version `18`.

- **Caching**: The workflow uses caching to speed up dependency installation by caching `node_modules` based on the `package-lock.json` hash.

- **Steps**:
  - **Checkout**: Pulls the latest code from the repository.
  - **Setup Node Environment**: Configures the Node.js environment with version `18`.
  - **Cache Dependencies**: Reuses cached `node_modules` when possible to speed up builds.
  - **Install Dependencies**: Installs project dependencies using `npm ci` for a clean install.
  - **Run ESLint**: Lints the codebase using `npm run lint:no-fix` to ensure code quality without automatically fixing issues.

### Linting

The `npm run lint:no-fix` command is expected to be configured in the `package.json` file as follows:

```json
"scripts": {
  "lint:no-fix": "eslint ."
}
