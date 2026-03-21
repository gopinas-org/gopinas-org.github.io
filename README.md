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

Collection loaders and schemas: [`src/content.config.ts`](src/content.config.ts).

## Deploy with GitHub Actions (first-time setup)

Do this once per repository (org admins may need to help on org-owned repos).

### 1. Point Pages at Actions

1. Open the repo on GitHub → **Settings** → **Pages** (under “Code and automation”).
2. Under **Build and deployment** → **Source**, choose **GitHub Actions** (not “Deploy from a branch”).
3. Save if prompted.

Until this is set, workflows can succeed but the site will not update (or you may see old content / 404).

### 2. Allow the workflow to deploy

The workflow uses the **`github-pages` environment**. GitHub creates it automatically on first deploy.

- If deploys sit **“Waiting”**: **Settings** → **Environments** → **github-pages** → remove **Required reviewers** / wait timers unless you want them, or approve the pending deployment under **Actions** → the workflow run.
- **Organization repos:** confirm **Settings** → **Actions** → **General** → **Actions permissions** allows workflows to run (defaults are usually fine). [Workflow permissions](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#configuring-the-default-github_token-permissions) only need **Read** for `contents` when using OIDC + Pages; this repo’s workflow already sets `pages: write` and `id-token: write`.

### 3. Branch and workflow file

- Pushes to **`main`** trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). If your default branch is different, edit the `branches:` list in that file.
- You can also run it manually: **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

### 4. Custom domain (`gopinas.org`)

[`public/CNAME`](public/CNAME) is copied into `dist` on build. In **Settings** → **Pages**, add the same hostname under **Custom domain** and follow GitHub’s DNS instructions at your registrar.

### 5. If the site 404s

1. **Actions** tab: open the latest **Deploy to GitHub Pages** run — confirm **Build** and **Deploy** are green.
2. Confirm **Pages** source is **GitHub Actions**, not an old `main` / `gh-pages` branch.
3. For **gopinas.org**, verify DNS and the **Custom domain** entry on the Pages settings page.

### 6. If Actions fails with Jekyll / `jekyll-build-pages` / “Invalid YAML” in `.astro`

That Docker image is **GitHub’s Jekyll builder**, not Astro. Jekyll scans the repo and treats `---` in `.astro` files as YAML front matter, which breaks the build.

**Fix:**

1. **Settings → Pages → Build and deployment → Source** → select **GitHub Actions** (not **Deploy from a branch**). Branch deploys always run Jekyll on the repo root.
2. **Actions** tab → **All workflows** → delete or disable any workflow whose logs show `jekyll-build-pages` or “Deploy Jekyll” (e.g. a template added from the “New workflow” UI). This repo should only need **Deploy to GitHub Pages** (`.github/workflows/deploy.yml`), which runs `npm run build` and uploads `./dist`.
3. Commit and push the root [`.nojekyll`](.nojekyll) file in this repo: it tells GitHub to skip Jekyll if anything ever publishes from a branch by mistake (you still want **Actions + `dist`** as the real setup).

## RSS & sitemap

- News feed: `/rss.xml`
- Sitemap: `/sitemap-index.xml` (from `@astrojs/sitemap`)

## Note on `@astrojs/sitemap`

A small [postinstall patch](scripts/patch-sitemap.cjs) guards against a missing internal routes hook so the sitemap integration does not crash the build. Revisit when upgrading Astro or `@astrojs/sitemap`.
