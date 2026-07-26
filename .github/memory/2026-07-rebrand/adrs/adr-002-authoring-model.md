# ADR-002 — Authoring model: three tiers, direct pages, explicit imports

**Status:** ACCEPTED · Refined across rounds 3 (prose-first pivot), 7 (parity), 8 (routing remediation).

## The three authoring tiers

1. **Smart prose (default):** plain markdown in `.mdx`; every `##` automatically becomes a designed numbered section (`01 — HEADING` eyebrow + section wrapper + reveal) via the `rehypeSectionize` transform. Authors never hand-write section chrome. Use `##` ONLY when the designed section is intended; `###`+ headings pass through untouched.
2. **Inline blocks:** designed components dropped into prose — `<ArticleHero …/>`, `<Feature>…</Feature>` — imported by name from the registry (`src/components/prose/components.js`). Markdown works inside component children.
3. **Data-driven:** list/tabular content lives in `src/data/*.json` (named-key objects only, never positional tuples) and is rendered by components; page front matter carries page-local structured data (hero fields, phase cards).

## Routing: direct pages, collection iff iterated

- Leaf page = `src/pages/<path>.mdx`; **URL = file path**; front matter names the layout as a literal relative path. No catch-all routes for ordinary pages.
- A content **collection** exists only when the set is iterated/queried (today: `principles` — grid + explorer + generated detail routes via `src/pages/principles/[number].astro`). Collections are schema-validated (Zod) — extend the schema when adding fields; the build fails loudly on violations.
- `composed: true` in front matter = the page provides its own full-width composition; omit it to get the standard prose article shell (`ProseLayout`).

## Value-placement house rules

- **Props** for short strings/identifiers/hrefs: `<ArticleHero eyebrow="TALKS" …/>`.
- **Slots** when a field carries rich content (markdown/emphasis/links): `<Fragment slot="title">Talks & *keynotes*</Fragment>`. Slot names are stringly-typed — double-check names; a typo renders empty silently.
- **Front matter** for anything list-shaped and page-local (YAML beats JS literals for nested lists).
- **`export const` in MDX** only when data-next-to-usage genuinely beats YAML; keep rare.
- **`src/data/`** for anything shared across pages or genuinely tabular.

## MDX cautions (inherent, not fixable)

- Prose is parsed with JSX rules: a bare `<` or `{` in a sentence is a build error — write `&lt;`, `\{`, or wrap in backticks.
- Component tags must be imported (from the registry) or the tag renders as literal unknown HTML — the named-import style means a typo'd import fails the build (good); a typo'd *slot name* does not (see above).
- Directory-name trap from the evaluation: content-shaped things must NOT live in a directory named like a route surface unless they are routed (the pre-r8 `src/content/pages/` confusion). Keep the regime pure.
