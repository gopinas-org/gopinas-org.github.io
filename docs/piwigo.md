# Piwigo for GoPinas photo galleries (separate from Jekyll)

This document tracks **how we might run [Piwigo](https://piwigo.org/)** for federation photo/video galleries. It is **not** implemented in the GitHub Pages site yet: there is no Jekyll `albums` integration until Piwigo is deployed and policies are set.

## Why Piwigo

- **Self-hosted**: you control data, retention, and access.
- **Per-event albums**: one album per tournament, roadshow, etc.
- **Member / guest uploads** via the **[Community plugin](https://doc.piwigo.org/managing-users/community-plugin-piwigo)**.
- **Approval before public visibility**: configure **“Low trust”** so uploads require **administrator approval** before they appear in the public gallery.

## What to decide before setup

| Topic | Notes |
|--------|--------|
| **Hosting** | Small VPS, shared hosting with PHP + MySQL/MariaDB, or internal server. Piwigo needs PHP, a database, and disk for originals/thumbnails. |
| **Domain** | e.g. `photos.gopinas.org` or a path on an existing domain. TLS (HTTPS) required for modern browsers and contributor trust. |
| **Who may upload** | Registered users only vs guests; align with spam/abuse risk. |
| **Moderators** | Which board/officers get admin or upload-approval rights. |
| **Video** | Confirm Piwigo + your PHP limits support the sizes you expect; optional caps in policy. |
| **Backups** | Database + `gallery/` (or equivalent) file tree on a schedule you can restore from. |

## Rough setup checklist

1. Install Piwigo per [official documentation](https://doc.piwigo.org/).
2. Install and enable the **Community** plugin.
3. Configure Community permissions: who can upload, **Low trust** (approval required), and which albums they may target.
4. Create an **album structure** (e.g. by year → event name).
5. Test full flow: contributor upload → pending queue → approve → public visibility.
6. Document the **public album URL** pattern editors will eventually paste into the main site (when Jekyll integration is added).

## Linking from gopinas.org later (optional future work)

When ready, the static site can link to Piwigo without hosting images on GitHub:

- **Manual**: paste the public gallery or album URL in Markdown/HTML on an event or article page.
- **Structured** (future): optional Jekyll front matter such as `albums: [{ title, url }]` and a small layout section—tracked separately in the site roadmap.

## References

- [Piwigo](https://piwigo.org/)
- [Community plugin documentation](https://doc.piwigo.org/managing-users/community-plugin-piwigo)
