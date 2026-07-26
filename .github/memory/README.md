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

Design authority: the Claude Design handoff in the research repo (`design/design_handoff_institute_homepage/` — README spec + prototype HTML). The prototype is ground truth for visuals; content marked placeholder there is not final.
