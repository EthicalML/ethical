# Redesign memory — The Institute for Ethical AI Alignment & Safety

Curated context for the Astro rebuild of ethical.institute. Load the relevant files at the start of any session working on the redesign. Full research trail (8 evaluation rounds, 4 candidate frameworks, spike implementations, audits, decision docs): https://github.com/axsaucedo/ieml-rebrand-research — the chosen seed implementation is `impl/astro/` in that repo.

## `2026-07-rebrand/` — the Astro rebuild workstream

### `adrs/`
| File | What it carries |
|---|---|
| `adr-001-platform.md` | Platform decision: Astro, static output, GitHub Pages via Actions — and why not Jekyll/Hugo/Eleventy |
| `adr-002-authoring-model.md` | How pages are authored: three tiers, direct-pages routing, MDX rules, slots vs props vs front matter |
| `adr-003-design-tokens.md` | Design system: tokens as CSS variables, stylesheet organisation, fonts, motion |
| `adr-004-widgets.md` | Canvas widgets (vanilla, `data-widget` mounts) vs stateful islands (Preact) — the boundary and contracts |
| `adr-005-content-model.md` | Collections, data files, canonical values, placeholder policy |
| `adr-006-design-source-of-truth.md` | The hosted prototype HTML as design ground truth; Claude Design for new design work |
| `adr-007-forms.md` | Serverless forms: Apps Script web app recommended; formResponse POST tested and rejected; iframe as floor |
| `adr-008-verification.md` | Measured verification harness in scripts/verify/ + continuity assertions (GA, site-verification, CNAME, mle/*) |

### `research/`
| File | What it carries |
|---|---|
| `conventions.md` | The working conventions: URL→page chain, adding a page, seed-import deltas, verification gates |
| `learnings.md` | Hard-won caveats from the evaluation rounds — read before touching anything |
| `content-prose.md` | Website copy: what is canonical vs placeholder, voice, and the prose-curation workstream |

### `plan/`
| File | What it carries |
|---|---|
| `proposed-split.md` | The phased build plan for this repository (Phase 0 seed import → chrome → copy-gated cluster fan-out → cutover) |

Design authority: ADR-006 — the Claude Design handoff prototype in the research repo (`design/design_handoff_institute_homepage/`), which must be SERVED over HTTP to render fully. Content marked placeholder there is not final.
