# Proposed split — Astro rebuild of ethical.institute in this repository

Supersedes the pre-spike `proposed-split.md`. Basis: the decided platform (ADR-001), the validated seed at research-repo `impl/astro/` (9 pages at prototype fidelity, conventions applied through round 8), and the nav-proposal sitemap (~35 pages). Execution: Codex per phase with self-contained briefs, byte-sized commits, PR per phase onto the `redesign-astro` branch; orchestrator verifies each phase against the gates in `conventions.md`. The live site keeps serving from `master` until cutover.

## Phase 0 — Import the seed (1 PR)
Copy the round-8 Astro tree into this repo under the branch (site source at repo root or `/site` — decide at import; root preferred for GH Pages simplicity). Apply the conventions review deltas during import, not after: rename session-era assets (`round4.css`→`layout.css`, `round4.js`→`site.js`, `prototype-canvases.js`→`canvases.js`, `astro.css`→`prose.css`), move `rehypeSectionize` out of `astro.config.mjs` into `src/plugins/`, drop evaluation leftovers (REPORT.md, round screenshots, spec briefs). Add the GH Actions workflow (build + deploy-pages, path-filtered so `master` keeps deploying the old site until cutover). Gate: build green, 9 routes verified, workflow dry-run.

## Phase 1 — Prose & content curation (parallel with Phase 2; see content-prose.md)
The unfinished workstream: replace placeholder copy with owner-approved canonical text. Deliverables: copy inventory resolved page-by-page (real numbers, real talks, real member/affiliation entries, licensed logos or approved wordmark stand-ins), owner sign-off per cluster. This phase is writing + decisions, not engineering; it gates Phase 3's content-bearing pages.

## Phase 2 — Complete the chrome (1-2 PRs)
Mobile navigation drawer (known gap from round 4); self-host fonts (ADR-003); favicon/OG/social meta per page; 404 page; the `redirects` map for every legacy URL + canonical tags + sitemap (SEO task #10); Initiatives rail interactivity if still static. Gate: nav verified headless at three viewports; redirect stubs resolve; Lighthouse pass for the basics.

## Phase 3 — Page fan-out by cluster (4-5 PRs, parallelisable once Phase 1 copy lands per cluster)
- 3a Open-source: index exists; add kompute, xai, production-ml-list, ai-guidelines pages (kaos exists).
- 3b Principles: explorer + 9 detail pages exist — upgrade detail bodies with curated copy + case studies.
- 3c Frameworks & reports: maturity-model + mlsecops exist; add ai-rfx, reports index, 2024/2025 report pages, methodology; survey-explorer page exists (wire final dataset).
- 3d Network cluster: network/contact/talks exist; add newsletter, events, fellowships, partners.
- 3e About cluster: about exists (from spike rounds — port); add team, advisory, annual-review, press; research/standards/policy stubs with ArticleHero + curated prose.
Gate per PR: conventions checklist (content-free components, named-key data, placeholder greps), DOM + screenshot gates on new routes.

## Phase 4 — Cutover (1 PR + operations)
Placeholder grep gate must return zero unapproved hits; full-site link check + Playwright sweep (all routes, three viewports); switch Pages to the Actions workflow/branch; verify redirects live; Search Console sitemap nudge; archive note in README pointing to the research repo. Rollback path: Pages source flip back to `master`.

## Standing rules
- Every PR updates `.github/memory/` when a decision/convention changes — memory drift is a review blocker.
- No new dependencies without an ADR note (the toolchain is pinned: astro + @astrojs/mdx + preact + sharp-for-images).
- The design prototype remains the visual authority; any deliberate deviation gets a line in the PR body.
