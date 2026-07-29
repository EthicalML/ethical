# ADR-009 — Client architecture: components, behaviour, data, quality gates

**Status:** PROPOSED (revision 2 after owner review) · Decisions only — the migration plan lives in `../plan/client-architecture-migration.md`.

## 0. Supersession register (what this ADR invalidates elsewhere)

| Previous ADR | Invalidated on ratification of this ADR | Still valid |
|---|---|---|
| ADR-004 | The `data-widget` string registry; behaviour shipped as `public/assets/*.js` loaded globally from BaseLayout; the "vanilla JS only, islands only for stateful UI" boundary as phrased | The mount contract (lazy IO, reduced-motion static branch, teardown, canvas never resizes its container); the widget engine facts (cycle timings, compact variant) |
| ADR-005 | `src/data/*.json` as the default home for shared/tabular values (see §5 — the folder is dissolved) | Collections for iterated page content (principles); placeholder policy; canonical-value rules |
| ADR-003 | Nothing yet — styles are explicitly OUT of scope of this ADR; a separate assessment will propose any change | All of it |

## 1. Target tree

```
src/
  pages/               # ROUTES. Every file here is a URL: .mdx authored pages + dynamic-route .astro
  layouts/             # .astro shells; BaseLayout imports page-wide behaviour (reveal)
  components/          # ALL components: .astro (default) AND .tsx islands side by side
  content/             # COLLECTIONS: schema-validated sets defined in src/content.config.ts
    principles/          01.md … 09.md   (entries WITH prose bodies → page-generating)
    metrics/             repos.yaml      (entries that are pure values → data-only)
  data/                # REAL data only: raw/extensive datasets (survey CSVs); never chrome or config
  canvas/              # shared canvas engines — exact contents specified in the migration plan
  styles/              # central sheets (unchanged; out of scope here)
  assets/              # images processed via <Image>
public/                # true passthrough: fonts/, favicon, CNAME
                       # (mle/, state-of-ml = scheduled debt, not architecture)
```

**pages/ vs content/, plainly:** `pages/` answers "what URLs exist" — one file, one route. `content/` answers "what validated sets of things exist" — a collection is a folder of entries with a Zod schema; Astro checks every entry at build. A collection entry is `.md` when it carries prose that renders somewhere (a principle has a body → the dynamic route in `pages/principles/[number].astro` turns each entry into a URL); it is `.yaml` when it is pure values with no prose (repo metrics). So: content/ is not "the new data/" wholesale — it is the home for anything that is a *set with a shape worth validating*, whether page-backing or value-only.

## 2. Component rule

- Components live in `src/components/`, `.astro` and `.tsx` side by side.
- **`.astro` is the default.** Typed fence, checked idiom (no casts):

```astro
---
interface Props { title: string; items?: string[] }
const { title, items = [] } = Astro.props;
---
```

- **`.tsx` (Preact) islands are a normal, validated tool, not a forbidden zone.** Use one when the component manages reactive UI state (survey) or when the tsx shape is simply the cleaner implementation for an interactive component. Guidance, not gate: prefer `.astro` for render-only components because it is less ceremony for the same output; do not contort a design to avoid an island. (This deliberately softens revision 1, which over-restricted and would have taught agents to avoid islands.)
- **Copy rule, clarified:** components must not hardcode *page copy* — the text a reader consumes on a page (headings, prose, card descriptions) arrives via props, front matter, or collections, so the authored surface stays the source of truth. *Chrome* (nav labels and hrefs, footer link names, the wordmark) is owned by its component and lives as a typed constant in that component's fence — see §5.

## 3. Behaviour rule

**"Colocation" means: the code that makes a component interactive lives in the same file as the component's markup.** Concretely, three shapes, chosen by consumer count:

**(a) Single consumer → fully colocated.** The component contains its markup AND a `<script>` (TypeScript) with the complete implementation, structured as a custom element when it needs per-instance mount/teardown:

```astro
<!-- src/components/Hero.astro — everything about the hero, in the hero -->
<type-writer>…server-rendered lines…</type-writer>
<script>
  class TypeWriter extends HTMLElement {
    connectedCallback() { /* the full typewriter implementation */ }
    disconnectedCallback() { /* teardown */ }
  }
  customElements.get('type-writer') ?? customElements.define('type-writer', TypeWriter);
</script>
```

Opening `Hero.astro` shows you everything the hero does. No other file involved.

**(b) Multiple consumers → a shared module that defines its element.** When the SAME behaviour is needed by several components (real case: the KAOS graph renders in the homepage card, the nav dropdown preview, and the project page), the element class moves to a module file; importing the module registers the element:

```ts
// src/canvas/kaos-graph.ts — one implementation, three consumers
class KaosGraph extends HTMLElement { /* full engine */ }
customElements.get('kaos-graph') ?? customElements.define('kaos-graph', KaosGraph);
```

```astro
<!-- each consuming component -->
<script> import '../canvas/kaos-graph'; </script>
<kaos-graph compact></kaos-graph>
```

The import is the entire wiring — jump-to-definition lands on the implementation. This is the *only* reason a behaviour file exists outside a component: two or more components need it. The folder name is secondary (§ naming below); the rule is the consumer count.

**(c) Page-wide behaviour → layout-owned.** Scroll reveal touches every section of every page; its owner is the layout, so `BaseLayout.astro` colocates a `<script>` importing it. This is "global" earned by ownership, not by a loader list.

**Naming of shared-module folders:** purpose-named per domain (`src/canvas/` for the canvas engines — currently the only shared domain). The value over a generic `src/scripts/` is honestly modest: it is the same import mechanism either way; purpose-naming just keeps intent readable as domains accumulate. If only one shared domain ever exists, this distinction stays cosmetic.

**What is retired, plainly:** today, behaviour lives in four files under `public/assets/` (`site.js`, `canvases.js`, `widget-kaos.js`, `forms.js`) that BaseLayout force-loads on every page, and each file finds its targets by scanning the whole document for marker attributes like `data-widget="hero-typewriter"`. That loading list and that marker-scanning pattern are abolished: after migration, no `<script src>` list exists in BaseLayout, and no behaviour discovers its component by string matching — components own or import their behaviour explicitly. Data attributes survive only as element config (`compact`) or CSS hooks, never as the wiring mechanism.

**Mount contract** (carried from ADR-004, now living inside each element): IntersectionObserver-gated start where the widget is below the fold; `prefers-reduced-motion` renders the static frame; teardown in `disconnectedCallback`; canvas fitting resizes the backing store only, never the container.

## 4. Language rule

All first-party behaviour is TypeScript — colocated `<script>` blocks, shared modules, islands. No first-party `.js` in the target picture (legacy passthrough under `public/` is scheduled debt). This is inseparable from §3: TS is what the colocated/import model gives for free and the `public/` model could not.

## 5. Data and content placement (revision 3: src/data/ survives for REAL data only)

Owner review invalidated the "chrome data files" category, and revision 3 restores src/data/ with a strict charter: **REAL data only** — raw or extensive datasets (the survey response CSVs; any future large dataset), and at most programmatically-generated fact files (repo metrics) if collections prove awkward for them. Never chrome, config, nav, or page copy. The placement, item by item:

**Principle: content lives with its owner; a separate file must be earned by ≥2 unrelated consumers or by being a validated set.**

| Today | Target | Why |
|---|---|---|
| `projects.json` | `index.mdx` front matter (copy) + `content/metrics/repos.yaml` (repo facts) | single consumer = page content; facts are shared + script-refreshed |
| `nav.json` | typed constant in `SiteHeader.astro`'s fence | the header (incl. mobile drawer) is one owner; editing nav = editing the nav component; no indirection |
| `site.json` (wordmark, legal, endpoint) | wordmark/legal → constants in `SiteHeader`/`SiteFooter` fences; form endpoint → `astro:env` | chrome belongs to chrome components; secrets-ish config belongs in env |
| `footer.json` | constants in `FootnoteBand`/`SiteFooter` fences (partner chips import the partners collection) | one owner each |
| `stats.json` (evidence band) | `index.mdx` front matter | single consumer, homepage content |
| `network.json` (form titles, stats, checkboxes) | `FormSection` props from the embedding pages' front matter | it is page copy for the two pages that render the form; the component stays copy-free |
| `newsletter-issues.json` | **derived at build from `public/mle/*.html`** via a small loader/script into `content/issues/` (or a small build util) — static output, dynamic source | the archive already IS the data; hand-maintaining a copy guarantees drift. OPEN QUESTION for owner: derive latest-N automatically vs curate manually |
| `partners.json` | stays — becomes `content/partners/partners.yaml` with schema | genuinely multi-consumer (marquee + /partners page), a validated set |
| `survey.json` | `content/survey/…yaml` with schema (already derivation-scripted) | validated set, script-generated |
| `home-reports.json`, `network-sectors.json`, `talks.json` | fold into their single-consumer pages' front matter, except talks if/when a talks collection with entries is warranted | consumer-count rule |

End state: **`src/data/` = real data only** (survey CSVs as source of truth once the legacy pages are modernised; today the CSVs also remain under public/ for the legacy URLs). Content is in pages, chrome constants in their components, validated sets in collections, generated facts in script-refreshed collection files (metrics MAY fall back to src/data/ if the collection shape fights the refresh script — decide at implementation, note the choice).

## 6. Quality gates

1. Scope fix first: tsconfig excludes `tmp/`, `tmp2/`, `dist/`, `public/`.
2. Prettier + ESLint (astro + typescript plugins). **Fit-for-purpose line rules:** TypeScript/scripts printWidth 100; `.astro`/`.mdx` templates printWidth 160 (roughly double — long enough that ordinary elements stay on one line, no one-attribute-per-line forcing; an element splits only past 160 or when it has many children). The standard to match is the moderate density of the current Hero files; both the survey-golf and the over-formatted exhibit were failures.
3. `astro check` zero-new-errors ratchet against a recorded baseline; existing-debt burn-down is a migration task.
4. CONVENTIONS definition-of-done adds: lint clean, no new check errors, copy rule respected (§2), explicit wiring only (§3).

## 7. Out of scope of this ADR

Styles/scoped-CSS (separate assessment, ADR-003 untouched until then). The migration sequence (see `../plan/client-architecture-migration.md`). Naming note binding on that plan: exhibit names (`HeroInline.*`) are evaluation artifacts and MUST NOT survive — the pattern merges into the real component names (`Hero.astro`, `<type-writer>`); all four exhibit files are deleted at migration step 1.
