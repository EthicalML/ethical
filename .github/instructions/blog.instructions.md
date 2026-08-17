---
applyTo: 'src/content/blog/**'
paths:
  - 'src/content/blog/**'
---

# Blog authoring and publishing

Posts live as `src/content/blog/<YYYY-MM-DD->slug/index.md` with colocated assets. The publishing state machine is driven entirely by the optional `date` field; there is no draft flag:

- **No `date`** - draft: never built in production, visible only in dev. The folder carries no date prefix yet.
- **Future `date`** - unlisted `noindex` preview, reachable by URL, in no listing, sitemap, llms.txt entry or feed.
- **Past `date`** - published everywhere. The flip happens at build time, which is why `deploy.yml` re-runs the build on a daily cron.

- Every post requires a featured `image` (schema-enforced; drives archive showcases and social cards).
- Listing consumers read the collection only through `publishedBlogEntries` in `src/utils/blog.ts`; only the post page's path generation uses `renderableBlogEntries`.
- Republished posts set `source` and `url` (the off-site canonical) and record other appearances in `syndication`.
- Mermaid diagrams are pre-rendered to committed SVGs beside the post (dark theme, transparent background); no Mermaid runtime ships to the browser.
