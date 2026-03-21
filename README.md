# gopinas-org.github.io

Public site for **Go Federation of the Philippines, Inc.** (GoPinas), built with [Astro](https://astro.build/) and deployed to [GitHub Pages](https://pages.github.com/) via GitHub Actions.

## Prerequisites

- **Node.js** 20+ (LTS recommended)

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:4321`).

## Production build

```bash
npm run build
```

Output is written to `dist/`. Preview it with:

```bash
npm run preview
```

## Content

- **News:** `src/content/news/*.md`
- **Articles:** `src/content/articles/*.md`
- **Events:** `src/content/events/*.md`

Schemas live in [`src/content/config.ts`](src/content/config.ts).

## Deploy (GitHub Pages)

1. Repo **Settings → Pages**: set **Source** to **GitHub Actions**.
2. Pushes to `main` run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (`npm ci`, `npm run build`, upload `dist`). If your default branch is not `main`, change the `branches` filter in that workflow.

Custom domain: [`public/CNAME`](public/CNAME) is copied into `dist` on build.

## RSS & sitemap

- News feed: `/rss.xml`
- Sitemap: `/sitemap-index.xml` (from `@astrojs/sitemap`)

## Note on `@astrojs/sitemap`

A small [postinstall patch](scripts/patch-sitemap.cjs) guards against a missing internal routes hook so the sitemap integration does not crash the build. Revisit when upgrading Astro or `@astrojs/sitemap`.
