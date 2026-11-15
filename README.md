# Tiny Truths

Static Amoscato podcast website built with [React Router](https://reactrouter.com/) v7 (framework mode), deployed to [Vercel](https://vercel.com/).

## Setup

```bash
nvm use
npm install
```

## Development

- `npm run dev` — runs the Vite dev server and `tsc --watch` concurrently
- `npm run build` — production build; prerenders every page to static HTML
- `npm run typecheck` — `react-router typegen && tsc`
- `npm run eslint`
- `npm run prettier` / `npm run prettier:fix`

### Add Episode

See the [`add-episode` skill](./.agents/skills/add-episode/SKILL.md).
