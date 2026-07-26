PROPOSAL — for owner review

# Open source copy sheet — /open-source index + kaos + kompute + xai + production-ml-list + ai-guidelines

Per section: **CURRENT** (what exists today — prototype MDX/JSON, or "none" for unbuilt pages) · **SOURCE** (origin / placeholder status) · **PROPOSED** (rephrased final per `01-voice-and-messaging.md`). ⚠ = unverified number — do not ship without owner confirmation. GitHub figures below were looked up live (see footnote) but are model-summarised API reads, not a guaranteed-exact copy/paste — owner must confirm before ship regardless.

## /open-source (index)

| | |
| --- | --- |
| CURRENT | `src/pages/open-source/index.mdx`: eyebrow "OPEN SOURCE / BUILT IN PUBLIC", title "Tools that make assurance tangible", intro "Working software for explainability, safe agents, GPU compute and production ML." Renders `<OpenSourceShowcase compact />` (same card data as homepage §03) then a CTA "Build the commons with us." |
| SOURCE | Prototype MDX + `src/data/projects.json`. On-voice already — "assurance tangible" matches the verbs-of-assurance rule. |
| PROPOSED | Keep hero and structure verbatim. Add one short paragraph under the intro naming the four projects and their status, so the index reads as a page in its own right and not just a repeat of the homepage card grid: *"Four projects, each open source and maintained by the Ethical AI Network: KAOS (agent oversight, early access), Kompute (cross-vendor GPU compute), the XAI Framework (explainability and bias evaluation, alpha) and the production-ML open-source list (community-maintained catalogue)."* CTA copy unchanged. |

## /open-source/kaos

| | |
| --- | --- |
| CURRENT | `src/pages/open-source/kaos.mdx`: description "KAOS is a control plane for autonomous agents that need to use tools, credentials, budgets, and time without escaping accountable human boundaries." Sections: Feature ("Bounded agency by design", widget kaos-graph), Capabilities (`<CapabilityTable />`), `<Metrics stars="1.8k" contributors="42" releases="160+" />`, closing section "Build with bounded autonomy", CTA to `github.com/ethicalml`. |
| SOURCE | Drafted against design, no legacy page (KAOS is a NEW project per audit). `institute-crawled-content.md` has no KAOS section — this is authored copy tying to Principle 9. Homepage `projects.json` kaos block instead says "EARLY ACCESS · 9 CONTRIBUTORS · APACHE-2.0 · K8S 1.29+" — **the metrics on this page (1.8k stars / 42 contributors / 160+ releases) contradict the homepage's "early access / 9 contributors" and are inconsistent with each other across the site.** |
| PROPOSED | Keep all prose (hero line, Feature block, "Build with bounded autonomy" closing, CTA) — it is strong, on-voice, and correctly hedged ("Each agent receives only the authority required for its task" / "represent explicit control points," not "guarantee safety"). **Fix the metrics conflict:** use the homepage's own figures (early access, 9 contributors ⚠, Apache-2.0, K8s 1.29+) consistently here rather than the page's separate 1.8k/42/160+ set — a fabricated star count on an "early access" project is the kind of contradiction the voice framework's "no unverified numbers" rule exists to catch. ⚠ A live GitHub org listing for EthicalML found no public "kaos" or "agent" repo under that org (see footnote) — **[OWNER: confirm the actual repo location/visibility before this page ships an "Explore the project" link, and confirm whether "9 contributors" is current].** Capability table content (scoped credentials, sandboxed execution, budget limits, time horizon, human approval, audit trail) is real design substance from `projects.json` — keep as-is. |

## /open-source/kompute

| | |
| --- | --- |
| CURRENT | None — no dedicated page exists yet (only a homepage card in `OpenSourceShowcase`, sourced from `projects.json.kompute`: "Cross-vendor GPU computing", "Kompute and the cross-vendor acceleration work: portable GPU compute that is not locked to a single hardware vendor, maintained in the open alongside Linux Foundation AI & Data and NumFOCUS", metrics 2.1k stars ⚠ / 38 contributors ⚠ / 160+ releases ⚠ / Apache-2.0). |
| SOURCE | `projects.json`; `institute-crawled-content.md` §14 confirms Kompute as a real, ongoing GPU-computing project referenced across the newsletter archive, tied to Linux Foundation AI & Data activity — substance is real, card metrics are prototype placeholders. Live GitHub lookup (see footnote) for `EthicalML/vulkan-kompute`: 2,543 ⭐ / 197 forks / 77 open issues / Apache-2.0 license. |
| PROPOSED | NEW page, structured like `kaos.mdx` (Feature block, capability/metrics row, CTA). Hero: *"Kompute — cross-vendor GPU compute"* / intro: *"A general-purpose GPU compute framework built on Vulkan, so acceleration work isn't locked to a single hardware vendor — maintained in the open with Linux Foundation AI & Data."* Feature section: explain the portability angle (works across AMD, Intel, Nvidia, mobile GPUs via Vulkan) without overclaiming performance parity. Metrics row: **replace the 2.1k/38/160+ prototype figures with the looked-up 2,543 stars / 197 forks — mark ⚠ [OWNER: confirm against live repo before ship, do not carry the fabricated 38-contributor / 160-release figures forward, they don't correspond to any source found].** CTA: link to `github.com/EthicalML/vulkan-kompute`, label "View on GitHub →". |

## /open-source/xai

| | |
| --- | --- |
| CURRENT | None as an Astro page — substance lives in master `xai.html` and homepage `projects.json.xai` card (badge ALPHA; three stages Data analysis / Model evaluation / Production monitoring; stats "1.4k STARS ⚠ · 21 CONTRIBUTORS ⚠ · ALPHA — ACTIVE"). |
| SOURCE | `xai.html` (master, full text read): hero "An interpretability and transparency framework for safer AI"; body "We see the challenge of explainability as more than just an algorithmic challenge. The XAI Framework is designed to empower you to introduce explainability and perform bias evaluation through three steps: 1) data analysis, 2) model evaluation, and 3) production monitoring"; a credit-risk/loan-approval case study with a linked technical video; "fully open source... currently in ALPHA stage." Live GitHub lookup for `EthicalML/XAI`: 1,255 ⭐ / 185 forks / MIT license. |
| PROPOSED | NEW page, same template family as `kaos.mdx`/`kompute`. Hero: *"XAI — the explainability framework"* / intro (rework "empower" per voice rule → verbs of assurance): *"Explainability and bias evaluation across three stages — data, model and production — combining technical tools with the process around them. XAI treats explainability as more than an algorithmic problem."* Feature/stage block: keep the three stages verbatim (Data analysis → distributions, proxies; Model evaluation → attribution, subgroups; Production monitoring → drift, outliers) — this is real, well-formed IP already used on the homepage card. Case study: *"A worked example applies the framework to a credit-risk / loan-approval model, showing how bias is surfaced and mitigated at each stage."* (Keep case study as a named example, not a general claim — do not imply every model gets this treatment.) Status: **ALPHA — keep, it is literally true** per the voice framework's "ship status only where true" rule. Metrics: replace 1.4k/21 with the looked-up 1,255 stars / 185 forks — ⚠ [OWNER: confirm]. CTA: link to `github.com/EthicalML/XAI`, "Watch the case study →" only if the linked video is still live/appropriate to surface — **[OWNER: confirm the credit-risk video is current before linking]**. |

## /open-source/production-ml-list

| | |
| --- | --- |
| CURRENT | None as a page — homepage `projects.json.ecosystem` card only: title "Production ML open-source list", text "The community-maintained catalogue of production ML and MLOps tooling, curated weekly", 7 category rows (Serving & inference 48, Orchestration & pipelines 37, Monitoring & observability 31, Feature & vector stores 24, Explainability & fairness 22, ML security 17, GPU & acceleration 15), stats "10.2k STARS ⚠ · 230+ CONTRIBUTORS ⚠ · 260 TOOLS TRACKED ⚠". |
| SOURCE | `projects.json`; `institute-crawled-content.md` §12 confirms this is real — a long-running, community-maintained GitHub catalogue that "had surpassed 10,000 GitHub stars at the time of the archived content" (i.e. real project, stale snapshot number). Live GitHub lookup for `EthicalML/awesome-production-machine-learning`: 20,800 ⭐ / 2,591 forks / MIT license — materially higher than the 10.2k prototype figure, consistent with "the archive is stale, not fabricated." |
| PROPOSED | NEW page. Hero: *"Production ML open-source list"* / intro: *"A community-maintained catalogue of production ML and MLOps tooling, organised by category and curated by the Ethical AI Network."* Keep the category-row structure (it's a real, useful navigation aid) but **the per-category counts (48/37/31/24/22/17/15) have no confirmed source — [OWNER: confirm current counts per category or drop the numeric column and keep category names as a browsable list].** Replace the "10.2k stars / 230+ contributors / 260 tools" stat row with the looked-up 20,800 stars / 2,591 forks — ⚠ [OWNER: confirm]; drop "230+ contributors" and "260 tools" entirely unless the owner can supply a current count, rather than reusing the stale archived figure. CTA: "Browse the ecosystem →" to `github.com/EthicalML/awesome-production-machine-learning`. |

## /open-source/ai-guidelines

| | |
| --- | --- |
| CURRENT | None. Referenced only as a footer link in the nav proposal's Open Source panel ("Awesome AI Guidelines") and in `projects.json.kompute.tags`; substance otherwise scattered across newsletter issues. |
| SOURCE | `institute-crawled-content.md` §13 "Policy, principles and guidelines ecosystem": *"Several newsletter pages promote an open-source initiative to map AI policy, ethical guidelines and responsible-AI frameworks... the purpose is to make a fragmented ecosystem easier to navigate,"* referencing research evaluating ethics guidelines, a "From What to How" review of tools/methods/research for translating principles into practice, and broader AI-ethics-guideline collections. The crawl notes this "appears primarily inside newsletter issues and linked GitHub resources rather than as a fully developed current website section" — thin source, REWRITE per audit. |
| PROPOSED | NEW page, kept short given thin substance (do not pad). Hero: *"Awesome AI guidelines"* / intro: *"A curated, open-source map of AI policy positions, ethics guidelines and responsible-AI frameworks published by governments, standards bodies and industry — built to make a fragmented landscape easier to navigate."* One short section explaining the two things it collects: (1) guideline/principle catalogues from other organisations, for comparison against the Institute's own nine principles; (2) research reviewing how such guidelines translate into practice (name-check "From What to How" only if the owner confirms it's still the referenced source — **[OWNER: confirm the specific guideline-review resources still cited]**). CTA to the GitHub repo — **[OWNER: confirm the current repo name/URL for this catalogue; none of the four confirmed EthicalML repos found in the live org listing (see footnote) match "guidelines"]**. |

## Footnote — live GitHub lookups used above

Fetched via GitHub REST API on the date of this sheet, then summarised by a small model (not a raw copy) — treat as directionally accurate, owner should re-confirm exact figures before ship:

- `EthicalML/vulkan-kompute` — 2,543 stars, 197 forks, 77 open issues, Apache-2.0.
- `EthicalML/awesome-production-machine-learning` — 20,800 stars, 2,591 forks, MIT.
- `EthicalML/XAI` — 1,255 stars, 185 forks, MIT.
- `EthicalML/fml-security` (MLSecOps Top 10 code, referenced in `13-sheet-frameworks-reports.md`) — 125 stars, 23 forks, no license file found.
- `axsaucedo/kaos` — API lookup returned 268 stars / 18 forks / Apache-2.0, but a full listing of the `EthicalML` org's repos (17 repos enumerated) found **no** repo with "kaos" or "agent" in the name — the KAOS project referenced across the prototype does not obviously correspond to a public repo under either account. **[OWNER: confirm KAOS's actual repo location before publishing any GitHub links or contributor/star counts for it.]**
