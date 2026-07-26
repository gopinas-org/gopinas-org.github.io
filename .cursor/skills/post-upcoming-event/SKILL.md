---
name: post-upcoming-event
description: "Post an upcoming GoPinas event to gopinas.org (events + optional news) with site voice, a nailed Google Maps place pin, and Add to Calendar links. Use when Bryan/Celeste/staff asks to post a meetup, tournament, workshop, cooking party, or other upcoming GoPinas event to the website."
---

# Post upcoming GoPinas event

## Keywords

upcoming event, meetup, GoPinas website, gopinas.org, Google Maps, add to calendar, registration form, Cucina, BGC meetup, post event

## Overview

Publish an **upcoming event** on the GoPinas Astro site
(`gopinas-org/gopinas-org.github.io` → live at https://gopinas.org).

Canonical content paths:

| Collection | Path | URL |
| --- | --- | --- |
| Events (required) | `src/content/events/<slug>.md` | `/events/<slug>/` |
| News (optional companion) | `src/content/news/<slug>.md` | `/news/<slug>/` |

Schema: `src/content.config.ts` · voice: match existing `src/content/events/` and
`src/content/news/` posts (warm, welcoming, community-first; **bold** venues /
key phrases; short English; no emoji walls).

## Hard gate — nail Google Maps first

**Do this before writing the post.** Never ship a lazy search-only Maps link.

### Reject (lazy)

- `https://www.google.com/maps/search/?api=1&query=...` **without** a pinned place
- Bare text queries that only hope Maps picks the right result
- Wrong same-name restaurants in another barangay / city

### Accept (nailed)

Prefer one of these, in order:

1. **Share link from the Google Maps place panel** — `https://maps.app.goo.gl/...`
   (or the expanded `/maps/place/...` URL it redirects to)
2. **`/maps/place/...` URL** that includes a feature id (`!1s0x…:0x…`) and
   coordinates (`!3d…!4d…` or `/@lat,lng`)
3. **`query` + `query_place_id=`** only when you already verified the Place ID
   opens the correct listing

### How to resolve

1. Search the **venue name** near the stated city / landmark.
2. Open the place card. Confirm name + address match the announcement.
3. If the venue has **no** business listing (private kitchen / condo unit /
   unnamed room), pin the **building or landmark** instead (e.g. Tower 2 of
   The St. Francis Shangri-La Place). Say in the body that Maps points at the
   building when useful.
4. Use **Share → Copy link**. Expand short links once (`curl -sSIL`) and keep
   either the short link or a cleaned `/maps/place/...` URL (strip tracking
   params like `entry=`, `g_ep=`, `skid=`).
5. Spot-check the link opens the intended pin before commit.

**Stop and ask** if two plausible places conflict and the announcement is
ambiguous — do not guess.

## When to use

- Slack `#gopinas-website` (or similar): “post this event / meetup / party”
- Announcements with date + venue for GoPinas / Go Federation of the Philippines
- Follow-ups: fix Maps pin, add calendar links, wire registration form

## Procedure

### 1. Parse the announcement

Capture: title, date (`Asia/Manila`), start/end times (or blocks), venue name,
building/address, hosts/partners, featured guests, registration ask.

### 2. Nail Maps (hard gate above)

Record:

- Display name on Maps
- Address line
- Final Maps URL (nailed)
- Restaurant listing vs building fallback

### 3. Match site voice

Read 1–2 recent events/news posts. Keep the new page short and welcoming.
Titles often include an ISO or readable date. Location frontmatter is one
human-readable string (venue + building + area).

### 4. Write the event file

Filename: kebab-case + date, e.g. `igo-meet-up-cooking-party-2026-07-26.md`.

```yaml
---
title: 'Event Title — July 26, 2026'
event_date: 2026-07-26
location: 'Venue, Building, Area, City'
# registration_url: 'https://forms.gle/...'          # when known
# registration_embed_url: 'https://docs.google.com/forms/d/e/.../viewform?embedded=true'
---
```

Body checklist:

- Warm intro (who + what + featured guest)
- Date + **venue** with **Maps link on the place name** (nailed URL)
- Schedule bullets with times
- **Add to Google Calendar** links per block (and optional full-afternoon link)
- Optional “Helpful links” with Maps + calendar again
- No registration embed until Celeste/Bryan provides a form

Calendar template (`Asia/Manila`):

```text
https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=YYYYMMDDTHHMMSS/YYYYMMDDTHHMMSS&ctz=Asia/Manila&location=...&details=...
```

### 5. Optional news companion

Add `src/content/news/<slug>.md` when the ask is a public announcement (homepage
News + RSS). Link to the event page. Reuse the same nailed Maps URL.

### 6. Ship

1. Branch → commit → push in `gopinas-org/gopinas-org.github.io`
2. Open PR → merge to `main` (deploy: GitHub Actions → Pages)
3. Verify live:
   - `https://gopinas.org/events/<slug>/`
   - homepage Upcoming Events (and News if posted)
   - Maps + calendar links on mobile
4. If registration is unclear, **ask Celeste** (or the named ops contact) in the
   Slack thread whether a form is needed; wire `registration_url` /
   `registration_embed_url` when they reply.

### 7. Bryanverse pin (when agents care)

Bump `branches/gofedph/gopinas.github.io` in bryanverse when the pin matters for
fresh clones / skillsync. Discovery mirror:
`.cursor/skills/gopinas/` → `source: branches/gofedph/gopinas.github.io/.cursor/skills`.

## Do not

- Ship lazy Maps query links without a verified place pin
- Invent a restaurant listing that does not exist
- Skip calendar links when times are known
- Invent registration forms
- Dump Slack emoji walls onto the site
- Edit only bryanverse without shipping the child site repo (Pages deploys from
  `gopinas-org.github.io` `main`)
