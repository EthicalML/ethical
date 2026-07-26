# Homepage design deltas — OWNER-PROVIDED (2026-07-26)

The explicit owner input required by Milestone A.2 (plan) / ADR-006. Owner reviewed against the original prototype served at localhost:8000. NOTE: owner's review referenced the Hugo build (4125); the working tree is ASTRO — every item below must be REPRODUCED against the Astro tree vs the original before fixing; items that prove Hugo-only are recorded as not-applicable, never silently dropped.

| # | Section | Delta | Disposition |
|---|---|---|---|
| 1 | Affiliations marquee | "MEMBERSHIPS, ADVISORY ROLES & STANDARDS COLLABORATIONS" eyebrow colour differs from original | **Owner: leave as-is** (looks ok) |
| 2 | §01 phase cards | Padding differs incl. line spacing; MAIN issue: near-zero gap above the bottom divider rule — visibly wrong even without comparing | Fix |
| 3 | §02 principles | Subtitles inside the detail card's FAILURE MODES / PRACTICAL CONTROLS differ (style/treatment) | Fix |
| 4 | §03 open source | Text width narrower than original | Fix — and see the mobile note below |
| 5 | §03 XAI + Production ML cards | Original wraps ALL card content in the card surface; implementation only wraps the text portion | Fix |
| 6 | §03 KAOS capability table | Font + colour wrong: much larger and bold vs original — review the exact original config (size/weight/colour) and match | Fix |
| 7 | §04 survey | Seems ok; could sit inside a card — SEPARATE item, not part of this pass | Deferred (owner) |
| 8 | §05 network + newsletter | Systematic font/colour misalignment, likely THEME-LEVEL: numbers green where original is white and titles white where original is green (inverted usage), form title wrong font+colour, form helper text wrong font, footnote+talks footer lacks the original's table ordering/structure with wrong fonts/colours | Fix as a CONSISTENT THEME AUDIT, not spot fixes — verify token usage (accent vs text tiers) against the original's computed styles across the whole section, then the whole page |

## Instructions carried with the list
- Item 8's root cause is suspected theme misalignment: enforce token-usage consistency ACROSS the site, extract as a cross-cutting check (computed accent/text-tier usage vs original) rather than per-element patches.
- Environment: original prototype at localhost:8000 (owner keeps it running); implementations locally servable (astro 4124).

## NEW SCOPE surfaced by this review: mobile-friendliness
Not previously captured anywhere: the site must be properly mobile-friendly — the page layouts, the navbar (needs a real mobile pattern), and EVERY component. This needs deliberate design thought (not just CSS squeezing): the prototype is desktop-only, so mobile treatments are a design question (Claude Design per ADR-006 where non-obvious). Tracked as a first-class milestone in the plan.

## Round 2 — OWNER deltas against the ASTRO build directly (2026-07-26)

| # | Area | Delta | Disposition |
|---|---|---|---|
| A1 | §02 principles | Right-hand detail card must be STICKY on scroll (prototype: sticky, top 96px) — currently scrolls away | Fix |
| A2 | §02/principles cards | Missing the pills at the bottom of the detail card; "Read principle" button present but BROKEN (link/behaviour) | Fix |
| A3 | §03 XAI card | Pipeline scanning animation not running | Fix |
| A4 | §05 form | Newsletter-signup green wash slightly too light — match the original's exact (less-light) hue | Fix |
| A5 | Open-source dropdown | Hovering XAI or Production ML leaves a transparent bottom region in the preview pane where the KAOS/GPU canvas shows through — preview swap/z-order bug | Fix |
| A6 | Initiatives dropdown | Paddings wrong throughout — content bleeds to the border and overflows the panel | Fix |
