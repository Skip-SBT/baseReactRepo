# Base React Repo

A template for React projects configured with Vite, TypeScript, MUI, ESLint, Stylelint, and GitHub Actions CI.

## Features

- **React 18** with TypeScript
- **Vite** — fast dev server and production bundler
- **MUI (Material UI)** — component library with a custom theme starter
- **React Router** — client-side routing
- **Vitest** — unit testing with jsdom
- **ESLint** — flat config, TypeScript-aware, with import sorting
- **Stylelint** — SCSS linting with Prettier integration
- **Prettier** — consistent code formatting
- **CSpell** — spellchecking
- **GitHub Pages** — one-command deployment

## Getting Started

Requires Node.js 22 (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the Hello World page.
Edit `src/pages/HomePage.tsx` to start building.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run check:eslint` | Lint TypeScript/TSX files |
| `npm run check:eslint:fix` | Lint and auto-fix |
| `npm run check:stylelint` | Lint SCSS files |
| `npm run check:stylelint:fix` | Lint and auto-fix SCSS |
| `npm run check:spellcheck` | Spellcheck source files |
| `npm run check:all` | Run all checks in sequence |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm run deploy` | Deploy `dist/` to GitHub Pages |
| `npm run reset` | Delete `dist/` and `node_modules/`, then reinstall |

## Project Structure

```
src/
├── pages/          # Route-level page components
│   └── HomePage.tsx
├── styles/         # Global SCSS
│   ├── index.scss
│   └── variables.scss
├── types/          # TypeScript augmentations
│   └── theme.d.ts
├── App.tsx         # Root component — router and theme provider
├── main.tsx        # Entry point
├── theme.ts        # MUI theme
└── index.css       # Base CSS reset
```

## Adding Pages

1. Create a component in `src/pages/`
2. Add a `<Route>` in `src/App.tsx`

```tsx
<Route path="/about" element={<AboutPage />} />
```

## Configuration Files

| File | Purpose |
|---|---|
| `vite.config.mjs` | Vite and Vitest config |
| `tsconfig.json` | TypeScript compiler options |
| `eslint.config.mjs` | ESLint flat config |
| `.stylelintrc.json` | Stylelint rules |
| `.prettierrc` | Prettier formatting options |
| `cspell.json` | Spellcheck dictionary and settings |

## Deployment to GitHub Pages

1. Set `homepage` in `package.json` to `https://<GITHUB_NAME>.github.io/<REPO_NAME>`
2. Enable GitHub Pages in your repo settings (source: `gh-pages` branch)
3. Run `npm run deploy`

## Linting & Formatting

Edit `eslint.config.mjs`, `.stylelintrc.json`, or `cspell.json` to adjust rules or add known words to the spelling dictionary.
