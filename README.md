# gopinas-org.github.io

Public site for **Go Federation of the Philippines, Inc.** (GoPinas), built with [Jekyll](https://jekyllrb.com/) and deployed via [GitHub Pages](https://pages.github.com/).

## Requirements

- **Ruby 3.0+** (GitHub Pages uses a current Ruby; macOS system Ruby 2.6 is too old). Use [Homebrew Ruby](https://brew.sh/) (`brew install ruby`) or [rbenv](https://github.com/rbenv/rbenv).

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000> (default). The generated site is written to `_site/`.

## Content

| Kind | Folder | Notes |
|------|--------|--------|
| News | `_news/` | Dated items; listed on the home page and `/news/`. |
| Articles | `_articles/` | Long-form; share permalinks directly (not in main nav). Archive: `/articles/`. |
| Events | `_events/` | Use `event_date` (YYYY-MM-DD); optional `end_date`, `location`, `registration_url`. Upcoming events appear on the home page. Archive: `/events/`. |

Static pages (`about.html`, `about-go.html`, `press-kit.html`) and `index.md` live at the repo root and use layouts in `_layouts/`.

**Photo galleries (Piwigo):** Not wired into this repo yet. Planning and setup notes live in [docs/piwigo.md](docs/piwigo.md) (`docs/` is excluded from the Jekyll build).

**Calendar export (events):** Add to Google Calendar / `.ics` for event pages is **deferred**. See [docs/calendar-export.md](docs/calendar-export.md).

## Build only

```bash
bundle exec jekyll build
```

## Plugins (GitHub Pages–compatible)

- `jekyll-seo-tag` — meta and Open Graph tags  
- `jekyll-sitemap` — `sitemap.xml`  
- `jekyll-feed` — RSS (includes the `news` collection)
