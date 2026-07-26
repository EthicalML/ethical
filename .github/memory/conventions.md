# Working conventions (Astro tree)

Reviewed and finalised from the seed implementation's CONVENTIONS.md (research repo `impl/astro/CONVENTIONS.md`) plus review deltas — this file supersedes it for the main-repo build.

## How a URL becomes a page

Rule: **direct pages; collection iff iterated.**
1. `/x/y/` → `src/pages/x/y.mdx` → front matter `layout: ../../layouts/ProseLayout.astro` → `BaseLayout.astro`. The file IS the route; the layout is a literal path in the file.
2. `/` → `src/pages/index.mdx`.
3. `/principles/NN/` → `src/content/principles/NN.md` (collection entry) rendered by `src/pages/principles/[number].astro` → `PrincipleLayout.astro`. The only generated routes.
No catch-all routes. No collections for non-iterated content.

## Where things live

| Thing | Location |
|---|---|
| Owner prose + page composition | `src/pages/**/*.mdx` |
| Iterated content | `src/content/<collection>/` + schema in `src/content.config.ts` |
| Shared/tabular values | `src/data/*.json` — named keys, single-sourced |
| Components (content-free arrangers) | `src/components/`, MDX-facing ones exported via `src/components/prose/components.js` |
| Layouts (chrome/shells) | `src/layouts/` |
| Styles (central sheets, no scoped styles) | `src/styles/` |
| Vanilla widget scripts | `public/assets/` (verbatim; `is:inline` references) |
| Images to be optimised | `src/assets/` (through `<Image>`) |

## Review deltas vs the seed conventions (apply during import)

1. **Rename session-era files**: `round4.css` → `layout.css`, `round4.js` → `site.js`, `prototype-canvases.js` → `canvases.js`, `astro.css` → `prose.css`. Nothing named after evaluation rounds survives into the main repo.
2. **Add the value-placement rules** (props/slots/front matter/export-const) from ADR-002 — the seed doc lacks them.
3. **Add MDX cautions** (JSX parsing of prose) and the **image-pipeline split** (`src/assets/` vs `public/`) — both absent from the seed doc.
4. **Islands rule** from ADR-004 (the seed doc never states when a `.tsx` island is permitted).
5. Components must not carry owner-editable copy (kept from seed; re-verify on every PR).
6. `composed: true` semantics (kept from seed): the page owns its full composition; otherwise the standard prose shell wraps it.

## Automatic numbered sections

`rehypeSectionize` (registered in `astro.config.mjs`; move to `src/plugins/` on import) transforms every authored `##` into a numbered designed section and gathers content until the next `##`. Use `##` only when you want that. Never hand-author the eyebrow/wrapper. `###`+ are untouched.

## Adding a page (checklist)

1. `src/pages/<path>.mdx` with `title`, `description` (SEO), explicit `layout:` path; `composed: true` only for full-width compositions; `redirects`/aliases entry if it replaces a legacy URL.
2. Import needed blocks by name from the registry; plain markdown needs no imports.
3. Shared rows/stats → `src/data/` named-key objects; mark invented values as placeholder (ADR-005).
4. Run the verification gate before committing.

## Verification gates (definition of done for every change)

- `npm run build` green (schemas + types are the loud-failure layer — never bypass).
- DOM gate on affected routes: zero page errors; reveals fire under scripted scroll; every canvas pixel-sampled non-blank; page height sane (<20k px).
- Visual: full-page screenshot diff against the previous build for affected routes (canvas regions masked); against the design prototype when implementing new sections.
- CONVENTIONS/memory updates are part of the change when a convention shifts — drift here is a review blocker.
