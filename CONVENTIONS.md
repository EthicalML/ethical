# Astro authoring conventions

The decisions in `.github/memory/2026-07-rebrand/` are authoritative. This file is the day-to-day guide to the imported tree; update it alongside the memory whenever a convention changes.

## How a URL becomes a page

The routing rule is **collection iff iterated**:

1. Leaf pages are direct MDX files in `src/pages/`; their file path is their URL. Each names its layout in front matter. Example: `/frameworks/maturity-model/` → `src/pages/frameworks/maturity-model.mdx` → `layout: ../../layouts/ProseLayout.astro` → `BaseLayout.astro`.
2. `/` is `src/pages/index.mdx`, with `layout: ../layouts/BaseLayout.astro`.
3. Principle detail pages are the exception because the site iterates them as a set. Entries live in `src/content/principles/`, are validated by the `principles` collection schema, and are rendered by `src/pages/principles/[number].astro` through `PrincipleLayout.astro`.

Do not create a collection for content that is not queried, sorted, or iterated. Do not add a catch-all route for ordinary pages. Direct nested MDX paths can coexist with the iterated `/principles/[number]/` route; `/principles/index.mdx` owns only the section landing page.

## Content, data, and rendering

- Owner prose, headings, labels, links, and page-level component composition belong in `src/pages/**/*.mdx`.
- Shared or tabular values belong in `src/data/*.json`. Rows use named-key objects, never positional tuples, so each value is self-describing at the edit site.
- Components in `src/components/` arrange supplied content or shared data. They must not introduce owner-editable copy.
- Site-wide wordmark, metadata, join, and legal strings live in `src/data/site.json`; footer-band content is in `footer.json` and `talks.json`.
- Layouts own document chrome and stable structure. `BaseLayout.astro` arranges the header, footer, and runtime assets; `ProseLayout.astro` provides either the standard article shell or the unwrapped `composed: true` shell.
- `composed: true` means the page owns its complete full-width composition. Without it, `ProseLayout.astro` supplies the standard prose article shell.
- Styles are split by role in `src/styles/`: `tokens.css` for tokens/base/components, `prose.css` for the prose shell, and `layout.css` for prototype-fidelity geometry.
- Runtime assets are split by role in `public/assets/`: `site.js` for page/menu behaviour, `canvases.js` for prototype canvas engines, and `widget-kaos.js` for the shared KAOS mount.

## Value placement

- Use props for short strings, identifiers, and hrefs.
- Use slots when a field carries rich content such as markdown, emphasis, or links. Slot names are stringly typed, so verify them carefully; a typo can render empty without a build error.
- Use front matter for list-shaped, page-local structured data.
- Use `export const` in MDX only when keeping data next to its usage is clearer than YAML; keep this rare.
- Use `src/data/` for shared or genuinely tabular data.

## MDX component registry

`src/components/prose/components.js` is the single named export surface for designed MDX blocks. A direct MDX page imports only the components it uses from that registry:

```mdx
---
layout: ../layouts/ProseLayout.astro
title: Talks & keynotes
composed: true
---

import { ArticleHero, TalksGrid } from '../components/prose/components.js';

<ArticleHero ... />
<TalksGrid />
```

Add a reusable MDX block to the registry, then import it by name in each page that uses it. Ordinary Markdown needs no component import.

## MDX cautions

- MDX prose is parsed with JSX rules. Escape a bare `<` as `&lt;`, escape `{` as `\{`, or put the text in backticks.
- Component tags must be imported. A misspelled named import fails the build, but a misspelled slot name can silently render empty.
- Keep content-shaped files out of route-like directories unless they really own those routes.

## Automatic numbered sections

`astro.config.mjs` registers `src/plugins/rehype-sectionize.mjs` for Markdown and MDX. Every authored `## Heading` starts a `.prose-section`, receives a generated `01 — HEADING` eyebrow, and gathers following content until the next `h2`. The number is based on document order.

Use `##` only when that designed numbered section is intended. Use a composed MDX component for a bespoke section that must not be transformed. Do not hand-author the generated eyebrow or wrapper. Headings at `###` and below pass through untouched.

## Widgets and islands

- Stateless animation without user-driven UI state is a vanilla widget mounted from `public/assets/` through a `data-widget` attribute.
- A `.tsx` Preact island is permitted only when state genuinely drives DOM structure, such as tabs, sorting, comparison, or other user state. Mount it with `client:visible`.
- `.astro` components do not hold client state. Do not introduce a third widget category.
- Public scripts are served verbatim and must be referenced with `is:inline`.

## Images

- Put images that Astro should optimise in `src/assets/` and render them through Astro's `<Image>` pipeline.
- Put files that must retain an exact URL or pass through unchanged in `public/`.
- Do not duplicate an image between the two pipelines.

## Adding a page

1. Add `src/pages/<path>.mdx`; its path is the URL.
2. Add `title`, `description`, and an explicit relative `layout:` path in front matter. Use `ProseLayout.astro` for leaves. Set `composed: true` only when the MDX provides the complete page composition.
3. For designed blocks, import named components from `components/prose/components.js`. Add a small data-driven component only when the current vocabulary cannot express the design.
4. Put reusable rows and statistics in `src/data/` as named-key objects. Mark invented values as placeholders according to ADR-005.
5. Add a redirect or alias when replacing a legacy URL.
6. Run `npm run build`, the DOM gate on affected routes, and the screenshot gate for visual changes.

For a new principle, add `src/content/principles/NN.md` with the collection schema fields; the parameterised route is generated automatically.

## Homepage source map

| Section | Authoring source |
|---|---|
| Hero, phases, network title/stats | `src/pages/index.mdx` front matter and composition |
| Evidence band | `src/data/stats.json` |
| Affiliations | `src/data/affiliations.json` |
| Principle content | `src/content/principles/*.md`; section labels are props in `index.mdx` |
| Open-source showcase | `src/data/projects.json` |
| Reports, maturity preview, OWASP rows | `src/data/home-reports.json` via `ReportsSection.astro` |
| Survey categories and rows | `src/data/survey.json` via the Preact `SurveyExplorer.tsx` island |
| Network sectors/issues/form chrome | `src/data/network-sectors.json`, `newsletter-issues.json`, and `network.json` |
| Footnote/about/talks/links | `src/data/footer.json` and `talks.json` |
| Site chrome and header panels | `src/data/site.json` and `nav.json` |

## Verification

The reviewed harness lives in `scripts/verify/`; ADR-008 is its authoritative specification. Every change runs the build and DOM checks on affected routes. Visual changes also receive full-page screenshot comparison, with canvas regions masked when testing for zero visual change.
