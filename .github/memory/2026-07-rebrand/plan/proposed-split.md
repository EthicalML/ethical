# Proposed split — Astro rebuild of ethical.institute in this repository

Basis: the decided platform (ADR-001), the validated seed at research-repo `impl/astro/`, the design source of truth (ADR-006), and the nav-proposal sitemap (~35 pages). Execution: Codex with self-contained briefs and byte-sized commits, orchestrator-verified against the gates in `research/conventions.md`.

## PR structure: ONE long-lived branch, TWO PRs total

`master` deploys straight to GitHub Pages, so nothing partial can ever merge. All work happens as direct commits on the **`redesign-astro`** branch (no per-phase PRs — the milestones below are checkpoints reviewed on the open branch as it evolves). The iteration-heavy reality of this build makes PR-per-phase pure overhead.

- **PR 1 — the rebuilt site** (this branch, kept open long-running): everything through Milestone D. Owner reviews on the open PR + local serves; optionally a temporary preview deploy on a fork's Pages.
- **PR 2 — cutover**: the small, separately reviewable switch (Pages source → Actions workflow, redirects live, CNAME) so going-live is its own explicit approval.
- The two PRs are **stacked** (PR 2 branches from PR 1's branch), registered with GitHub's stacked-PRs via `gh stack link <pr1> <pr2>` (bottom-up). Note the known limitation: stack-tracked PRs merge via the web UI; `gh stack unstack` restores CLI merging if needed.

## Milestone A — Seed import + design lock-down
1. Import the round-8 Astro tree onto the branch (site source at repo root), applying the conventions review deltas during import (session-era file renames, `rehypeSectionize` → `src/plugins/`, drop evaluation artefacts). Port the verification harness into `scripts/verify/` (ADR-008). Build green + routes verified via the harness.
2. **Homepage design lock-down (first implementation step, per ADR-006):** serve the prototype, run the measured comparison harness, and close the KNOWN remaining inconsistencies on the home page until the owner signs off the homepage as design-locked. New surfaces wait until this gate passes.
3. GH Actions workflow added but inert for production (branch builds/dry-runs only; `master`'s Pages deployment untouched).

## Milestone B — Chrome completion
Mobile navigation drawer; self-hosted fonts; per-page SEO front matter (title/description); favicon/OG; 404; Initiatives-rail interactivity; the `redirects` map for every legacy URL + canonicals + sitemap (SEO task); **forms wired per ADR-007** (designed form → Google Form backend, acceptance-tested against the live Sheet — forms are decorative until this lands); **Google Analytics tag and the `google-site-verification` meta carried from the live site's header into `BaseLayout.astro`** (ADR-008 continuity assertions). **Continuity requirements:** preserve `CNAME` (ethical.institute) into the built output, and keep the legacy `mle/*` newsletter archive plus any linked static artefacts (PDFs, state-of-ml data) served at their existing URLs — passthrough-copy them; never migrate or rewrite them.

## Milestone C — Prose curation (parallel workstream; gates D per cluster)
Per `research/content-prose.md`: copy sheets per cluster carrying the REBRAND REPHRASING (legacy prose is input, not output — see the fundamental-frame section there), owner approves sheets, Codex applies verbatim. Design questions arising here go to **Claude Design** (ADR-006), not ad-hoc invention.

## Milestone D — Page fan-out by cluster (behind C's per-cluster approval)
- D1 Open-source: add kompute, xai, production-ml-list, ai-guidelines (kaos exists).
- D2 Principles: upgrade the 9 detail bodies with approved copy + case studies.
- D3 Frameworks & reports: add ai-rfx, reports index, 2024/2025 reports, methodology; wire the real survey dataset (`data.csv`/`data-2025.csv`).
- D4 Network cluster: add newsletter, events, fellowships, partners.
- D5 About cluster: port about; add team, advisory, annual-review, press; research/standards/policy pages with approved prose.
Gate per commit-batch: conventions checklist, DOM + screenshot gates on new routes, placeholder greps.

## Cutover (PR 2)
Placeholder grep = zero unapproved hits; full-site link check + Playwright sweep (all routes, 3 viewports); redirects verified; CNAME + `mle/*` continuity verified on the built artefact; switch Pages to the workflow; Search Console sitemap nudge. Rollback = flip Pages source back to `master`.

## Standing rules
- Every conventions/decision change updates `.github/memory/` in the same commit-batch — drift is a review blocker.
- No new dependencies without an ADR note (pinned toolchain: astro + @astrojs/mdx + preact + sharp).
- The hosted prototype remains the visual authority (ADR-006); deliberate deviations get named in the commit message.
