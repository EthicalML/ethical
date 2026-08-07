# Milestone A.1 report — Astro seed import

Completed on branch `redesign-astro`. No work was performed on `master`, no deployment workflow was added, and no design changes were made.

## What moved where

- Removed the branch-only legacy Jekyll surface: root content pages, `_includes/`, `Gemfile`, `replace_partials.sh`, and assets used only by the removed pages.
- Preserved `.github/`, `.gitignore`, `README.md`, and the rebrand memory unchanged.
- Imported the evaluated Astro tree from `tmp/impl/astro/`: `src/`, seed runtime files from `public/`, `astro.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json`, and `.tool-versions`.
- Excluded `node_modules/`, `dist/`, `.astro/`, `REPORT.md`, evaluation scripts/results, screenshots, and other round artefacts.
- Installed the locked npm dependency tree at the repository root. Audit result: zero vulnerabilities.
- Added `CONVENTIONS.md` at the repository root as the working guide while keeping `.github/memory/2026-07-rebrand/` authoritative.
- Moved `rehypeSectionize` from `astro.config.mjs` to `src/plugins/rehype-sectionize.mjs`; the config imports and registers it.

## Legacy preservation map

| Existing URL | New source location |
|---|---|
| `/CNAME` build artefact | `public/CNAME` |
| `/mle/<issue>.html` for all 396 issues | `public/mle/<issue>.html` |
| `/state-of-ml-2024.html` | `public/state-of-ml-2024.html` |
| `/state-of-ml-2025.html` | `public/state-of-ml-2025.html` |
| `/data.csv` | `public/data.csv` |
| `/data-2025.csv` | `public/data-2025.csv` |
| `/assets/css/state-of-ml-2024.css` | `public/assets/css/state-of-ml-2024.css` |
| `/assets/css/state-of-ml-2025.css` | `public/assets/css/state-of-ml-2025.css` |
| `/assets/js/state-of-ml-2024.js` | `public/assets/js/state-of-ml-2024.js` |
| `/assets/js/state-of-ml-2025.js` | `public/assets/js/state-of-ml-2025.js` |
| `/assets/js/chartjs-plugin-colorschemes-v3.js` | `public/assets/js/chartjs-plugin-colorschemes-v3.js` |
| Survey report legacy chrome dependencies under `/assets/css/`, `/assets/js/`, and `/assets/fonts/` | Matching unchanged paths under `public/assets/` |
| `/images/dots-vision.jpg` | `public/images/dots-vision.jpg` |
| `/images/logos/eml-logo-white.png` | `public/images/logos/eml-logo-white.png` |
| `/images/prod-ml-survey-banner.jpg` | `public/images/prod-ml-survey-banner.jpg` |
| `/images/banner.jpg` referenced by the report chrome stylesheet | `public/images/banner.jpg` |

The State of ML sources originally depended on Jekyll front matter and three includes. Because Astro serves `public/` verbatim, they were replaced with the repository's already compiled standalone HTML and the current institute author metadata was restored. No Liquid/Jekyll markers remain in either served report.

## Convention deltas applied

- `src/styles/round4.css` → `src/styles/layout.css`
- `src/styles/astro.css` → `src/styles/prose.css`
- `public/assets/round4.js` → `public/assets/site.js`
- `public/assets/prototype-canvases.js` → `public/assets/canvases.js`
- All stylesheet and script references were updated; no evaluation-era names remain in the imported source.
- `package.json` and the lockfile now use the package name `ethical-institute-site`; the package description names The Institute for Ethical AI Alignment & Safety.
- Root conventions now include value-placement rules, `composed: true` semantics, MDX/slot cautions, the vanilla-widget versus Preact-island boundary, the `src/assets/` versus `public/` image pipeline, direct-page routing, automatic numbered sections, and verification requirements.

## Verification harness review

- Added `scripts/verify/routes.json` with the nine evaluation baseline routes.
- Added `verify-dom.mjs <route...>` using the required default Playwright import and `chromium` destructuring. Retained and adapted checks for HTTP/runtime health, slow-scroll reveal completion, visible-canvas pixel sampling, document height/width bounds, homepage wiring, and KAOS mount sizing.
- The hidden 1×1 header preview canvas is deliberately excluded until a menu opens it; it is not an active rendered widget. The homepage principle-width selector was adapted to `.principles-explorer-grid` in the imported DOM.
- Added `verify-shots.mjs <route...>` with full-page captures, reduced motion, disabled animation/transitions, a lazy-content scroll sweep, and canvas masks. Output and manifest go to git-ignored `scripts/verify/out/`.
- Added `scripts/verify/README.md` with one-line assertions and reasons for every retained check.

## Verification output

- `npm run build` with the pinned Node 22.14 runtime: passed; Astro generated 20 static pages.
- DOM gate across `/`, `/principles/`, `/principles/09/`, `/open-source/`, `/data/survey-explorer/`, `/frameworks/maturity-model/`, `/network/`, `/contact/`, and `/talks/`: all passed.
- DOM summary: all routes HTTP 200; zero page/console errors; zero unrevealed targets; document widths 1440px; maximum height 7020px, below the 20,000px ceiling; every visible canvas non-blank; homepage and KAOS-specific assertions passed.
- Screenshot harness across the same nine routes: all captures completed with HTTP 200 and zero page/console errors. Captures remain ignored.
- Continuity probes: HTTP 200 for `/mle/1.html`, `/state-of-ml-2025.html`, both CSVs, `/CNAME`, the legacy main stylesheet, the 2025 report script, and the report logo. The served 2025 report contains no Liquid/Jekyll template markers.
- Preview ran only on `127.0.0.1:4126` and was stopped after verification. Ports 8000, 4124, and 4125 were not touched.

## Commits

- `3080a50` — retire the legacy Jekyll surface while moving continuity artefacts
- `ae268cc` — import the evaluated Astro seed
- `8827e35` — apply production naming and authoring conventions
- `87efcca` — port the measured verification harness
- `1cce190` — make the survey reports standalone and preserve their dependencies
- `7fe5c4b` — adapt active-canvas and principle-grid verification selectors

## Deferred

- Homepage design delta fixes are Milestone A.2 and were intentionally not touched.
- Mobile design treatment is Milestone A'.
- Redirects, canonical URLs, SEO/analytics continuity in Astro chrome, forms, self-hosted fonts, and the GitHub Pages Actions workflow remain in their later milestones per the binding plan.
- The interactive shell defaulted to Node 22.7, below Astro 7's supported range. Build and verification used the repository-pinned Node 22.14 binary explicitly; `.tool-versions` remains the project runtime source of truth.
