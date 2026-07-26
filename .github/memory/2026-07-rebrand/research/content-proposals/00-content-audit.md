PROPOSAL — for owner review

# Content audit — existing estate vs. new sitemap

Inventory-based, from `institute-crawled-content.md`, the rebranded master, and current `src/` drafts. Verdicts: **KEEP+REPHRASE** (strong substance, rework register per voice framework) · **REWRITE** (substance thin/off-position, keep the topic) · **RETIRE** (drop or archive) · **NEW** (no existing content; must be authored).

## A. Existing pages / sections

| Source content | Where it lives | Quality / reusability | Verdict |
| --- | --- | --- | --- |
| Institutional mission ("advocates for safe & aligned AI", research centre, cross-functional) | homepage, About statement | Strong core; About statement still says "Europe-based think tank / data governance" — legacy | KEEP+REPHRASE (hero); REWRITE (about statement) |
| Four-phase strategy (Principle→Process→Standards→Regulation) | homepage | Clearest strategic IP on the site; verbatim-usable | KEEP+REPHRASE (light) |
| Nine Responsible AI Principles — commitments | master `principles.html` | Canonical substance; P09 already added; all nine have real commitment text | KEEP+REPHRASE — see `11-sheet-principles.md` |
| Principle detail bodies (failure modes / controls / examples) | master `principles.html` (examples), `src/content/principles/*.md` (drafted) | master has rich real examples (prison sentencing, SHAP, Uber diff-privacy, Cambridge Analytica, adversarial patches); **current drafts 03–07 have MISALIGNED placeholder bodies** | REWRITE bodies from master substance |
| AI-RFX Procurement Framework (purpose, 8 criteria, thesis) | master `rfx.html`, `home-reports.json` | Well-developed, real; 8 criteria map to principles | KEEP+REPHRASE |
| ML Maturity Model | master `mlmm`, `home-reports.json` | Real, coherent (core of AI-RFX) | KEEP+REPHRASE |
| MLSecOps Top 10 (OWASP↔ML taxonomy, 10 rows) | master `security.html`, `mlsecops.json` | Real, strong; homepage shows 7 of 10 rows | KEEP+REPHRASE (restore full 10 on framework page) |
| XAI Framework (3-stage: data/model/production; credit-risk case study; ALPHA) | master `xai.html`, `projects.json` | Real; alpha status accurate | KEEP+REPHRASE |
| Ethical AI Network (purpose, membership, "network of aligned humans") | homepage, `network.html`, `network.mdx` | Strong framing; drop BETA | KEEP+REPHRASE |
| Member directory (large, names/roles/orgs) | master `network.html` | Largest raw asset; titles historical/unverified | RETIRE as-is → REWRITE to owner-reviewed subset + sector rollup |
| ML Engineer newsletter (70k+, weekly, themes) | `mle.html`, `network.mdx` | Real audience; 70,412 & issue count need verification | KEEP+REPHRASE (flag numbers) |
| Newsletter archive #1–393+ boilerplate | `/mle/*` | Hundreds of near-duplicate pages; not distinct assets | RETIRE (archive, don't surface) |
| State of Production ML 2024 & 2025 (surveys, dataset) | `state-of-ml-*.html`, `data.csv`, `data-2025.csv` | Real datasets = strong evidence asset; explorer copy illustrative | KEEP+REPHRASE (wire real data) |
| Open-source ecosystem list (production ML, "10k+ stars") | nav, `projects.json` | Real project; star/tool counts need verification | KEEP+REPHRASE (flag numbers) |
| Kompute / cross-vendor GPU | `projects.json`, LF links | Real; metrics (2.1k stars, 38 contrib, 160 releases) unverified | KEEP+REPHRASE (flag numbers) |
| KAOS (K8s Agent OS) | `projects.json`, `kaos.mdx` | NEW project, drafted against design; ties to P09 — strong narrative but claims unverified | KEEP+REPHRASE (verify status/metrics) |
| NeurIPS 2022 & 2023 keynotes; other talks | nav, `talks.json`, newsletter | Real talks; no consolidated media library | KEEP+REPHRASE → new `/talks` |
| Standards portfolio (ISO/IEC, IEEE, ACM, LF, UN, EC) | four-phase phase 3, affiliations.json | Referenced but not surfaced as content; roles unverified | REWRITE → new standards/policy pages |
| Contact / join / RFX-request / subscribe forms | homepage, `contact.mdx`, `network.json` | Consolidated to one form — good | KEEP+REPHRASE |
| Legacy identity variants (IEML, Ethical ML, "& Machine Learning", BETA/ALPHA labels) | footers, initiative pages, newsletter | Naming inconsistency across estate | RETIRE (grep-gate to zero) |
| NumFOCUS collaboration | nav (outbound only) | No hosted copy | REWRITE (short blurb) or RETIRE to link |

## B. NEW pages in target sitemap with NO existing content

From `nav-proposal.md`. These are stubs/drafts or absent — Stage 2 must author from owner input; substance below is what exists to seed them.

| New page(s) | Existing seed content | Gap |
| --- | --- | --- |
| `/research/alignment-science` | P09 body, KAOS narrative | No standalone research prose — author |
| `/research/agentic-safety` (oversight) | KAOS capabilities, P09 | Needs research framing beyond the product |
| `/research/assurance-evaluations` | AI-RFX/MLMM, "technical assurance" (CV) | No dedicated copy |
| `/research/ml-security` | MLSecOps Top 10 | Recast security framework as research strand |
| `/standards/iso-iec`, `/standards/ieee` | affiliations.json roles; four-phase P3 | Roles unverified; no page copy |
| `/policy/acm`, `/policy/linux-foundation`, `/policy/un-cstd`, `/policy/european-commission` | CV mentions (AI Act, Data Act, UN AI governance); four-phase P4 | "Little detailed standalone regulatory content" (inventory §18) — author from CV, owner-verified |
| `/about`, `/about/team`, `/about/advisory`, `/about/annual-review` | `about.mdx` (drafted, on-position), Board/NED CV | Team/advisory/annual-review absent |
| `/fellowships` | none | Fully NEW — no source material |
| `/events` | roundtables/workshops mentioned in newsletter | No structured events content |
| `/partners` | affiliations, network orgs | No partner-program copy |
| `/press` | none | Fully NEW |
| `/frameworks/ai-rfx`, `/maturity-model`, `/mlsecops` | master rfx/mlmm/security | Substance exists; needs per-page rephrase |
| `/reports/*`, `/data/survey-explorer`, `/methodology` | 2024/2025 datasets | Explorer copy + methodology to write |

## C. Priority findings for sequencing

1. **Principle bodies 03–07 are broken** (misaligned placeholder sentences) — highest-value fix, and master supplies the real substance. Do first.
2. **Whole clusters are stubs** — research/*, standards/*, policy/*, fellowships, events, partners, press have little/no source; they depend on owner input (CV material), not rephrasing.
3. **Numbers and affiliation roles are the pervasive risk** — every stat and every institutional title needs owner verification before ship; grep-gate placeholders to zero at cutover.
