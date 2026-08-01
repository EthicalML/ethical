PROPOSAL — for owner review

# Frameworks group content sheet — principles linkage, AI-RFX, ML Maturity Model, Agentic & ML Security, agentic placeholders

This version replaces the earlier CURRENT/SOURCE/PROPOSED annotation tables with the proposed content inline, per the sheet 11/12 approach: each page section outlines the content to add plus its widgets. The reports / State of Production ML pages are deliberately parked (kept verbatim at the bottom) and will be handled in a separate pass. ⚠ = unverified fact · **[OWNER: …]** = decision or confirmation needed.

## Scope and grounding decisions

| Decision | Detail |
| --- | --- |
| Group | `/frameworks` index · `/frameworks/ai-rfx` · `/frameworks/maturity-model` · `/frameworks/agentic-ml-security` (replaces the MLSecOps Top 10 page) · placeholders `/frameworks/agentic-rfx` and `/frameworks/agentic-maturity-model`. Reports pages are out of scope for this pass. |
| Principles linkage | Every framework page anchors to the NEW nine principles from `11-sheet-principles.md` (P01 Human Augmentation by Oversight … P09 Human Alignment by Intent). Cross-links are bidirectional: sheet 11 already lists framework references in each principle's Related links row; the framework pages link back to `/principles/NN/`. |
| Security consolidation | The Agentic & ML Security page absorbs ALL the security initiatives currently name-dropped on the homepage security card (`index.mdx` reports.security): MLSecOps Top 10, LF AI & Data ML Security Committee, LF ML security best-practices work, OpenSSF partnership, and the OWASP Top 10 for Agentic Applications review. The card's `relatedLinks` finally get a proper on-site home instead of dangling external references. |
| The P09 gap | The legacy 8 AI-RFX criteria map to P01–P08 only; no ninth criterion exists and none should be invented for the classic framework. Proposed resolution: the ninth principle is addressed by the FUTURE Agentic RFX, whose agentic criteria naturally include alignment-with-intent. The classic AI-RFX page states the gap and points forward. |
| URL | RESOLVED: `/frameworks/security/`. The legacy live page is `security.html` at the site root (master branch), so there is no in-site `/frameworks/mlsecops/` link equity to preserve — the prototype route simply moves; legacy `.html` paths are covered by the cutover redirect map (task #10). |
| Legacy sources | The live institute site is preserved on the `master` branch: `rfx.html`, `rfp.html`, `mlmm.html`, `security.html` are the content source of truth for these pages. Read via `git show master:<file>`. AI-RFX spans BOTH `rfx.html` (the framework overview) and `rfp.html` (the RFP/RFI templates page) — read both. |
| No numbers | RESOLVED: framework pages carry NO metric chips or counts (these are not OSS repos — stars/levels/signals framing does not apply). The prototype's `4 levels / 5 domains / 20 signals` chips are dropped, not verified. |
| Naming note | The homepage card currently says "ML & Agent Security"; the owner's requested page name is "Agentic & ML Security". Standardise on **Agentic & ML Security** everywhere (card title, page hero, nav). |

## Crosswalk: AI-RFX criteria ↔ the nine principles

The core linking asset, used by both `/frameworks/ai-rfx` and referenced from `/principles`. Keep the original criteria numbering; principle names are the sheet-11 finals.

| # | AI-RFX criterion | Principle |
| --- | --- | --- |
| 1 | Practical benchmarks | P06 Evaluation by Observability |
| 2 | Explainability by justification | P03 Explainability by Justification |
| 3 | Infrastructure for reproducible operations | P04 Provenance by Reproducibility |
| 4 | Data and model assessment processes | P02 Fairness by Calibration |
| 5 | Privacy-enforcing capabilities | P07 Trust by Privacy |
| 6 | Operational process design | P01 Human Augmentation by Oversight |
| 7 | Change-management capabilities | P05 Reskilling by Design |
| 8 | Security risk mitigations | P08 Safety by Security |
| — | (no classic criterion) | P09 Human Alignment by Intent → covered by the future Agentic RFX; stated as a known gap on the classic page, never silently patched |

## /frameworks (index)

Router page, kept short — it exists to place the six pages and show the classic→agentic progression, not to duplicate their substance.

- **Hero**: eyebrow `FRAMEWORKS`, title *"Principles you can procure and audit against."*, intro: *"The frameworks translate the nine Responsible AI Principles into checklists, taxonomies and templates: procurement criteria for buying AI systems, a maturity model for the organisation running them, and a security taxonomy for the systems themselves — each now extending from ML to agentic systems."*
- **Widget — framework cards grid**: six cards in two labelled rows (`ESTABLISHED` / `IN DEVELOPMENT`), each card with a status pill (`ACTIVE` · `ACTIVE` · `ACTIVE` / `PLACEHOLDER` ×2 — agentic-ml-security sits in ESTABLISHED since it ships with real content), one-line description pulled from the destination hero, and principle chips showing which of P01–P09 the framework serves. Reuse the existing card/pill vocabulary (round pills, square cards); no new interactive machinery needed — a static grid is enough for a router page. Title morphs: card titles morph into the destination hero h1s via the same `MorphPairs` wiring as the OSS portal (names `ai-rfx-title`, `maturity-model-title`, `security-title` aligning with the homepage `initiative-*` sources — see owner decisions).
- **Cross-link band**: one line under the grid: *"Every framework anchors to the nine Responsible AI Principles →"* linking `/principles/`.

## /frameworks/ai-rfx

The most developed legacy asset (master `rfx.html`) and currently the only one with no dedicated page. Full build.

- **Hero**: eyebrow `FRAMEWORK / PROCUREMENT`, title *"The AI-RFX Procurement Framework"*, intro: *"Open-source templates that convert the nine Responsible AI Principles into a procurement checklist — for organisations buying, building or deploying AI systems."*
- **Section — Beyond the model itself**: *"AI-RFX evaluates the maturity of the technical infrastructure and processes around a system, not just its algorithms. Underneath it sits the ML Maturity Model, which turns each criterion into levels of organisational capability."* Links `/frameworks/maturity-model/`.
- **Widget — criteria↔principles map**: interactive component rendering the 8-row crosswalk above. Each row: criterion number + name on the left, principle chip on the right linking to `/principles/NN/`; selecting a row expands a 1–2 sentence description of what evidence the criterion requests from a supplier (source: `git show master:rfx.html` criterion blurbs, verbatim-then-rephrase per `01-voice-and-messaging.md`). This is a new component (`CriteriaMap` or similar) but structurally a sibling of `ComparisonTable` — same two-column register, plus expand.
- **Widget — procurement flow strip**: reuse the homepage governance preview's five steps verbatim (Define governance requirements `RFP` → Set evaluation criteria `SCORE` → Request supplier evidence `EVIDENCE` → Compare and document responses `REVIEW` → Carry obligations into delivery `CONTROL`) as a horizontal step strip on this page — the homepage teaser then morphs into its source of truth.
- **Section — The ninth principle**: short, honest: *"The framework predates the ninth principle, Human Alignment by Intent, and its eight criteria do not yet cover it. Alignment criteria are agentic by nature — what a system is pursuing, not just how it is built — and are being drafted as part of the Agentic RFX."* Links the placeholder page.
- **Section — RFP and RFI**: AI-RFX ships both RFP and RFI template sets (`master:rfx.html` + `master:rfp.html`); one short paragraph distinguishing them (RFI to survey the supplier landscape, RFP to run the procurement) so both legacy pages have a home here. No numbers/metric chips on this page.
- **CTA**: *"Request the templates →"* to the contact form (keeps the legacy distribution gate), MIT licence stated in prose.

## /frameworks/maturity-model

Page exists (`maturity-model.mdx`); this is a content-tightening pass, not a rebuild.

- **Hero**: keep — eyebrow `FRAMEWORK / MATURITY MODEL`, title *"Machine Learning Maturity Model"*, intro *"Make responsible ML repeatable — a practical path from isolated good intentions to adaptive organisational capability."*
- **Keep**: the four-phase strategy block reuse (verbatim IP, fine to repeat), the "conversation and evidence tool, not a certification shortcut" hedge (keep verbatim), delivery-checklist and capabilities sections pending the source check below.
- **Add — principle + RFX anchoring**: one section stating the model's position in the stack: *"The maturity model is what AI-RFX scores against: each procurement criterion asks where the organisation sits on the model's capability levels. Both inherit their targets from the nine principles."* Links `/frameworks/ai-rfx/` and `/principles/`.
- **Add — agentic pointer**: one line: agentic operations (agent identity, mandate boundaries, action observability) are being drafted as the Agentic Maturity Model; links the placeholder.
- **Resolved flags**: the `4 levels / 5 domains / 20 signals` chips are DROPPED (no numbers on framework pages, per decision). The delivery-checklist and capabilities body must be verified against `git show master:mlmm.html` during implementation and corrected where it diverges from the real model.

## /frameworks/agentic-ml-security (replaces /frameworks/mlsecops)

The consolidation page: one home for the Institute's security work across ML and agentic systems. Replaces the MLSecOps-only page; the MLSecOps Top 10 becomes its first pillar rather than the whole page.

- **Hero**: eyebrow `FRAMEWORK / SECURITY`, title *"Agentic & ML Security"*, intro: *"The Institute's security programme spans the MLSecOps Top 10 for the machine-learning lifecycle, collaboration with the Linux Foundation and OpenSSF on ML security practice, and active review of OWASP guidance for agentic systems — machine-learning security doesn't stop being relevant when the system starts calling tools."* Keeps the `initiative-security-title` morph from the homepage card.
- **Section — The MLSecOps Top 10**: keep the existing accurate intro sentence ("MLSecOps connects common machine-learning security failures to controls…"). **Restore the full 10 rows** to the `ComparisonTable` (the page currently ships 7; missing: Identification & authentication failures → IAM & RBAC failures for ML services, Software & data integrity failures → ML infra/ETL/CI-CD integrity failures, Server-side request forgery → ML-server side request forgery). Homepage teaser may stay at 7. Fact line: code and worked examples at `github.com/EthicalML/fml-security` (confirmed live: 125 ⭐ / 23 forks).
- **Section — The agentic frontier**: new. States the extension claim concretely using the OWASP Top 10 for Agentic Applications (published Dec 2025, ASI01–ASI10: Agent Goal Hijack, Tool Misuse & Exploitation, Identity & Privilege Abuse, Agentic Supply Chain Vulnerabilities, Unexpected Code Execution, Memory & Context Poisoning, Insecure Inter-Agent Communication, Cascading Failures, Human-Agent Trust Exploitation, Rogue Agents). Framing: the MLSecOps taxonomy covered the lifecycle around models; agentic systems add delegated authority, tools and memory as attack surface. **Widget — agentic risk map**: a second two-column table in the same `ComparisonTable` register mapping selected ASI categories to the failure domains the principles and KAOS-style controls address (e.g. ASI03 Identity & Privilege Abuse → per-agent identity + fail-closed gateways; ASI06 Memory & Context Poisoning → server-derived memory scoping) — 4–6 rows, not all ten; this is a positioning table, not a reproduction of OWASP's list. RESOLVED wording: the Institute's chief scientist is an **official reviewer of the OWASP Top 10 for Agentic Applications**, named in the published documents — state this directly, it is the strongest citable claim. **[OWNER: supply the reviewer-credit document links when convenient; ship with the OWASP announcement link until then.]**
- **Section — Built with the field**: the initiative band giving the homepage card's dangling links a home: the ML Security Committee at LF AI & Data (`lfaidata.foundation/groups/security-compliance-work-group/`) — with the OpenSSF collaboration folded in as a small mention under this item (the partnership ran through the committee; no standalone OpenSSF entry) — the LF machine-learning security best-practices publication, and the OWASP agentic announcement with the reviewer credit. Simple link-card row, external links per the Links rule (new tab).
- **Section — Principle anchor**: one line linking P08 Safety by Security (`/principles/08/`) as the principle this framework implements, and P01/P09 for the agentic mandate/alignment risks.
- **CTA**: keep *"Discuss implementation →"* to contact.

## /frameworks/agentic-rfx (placeholder)

Deliberately thin — a real page shell, honest about status. No invented criteria.

- **Hero**: eyebrow `FRAMEWORK / IN DEVELOPMENT`, title *"The Agentic RFX Framework"*, intro: *"Procurement criteria for agentic systems: mandate boundaries, tool and memory governance, identity, and alignment with intent. In development — extending the eight AI-RFX criteria to systems that act."*
- **Body**: one short section: what it will add over classic AI-RFX (agent mandate + oversight evidence → P01; alignment-with-intent evidence → P09, resolving the classic framework's ninth-principle gap; agentic security evidence aligned to the ASI taxonomy → P08). Status line: criteria being drafted against the nine principles. CTA: *"Get notified / contribute →"* to contact. Status pill `PLACEHOLDER` on the index card.

## /frameworks/agentic-maturity-model (placeholder)

- **Hero**: eyebrow `FRAMEWORK / IN DEVELOPMENT`, title *"Agentic Maturity Model"*, intro: *"Organisational capability levels for operating agentic systems: agent identity, bounded autonomy, action observability and incident response. In development — the agentic counterpart to the ML Maturity Model."*
- **Body**: one section naming the capability domains under consideration (identity & access for agents, mandate/approval design, memory & data governance, observability of agent actions, failure containment) with an explicit "domains are draft, not ratified" note. CTA to contact. Status pill `PLACEHOLDER`.

## Build inventory

| Page | Route | Status | Components |
| --- | --- | --- | --- |
| Frameworks index | `/frameworks/` | rebuild (current page is a stub) | ArticleHero, new `FrameworkCards` grid (static), MorphPairs wiring |
| AI-RFX | `/frameworks/ai-rfx/` | NEW | ArticleHero, new `CriteriaMap`, procurement step strip (extract from homepage governance preview), fact strip, CTA |
| Maturity Model | `/frameworks/maturity-model/` | content pass | existing `MaturityModelContent`; add anchoring sections |
| Agentic & ML Security | `/frameworks/agentic-ml-security/` | rebuild from `mlsecops.mdx` | ArticleHero, `ComparisonTable` ×2 (10-row MLSecOps + agentic risk map), initiative link-card row, CTA |
| Agentic RFX | `/frameworks/agentic-rfx/` | NEW placeholder | ArticleHero + prose + CTA only |
| Agentic MM | `/frameworks/agentic-maturity-model/` | NEW placeholder | ArticleHero + prose + CTA only |

Supporting changes: homepage security card retitled to "Agentic & ML Security", its `relatedLinks` retargeted to the new page's sections (or trimmed since the page now carries them), its primary action `MLSecOps Top 10` → `Agentic & ML Security`; homepage governance card actions gain an `/frameworks/ai-rfx/` link once that page exists; nav Initiatives pane updated to the six pages; redirect `/frameworks/mlsecops/` → new slug in the SEO map (task #10); `src/data/mlsecops.json`/frontmatter rows extended to 10.

## Owner decisions (ratified 2026-08-01)

1. Security page slug: `/frameworks/security/`. Legacy live page is root-level `security.html` on master; no in-site redirect concern.
2. Morph naming: REUSE — homepage initiative cards and `/frameworks/` index cards share transition names where they morph into the same destination hero (same pattern as `kaos-title`).
3. AI-RFX source of truth: master-branch `rfx.html` + `rfp.html` (RFP and RFI). "Request the templates" stays contact-form-gated.
4. No numbers/metric chips on framework pages; MLMM body verified against `master:mlmm.html` during implementation.
5. OWASP: state the official-reviewer credit (owner to supply document links). OpenSSF: small mention under the LF ML Security Committee item, no standalone entry.
6. Agentic placeholders appear in the nav as well as on the index grid ("we can edit once it's there").

---

# PARKED — Reports & State of Production ML (separate pass, tables kept verbatim from the previous sheet version)

## /reports (index)

| | |
| --- | --- |
| CURRENT | None — no `src/pages/reports/` directory exists. Reports currently surface only via the homepage `ReportsSection.astro` (driven by homepage frontmatter) and the single `/data/survey-explorer` page. |
| SOURCE | Nav proposal's "Reports & data" pane: *"State of Production ML 2025 · 2024 edition · Survey explorer · Methodology & dataset."* Homepage intro: *"Two annual practitioner surveys — context, tools, scope and statistics. Choose a question, compare 2024 with 2025, and select any answer to read what it means for the principles."* |
| PROPOSED | NEW page. Eyebrow "REPORTS & DATA" heading *"The State of Production ML"* — reuse the homepage intro line verbatim (it's already good: names the comparative-year mechanic and the principle mapping, which is the differentiator vs. a generic survey writeup). Three links/cards: 2025 edition, 2024 edition, survey explorer, methodology. No new claims needed — this page's job is routing, matching the `/frameworks` index above. |

## State of Production ML 2025 (report page framing)

| | |
| --- | --- |
| CURRENT | No dedicated `/reports/2025` page; only the explorer at `/data/survey-explorer`. Master `state-of-ml-2025.html` (per project CLAUDE.md, not read in full here to conserve tokens — see that file directly) organises the survey into Context, Tools, Scope, Statistics per `institute-crawled-content.md` §11. |
| SOURCE | `institute-crawled-content.md` §11: 2025 survey continues the series; dataset covers ML frameworks, model/workload types, business use cases, time-to-production, cloud providers, production challenges, experiment-tracking, feature platforms, vector databases, orchestration, training platforms, serving tools, monitoring/observability, data storage, generative-AI providers, industry, org size, model/use-case counts, AI/data org structures, deployment patterns, practitioner role/seniority, demographics. Real dataset (`data-2025.csv` in this repo) — audit calls this "a strong evidence asset." |
| PROPOSED | NEW framing page (or a section atop the explorer). Heading: *"State of Production ML 2025."* Intro: *"[N] practitioners on how production ML systems are actually built and run — frameworks, deployment, monitoring, and organisational maturity."* ⚠ **[OWNER: supply real respondent count N — do not carry forward any illustrative figure]**. One paragraph naming the four sections (Context / Tools / Scope / Statistics) and what each covers, then hand off to the interactive explorer for the data itself rather than re-narrating findings in prose (avoids stale-claim risk if the dataset gets re-cut). |

## State of Production ML 2024 (report page framing)

| | |
| --- | --- |
| CURRENT | No dedicated `/reports/2024` page. Master `state-of-ml-2024.html` organised into ML & Scope / Platform & Components / Ecosystem & Maturity / Demographics per project CLAUDE.md and confirmed by `institute-crawled-content.md` §11 ("Production-ML practices, Tools and platforms, Deployment challenges, Organisational maturity, Practitioner demographics"). |
| SOURCE | Same crawl section + `data.csv` in this repo. Real dataset, prior-year baseline for the 2025 comparison mechanic that's the site's actual differentiator. |
| PROPOSED | NEW framing page, same shape as 2025 above but framed explicitly as the comparison baseline: *"The first edition — the baseline the 2025 comparisons are measured against."* Name the four 2024 sections (ML & Scope, Platform & Components, Ecosystem & Maturity, Demographics) — note these labels differ slightly from 2025's (Context/Tools/Scope/Statistics), so don't imply a 1:1 section mapping between years; the explorer's job is aligning comparable questions, not comparable section names. ⚠ Respondent count — **[OWNER: supply]**. |

## Methodology page

| | |
| --- | --- |
| CURRENT | None — no methodology page exists anywhere in `src/pages/` or the master site per the files reviewed. |
| SOURCE | No source content found for survey methodology (sampling, recruitment, response counts, weighting, anonymisation) in `institute-crawled-content.md`, `rfx.html`, or the current `data.csv`/`data-2025.csv` headers. This is a genuine gap, not an under-read source — audit correctly lists this as authored-from-owner-input territory. |
| PROPOSED | NEW page, deliberately minimal until the owner supplies real detail — **do not invent a methodology.** Skeleton only: *"How the survey was run"* with placeholder subheadings (Recruitment, Sample size, Question design, Data handling, Comparability across years) each marked **[OWNER: provide methodology detail — sample size, recruitment channel(s), anonymisation approach, and whether 2024/2025 questions are directly comparable or reweighted]**. This page underpins the credibility of every stat pulled from the surveys elsewhere on the site, so it should not ship with placeholder prose standing in as fact. |
