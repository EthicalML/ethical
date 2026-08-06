# Reusable presentation components

Documented reusable components for composed pages. An API change to a component documented here updates this file in the same change. Pages own their content; these components arrange supplied data and never hide owner-editable copy.

## AchievementNeonRendition

`src/components/AchievementNeonRendition.astro`. One card system, two layouts, for a set of headline achievements: each card carries a top-anchored eyebrow, a fixed-scale title, a description, at most a primary and a secondary link rendered as buttons, a dim oversized ghost identifier cropped by the block edge, and an isometric mini-structure ghosted into the bottom-right corner. On reveal (hover or tap) the card displaces out of its footprint, uncovering a neon under-block on the vacated side. Inert dud blocks fill the remaining cells. Live on `/policy/` as variant 2.

### Variants

- **Variant 1 — full-width freeform collage.** An absolute composition on a fixed-height canvas; every piece carries a `rect` of `[left %, top px, width %, height px]`. Below its 1100px design width the whole canvas scales proportionally; below 640px it becomes a stacked column. Use for a full-bleed editorial section where the composition itself is the design and overlap, accent slabs and diamonds matter. Supports both hover modes (`slide` and `tilt`) and explicit stacking `layer`s for overlapping pieces.
- **Variant 2 — set table.** A cell grid driven by `grid-template-areas` from `layout.areas`; long cards span multiple cells, duds fill the gaps. Rows are 230px, canvas max-width 1180px, single column below 900px. Use for a contained page section that needs the same card language without owning a bespoke geometry. Reveals default to a diagonal up-left lift unless a block sets `lift`.

### Props

| Prop      | Type                | Notes                                             |
| --------- | ------------------- | ------------------------------------------------- |
| `variant` | `1 \| 2`            | 1 freeform collage, 2 set table.                  |
| `cards`   | `AchievementCard[]` | One per card block; matched to blocks by `piece`. |
| `layout`  | `Layout`            | Geometry map: areas or rects, blocks, duds.       |

### Card schema (`AchievementCard`)

| Field      | Type                | Notes                                                                                                                                                                                                                |
| ---------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `piece`    | `string`            | Key into `layout.blocks` and the iso-structure map (`eu`, `uk`, `mlsecops`, `un`, `acm`, `through-line`).                                                                                                            |
| `eyebrow`  | `string`            | Top mono label.                                                                                                                                                                                                      |
| `title`    | `string`            | One fixed size per variant; variant 2 titles may wrap, never ellipsize. In variant 1 the size-derived scale applies with a hard single line.                                                                         |
| `summary`  | `string`            | Clamped to 3 lines (2 on short cards).                                                                                                                                                                               |
| `links`    | `{ label, href }[]` | Rendered as primary buttons in both variants. Variant 1 and short variant-2 cards render the first link only; long variant-2 cards render all links. External links get `target="_blank" rel="noopener noreferrer"`. |
| `neon`     | `string`            | Under-block colour revealed on displacement; also tints the ghost mark and iso structure on hover.                                                                                                                   |
| `ghost`    | `string`            | Oversized dim identifier cropped at the top-right edge.                                                                                                                                                              |
| `footnote` | `string?`           | Accent mono line under the summary; variant 2 only.                                                                                                                                                                  |

The isometric structures are the six named shapes keyed by `piece` inside the component; a new `piece` value requires adding its structure there.

### Layout schema (`Layout`)

| Field      | Type                    | Notes                                                                                                  |
| ---------- | ----------------------- | ------------------------------------------------------------------------------------------------------ |
| `areas`    | `string[]`              | `grid-template-areas` rows for cell mode; empty in freeform mode.                                      |
| `freeform` | `number?`               | When set, the canvas is a freeform absolute composition of this height (px) using each piece's `rect`. |
| `blocks`   | `Record<string, Block>` | Keyed by card `piece`.                                                                                 |
| `duds`     | `Dud[]`                 | Inert raised surfaces; no neon, no reveal, hidden in the mobile stack.                                 |

`Block`:

| Field   | Type                                | Notes                                                                                                                 |
| ------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `area`  | `string`                            | Grid-area token, or an identity key in freeform mode.                                                                 |
| `size`  | `'long' \| 'short'`                 | Type scale, fall duration and default slide travel.                                                                   |
| `dir`   | `number`                            | Sign of the default horizontal slide travel when no `lift` is given.                                                  |
| `mode`  | `'slide' \| 'tilt'?`                | `slide` (default) displaces the card revealing the neon beneath; `tilt` picks the card up with a shadow and rotation. |
| `tilt`  | `number?`                           | Pick-up rotation in degrees for `tilt` mode (default 4).                                                              |
| `lift`  | `[number, number]?`                 | Explicit reveal travel in px `[x, y]`; overrides the dir-derived travel.                                              |
| `rect`  | `[number, number, number, number]?` | Freeform geometry `[left %, top px, width %, height px]`; required per piece in freeform mode.                        |
| `layer` | `number?`                           | Explicit stacking layer overriding the entrance-order default; use where freeform pieces overlap.                     |

`Dud`:

| Field   | Type                                                                           | Notes                                                                                                  |
| ------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `area`  | `string`                                                                       | Grid-area token or freeform identity key.                                                              |
| `shape` | `'square' \| 'diamond' \| 'triangle' \| 'plain' \| 'accent' \| 'diamond-open'` | Filled square, 45° diamond, triangle, plain dark back, solid accent slab, large faint diamond outline. |
| `rect`  | `[number, number, number, number]?`                                            | Freeform geometry, as on blocks.                                                                       |

### Behaviours

- **Entrance.** Scroll-triggered: pieces fall in as lego blocks, bottom row first (order derived from row occupancy in cell mode, rect bottoms in freeform mode), with a settle bounce, a neighbour nudge on each landing, and a neon rule wiping across each card top. The trigger is the global reveal signal (`src/shared/Reveal.ts`: the shared visibility threshold with its tall-element fallback).
- **Reveal.** Hover (pointer devices) or tap (persisted via `data-active`, cleared by tapping again, tapping another card, or Escape). `slide` moves the card by the travel vector and exposes the neon within its original footprint; `tilt` lifts and rotates it. Stacking is static: each slot keeps one permanent layer, so a reveal never reorders cards.
- **Reduced motion.** No entrance, no neon underlay, no displacement; the stack renders settled with an outline hover only.
- **Mobile.** Cell mode stacks to a single column below 900px; freeform mode scales proportionally below its 1100px design width, then stacks below 640px. Duds are hidden in both stacks.

### Usage — variant 2 (set table, as on `/policy/`)

Cards and layout live in the page's frontmatter (see `src/pages/policy.mdx` for the full card set):

```mdx
import { AchievementNeonRendition } from '../components/prose/components.js';

<AchievementNeonRendition
  variant={2}
  cards={frontmatter.achievements}
  layout={frontmatter.achievementLayout}
/>
```

```yaml
achievements:
  - piece: eu
    eyebrow: EU · GPAI CODE OF PRACTICE
    title: 8 of 12
    summary: Recommendations adopted into the main text of the second draft, EU GPAI Code of Practice.
    footnote: ACM Europe TPC / Verbatim
    neon: '#5ee6a0'
    ghost: 8/12
    links:
      - label: Read the response
        href: https://www.acm.org/binaries/content/assets/public-policy/acm-europetpc-consultation-2024---2nd-general-purpose-ai-code-of-practice-1.pdf
achievementLayout:
  areas:
    - E E U U p g
    - E E M C F F
    - T T T D D D
  blocks:
    eu: { area: E, size: long, dir: -1, lift: [-30, -30] }
    uk: { area: U, size: long, dir: -1, lift: [34, 0] }
    mlsecops: { area: M, size: short, dir: -1, lift: [-30, 0] }
    un: { area: C, size: short, dir: -1, lift: [0, 26] }
    acm: { area: F, size: short, dir: -1, lift: [30, 0] }
    through-line: { area: T, size: long, dir: -1, lift: [0, 30] }
  duds:
    - { area: p, shape: plain }
    - { area: g, shape: accent }
    - { area: D, shape: diamond-open }
```

### Usage — variant 1 (full-width freeform collage)

The retired `/policy/` collage composition, preserved here as the reference freeform layout. The adoption pair slides onto its neon; the supporting cards pick up and tilt; accent slabs, fillers and diamonds land with the stack. `acm` and `through-line` overlap the row above, hence explicit `layer`s.

```astro
---
import AchievementNeonRendition from '../components/AchievementNeonRendition.astro';

const cards = [
  {
    piece: 'eu',
    eyebrow: 'EU · GPAI CODE OF PRACTICE',
    title: '8 of 12',
    summary: 'Eight recommendations entered the Second Draft of the GPAI Code.',
    neon: '#5ee6a0',
    ghost: '8/12',
    links: [
      {
        label: 'Read the response',
        href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-europetpc-consultation-2024---2nd-general-purpose-ai-code-of-practice-1.pdf',
      },
    ],
  },
  {
    piece: 'uk',
    eyebrow: 'UNITED KINGDOM · AI REGULATION',
    title: '13 of 14',
    summary: 'Owner-attested adoption total, with the 2022 comments as the related artefact.',
    neon: '#35d787',
    ghost: '13/14',
    links: [
      {
        label: 'Read the framework comments',
        href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-uk-ai-framework-comments.pdf',
      },
    ],
  },
  {
    piece: 'mlsecops',
    eyebrow: 'CITED INTO THE CODE',
    title: 'MLSecOps in the Code',
    summary: 'Both GPAI responses cite the framework beside MITRE, OWASP and UK NCSC.',
    neon: '#38bdf8',
    ghost: 'CODE',
    links: [
      { label: 'Explore MLSecOps', href: '/frameworks/security/' },
      {
        label: 'Read the response',
        href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-europetpc-consultation-2024---2nd-general-purpose-ai-code-of-practice-1.pdf',
      },
    ],
  },
  {
    piece: 'un',
    eyebrow: 'UNITED NATIONS',
    title: 'Chair, Principles Committee',
    summary:
      'Data Governance Guidelines at the UN Commission on Science and Technology for Development.',
    neon: '#a855f7',
    ghost: 'UN',
    links: [
      {
        label: 'Public record',
        href: 'https://unctad.org/topic/commission-on-science-and-technology-for-development/working-group-on-data-governance',
      },
    ],
  },
  {
    piece: 'acm',
    eyebrow: 'ACM POLICY LEADERSHIP',
    title: 'Founding in Europe and LATAM',
    summary:
      'Founding policy leadership in Europe, followed by a founding committee role in LATAM.',
    neon: '#ff5c1f',
    ghost: 'ACM',
    links: [
      {
        label: 'ACM volunteer record',
        href: 'https://www.acm.org/volunteers/volunteer/saucedo_9722274',
      },
    ],
  },
  {
    piece: 'through-line',
    eyebrow: 'THE THROUGH-LINE',
    title: '2021 to 2026',
    summary: 'Continuous oversight from the 2021 AI Act comments to the 2026 agentic brief.',
    neon: '#ff3b57',
    ghost: '2026',
    links: [
      {
        label: '2021 comments',
        href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-ai-consultation.pdf',
      },
      {
        label: '2026 brief',
        href: 'https://www.acm.org/public-policy/europe-tpc/calibrating-oversight-agentic-frontier-models-04272026',
      },
    ],
  },
];

const layout = {
  areas: [],
  freeform: 973,
  blocks: {
    eu: { area: 'eu', size: 'long', dir: 1, mode: 'slide', rect: [22, 0, 50, 330] },
    uk: { area: 'uk', size: 'long', dir: -1, mode: 'slide', rect: [36, 329, 44, 300] },
    mlsecops: {
      area: 'mlsecops',
      size: 'long',
      dir: 1,
      mode: 'tilt',
      tilt: -4.5,
      rect: [2, 559, 31, 330],
    },
    un: { area: 'un', size: 'short', dir: -1, mode: 'tilt', tilt: 4.5, rect: [76, 189, 21, 370] },
    acm: {
      area: 'acm',
      size: 'long',
      dir: -1,
      mode: 'slide',
      lift: [0, 34],
      layer: 20,
      rect: [32.6, 623, 31, 330],
    },
    'through-line': {
      area: 'through-line',
      size: 'long',
      dir: 1,
      mode: 'slide',
      lift: [44, 0],
      layer: 21,
      rect: [63.2, 623, 35, 330],
    },
  },
  duds: [
    { area: 'filler-west', shape: 'square', rect: [4, 239, 18, 300] },
    { area: 'filler-north', shape: 'plain', rect: [14, 0, 8, 240] },
    { area: 'filler-east', shape: 'square', rect: [72, 329, 8, 300] },
    { area: 'filler-centre', shape: 'square', rect: [32, 409, 4, 220] },
    { area: 'filler-south', shape: 'plain', rect: [33, 913, 29, 60] },
    { area: 'accent-eu', shape: 'accent', rect: [69, 42, 7, 246] },
    { area: 'accent-uk', shape: 'accent', rect: [33, 370, 5, 220] },
    { area: 'accent-static', shape: 'accent', rect: [57, 573, 5, 56] },
    { area: 'diamond-north', shape: 'diamond', rect: [18, 172, 6.5, 77] },
    { area: 'diamond-south', shape: 'diamond', rect: [95, 884, 5, 59] },
  ],
};
---

<AchievementNeonRendition variant={1} cards={cards} layout={layout} />
```

## SurveyReport

`src/components/SurveyReportIsland.astro` is the typed Astro wrapper for the `src/components/SurveyReportApp.tsx` Preact island. It renders a survey report as owner-authored chapters with headline stats, finding copy, static CSS bar charts, desktop scrollytelling, mobile selects and a single methodology surface. Live on `/reports/state-of-ml-2024/` and `/reports/state-of-ml-2025/`.

### Props

| Prop          | Type                                  | Notes                                                                                                                                |
| ------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `report`      | `SurveyReportData`                    | Build-time aggregate from `buildSurveyReport` or `buildSurveyComparison`. The latter enables comparison UI through `comparisonRows`. |
| `year`        | `number`                              | Primary report year used by the chart legend and methodology.                                                                        |
| `chapters`    | `SurveyReportChapter[]`               | Page-owned chapter labels, section mapping and deck copy; the methodology chapter has no section mapping.                            |
| `findings`    | `Record<string, SurveyReportFinding>` | Page-owned headline and insight pair keyed by stable question ID.                                                                    |
| `stats`       | `SurveyReportStat[]`                  | Page-owned hero callouts with eyebrow, value, label and report hash link.                                                            |
| `methodology` | `SurveyMethodologyCopy`               | Page-owned methodology deck, collection and denominator notes, plus the other-year link.                                             |

### Data modes

- **Single year.** Pass `buildSurveyReport(csv)` output. The comparison switch, prior-year bars and delta chips are not rendered. Used by the 2024 baseline.
- **Comparison.** Pass `buildSurveyComparison(currentCsv, previousCsv)` output. The default-on comparison switch controls the subordinate prior-year bars and delta chips. Used by the 2025 edition.

The page imports `SurveyReport` from `src/components/prose/components.js`; all chapter, finding, stat and methodology copy stays in page frontmatter. Question definitions, aggregation, aliases and option alignment stay in `src/utils/SurveyReportData.ts`.

```mdx
import surveyCsv from '../../data/survey-2024.csv?raw';
import { SurveyReport } from '../../components/prose/components.js';
import { buildSurveyReport } from '../../utils/SurveyReportData';

export const report = buildSurveyReport(surveyCsv);

<SurveyReport
  report={report}
  year={2024}
  chapters={frontmatter.chapters}
  findings={frontmatter.findings}
  stats={frontmatter.stats}
  methodology={frontmatter.methodology}
/>
```

## Embed modes

- `SurveyExplorer` / `SurveyExplorerIsland` accept a default-off `compact` prop for card embeds: short question pills sit beside the year toggle (replacing the full tabs, the sort button and the question meta), chrome is stripped, type and bars tighten to card scale, the N count is dropped, and the focus block becomes a name/share/YoY row. Wired on the homepage survey carousel card.
- `PolicyRecordPreview` accepts a default-off `staged` prop that forces its sub-900px list/detail flow at any viewport (narrow embeds): filters+list first, a pick shows the pane with the back control. Currently unwired.

## PhraseTerrain

`src/shared/canvas/PhraseTerrain.ts`. A shared canvas custom element (`<phrase-terrain>` wrapping a `.hero-canvas`) rendering a slowly rotating sphere of short text phrases with depth fade, a band sweep, and a cursor gravity field (window-level pointer tracking; nearby phrases pull toward the cursor, brighten and resolve to white). `setPhrases(list)` swaps the phrase set with a ~400ms crossfade; with no list it defaults to the policy corpus fragments (`utils/PolicyCorpus` via `PolicyHeroShared`). Honors the canvas mount contract (IntersectionObserver gating, reduced-motion static frame, teardown on disconnect).

Currently unwired: kept for a future home after the policy hero and record studies retired (the owner wants it reused, not discarded). To mount it, import the module and render `<phrase-terrain><canvas class="hero-canvas" aria-hidden="true"></canvas></phrase-terrain>`.
