# Event calendar export (deferred)

**Add to Google Calendar** links and optional **`.ics`** downloads for `_events/` pages are **not implemented** on the static site yet. This file is a placeholder for when you pick the work back up.

## Intended direction (summary)

- Build a Google Calendar template URL from event front matter (`title`, `event_date`, `end_date`, `location`, description + canonical page URL).
- Decide **all-day vs timed** events and **timezone** handling (e.g. `Asia/Manila` or explicit UTC in YAML).
- Optionally ship static `.ics` files under `assets/calendar/` or generate equivalent content at build time.
- Surface controls in `[_layouts/event.html](../_layouts/event.html)` (or a dedicated include).

## References

- When implementing, re-check current **Google Calendar** documentation for `calendar.google.com/calendar/render?action=TEMPLATE` query parameters (`text`, `dates`, `details`, `location`).
- [RFC 5545](https://datatracker.ietf.org/doc/html/rfc5545) (iCalendar) for `.ics` file content if you add downloads.
