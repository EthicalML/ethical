# ADR-009 — Client architecture: components, behaviour, data, quality gates

**Status:** PROPOSED — full spec for owner review. On ratification this supersedes ADR-004 entirely and amends ADR-003 (styles) and ADR-005 (data placement). Evidence base: the four hero exhibits, the Opus architecture review (tmp2/architecture-review.md), and the OSS structure survey (tmp2/oss-structure-survey.md).

## 1. Target tree (explicit paths, clean target — no legacy carve-outs designed in)

```
src/
  pages/               # routes: .mdx (authored) + dynamic-route .astro only
  layouts/             # .astro shells; BaseLayout owns page-wide behaviour imports
  components/          # .astro components, typed fences; colocated <script> for their behaviour
  content/             # ALL collections (page-generating AND data), schemas in src/content.config.ts
    principles/          *.md      (existing page-generating collection)
    metrics/             repos.yaml  (example: repo facts, schema-validated, script-refreshed)
    survey/              survey.yaml (next migration: schema-validated survey dataset)
  data/                # ONLY simple multi-consumer chrome values as .json plain imports
                       # (site.json, nav.json, footer.json); shrinks over time, never grows
  canvas/              # purpose-named shared engine: hero scenes, cube, graphs (TS modules,
                       # each defines+registers its custom element; imported by consumers)
  styles/              # central sheets: tokens.css, layout.css, prose.css (ADR-003 unchanged)
  assets/              # images processed via <Image> (logos/, talks/)
public/                # true passthrough only: fonts/, favicon, CNAME
                       # (mle/ and state-of-ml live here TODAY as scheduled debt — they are on
                       # the modernisation list, not part of the target architecture)
```

Naming rule: shared-code folders are purpose-named (`src/canvas/`), never generic (`src/scripts/`, `src/lib/`, `src/utils/`) — per the OSS survey, generic buckets are where traceability goes to die.

## 2. Component rule

- Every component is `.astro` with a **typed fence** using the checked idiom (astro check validates callers):

```astro
---
interface Props {
  title: string;
  items?: string[];
}
const { title, items = [] } = Astro.props;
---
```

No `as Props` casts; `interface Props` alone activates call-site checking.
- `.tsx` (Preact) is permitted ONLY for components with reactive UI state — state that drives re-rendering. Current census: exactly one (`SurveyExplorer.tsx`). Nav, drawer, and form toggle classes and text on a static tree and are NOT islands. Adding an island requires an ADR note stating the reactive state it manages.
- Components carry no owner-editable copy (standing rule, restated: content arrives via props or collections).

## 3. Behaviour rule

- **Single-consumer behaviour lives inside its owning component** as a colocated `<script>` written in TypeScript, structured as an inline custom element when it needs per-instance mounting or teardown (the `HeroInline.astro` shape; same idiom as Starlight's SiteSearch):

```astro
<hero-typewriter>…server-rendered markup…</hero-typewriter>
<script>
  class HeroTypewriter extends HTMLElement {
    connectedCallback() { /* full implementation here */ }
    disconnectedCallback() { /* teardown */ }
  }
  customElements.get('hero-typewriter') ?? customElements.define('hero-typewriter', HeroTypewriter);
</script>
```

- **Promotion at ≥2 consumers, not before:** the element class moves verbatim to a purpose-named module (e.g. `src/canvas/kaos-graph.ts`) which defines AND registers the element; every consumer does `import '../canvas/kaos-graph';` and uses the tag. Import is the only wiring; jump-to-definition works end to end.
- **Layout-owned behaviour** (scroll reveal; anything page-wide) is a module imported by `BaseLayout.astro`'s colocated script — global by ownership, not by fiat.
- The `data-widget` registry, `public/assets/*.js` behaviour files, and the global `is:inline` script tags in BaseLayout are **retired**. Data attributes remain only for values CSS also consumes or trivial element config; structured config passes through server-rendered markup/attributes read by the element, never JSON blobs where avoidable.
- Mount contract unchanged from ADR-004 and lives inside each element: IntersectionObserver laziness where warranted, `prefers-reduced-motion` static branch, teardown on disconnect, canvas backing-store fitting that never resizes its container.

## 4. Language rule

- All first-party behaviour is TypeScript: colocated `<script>` (esbuild handles TS), `src/canvas/*.ts`, islands `.tsx`. Zero first-party `.js` in the target picture. Legacy `.js` under `public/` is scheduled debt (see §1), not an architectural exception.

## 5. Data rule

- **A data file must earn its existence: ≥2 consumers, or genuinely tabular content.** Single-consumer content is page content — it lives in that page's front matter and is passed as explicit props (`projects.json` is the standing violation; it gets inlined into `index.mdx`, with repo facts extracted per the next rule).
- **Facts appearing in >1 place are single-sourced and script-refreshed**: repo metrics become `src/content/metrics/repos.yaml` + `scripts/refresh-repo-metrics.mjs` (gh api), consumed by homepage cards and project pages alike.
- **Collections with Zod schemas** (`src/content.config.ts`) are used where data is iterated, validated, or list-like — YAML preferred for those files. Simple flat chrome values (site.json, nav.json, footer.json) stay as plain JSON imports in `src/data/` (YAML imports outside collections would need a Vite plugin; not worth it there). No blanket migration — each file moves only when it gains a schema-worthy shape (survey.yaml is first).
- Content authority rules from ADR-005 (placeholder policy, canonical values) unchanged.

## 6. Quality gates (added to scripts/verify + npm scripts)

1. Fix `astro check` scope first: tsconfig excludes `tmp/`, `tmp2/`, `dist/`, `public/`.
2. `npm run lint` = Prettier (printWidth 100, singleQuote) + ESLint (astro + typescript plugins; key rules: no implicit any, max-len 120 as hard stop, one statement per line, no single-letter identifiers beyond indices).
3. `astro check` with a **zero-new-errors ratchet**: current baseline recorded; every change must not increase it; burn-down of the existing implicit-any debt is a migration-batch task.
4. Definition-of-done in CONVENTIONS.md gains: lint clean, check no-new-errors, and "content-free components / explicit props" as review criteria.

## 7. Styles (ADR-003 amendment, minimal)

Central sheets remain the default: tokens.css is the design-system authority, layout/prose sheets stay greppable. Scoped `<style>` is permitted ONLY in single-consumer components and only adopted opportunistically during the CSS cleanup phase (after JS migration settles), because scoping changes selector specificity and must be verified per component with the screenshot gates. No wholesale migration.

## 8. Migration order (one batch, byte-sized commits)

1. Typewriter: collapse the triplication — `HeroInline.astro`'s element becomes the live implementation inside `Hero.astro`; delete `public/assets/widget-typewriter.js`, `src/scripts/typewriter.ts`, and the exhibit files; fold in the `subtitle_lines` front-matter fix (mission lines leave the component).
2. Gates: tsconfig scope fix + Prettier/ESLint configs + baseline ratchet (so the rest of the migration is born clean).
3. Shared engines: `canvases.js` + `widget-kaos.js` → `src/canvas/*.ts` custom elements; consumers import; nav preview included.
4. `site.js` split by ownership: nav/drawer → SiteHeader colocated; marquee → AffiliationMarquee colocated; reveal → layout-owned module. `forms.js` → FormSection colocated.
5. Data: `projects.json` → `index.mdx` front matter + `src/content/metrics/repos.yaml` + refresh script; `survey.json` → schema'd collection.
6. Remove the retired loading from BaseLayout; verify every page's shipped JS is only what its components import.
Each step: build + DOM gates + screenshot diff (zero visual change) before the next.
