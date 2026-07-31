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

---
# v3 — Comprehensive page specifications (research-grounded), for owner review

Supersedes v2 (in git history). Every fact below is sourced from five research passes run 2026-07-31: source clones of kaos (main, 0.7.1-dev), KomputeProject/kompute, EthicalML/xai, both awesome lists (full reports in `tmp2/report-oss-kaos.md` and `tmp2/report-oss-others.md`), plus live docs crawls. Quotes are verbatim from the repos/docs. `[WIDGET: ...]` describes the bespoke component at that point; `[OWNER: ...]` marks a decision or confirmation.

## Corrections v3 makes to claims currently on the site or in v2

| Current claim | Reality (sourced) |
| --- | --- |
| KAOS as "bounded agency" control plane with budgets/approval gates | KAOS is an agent orchestration system: five CRDs (Agent, ModelAPI, MCPServer, MemoryStore, AccessGrant), operator, CLI, UI, PAIS runtime. Its real governance surface is the v0.7.0 security plane (gateway authz, fail-closed OPA, AccessGrant) and scoped memory, not budget/approval primitives. |
| KAOS metrics 1.8k stars / 42 contributors / 160+ releases | 268 stars, v0.7.0 (31 Jul), Apache-2.0, K8s ≥1.28 (matches repos-metrics.yaml). |
| Production ML list "curated weekly", 7 categories with counts 48/37/... | 24 categories, ~551 entries (counted from README master); updates are monthly release summaries; the weekly thing is the newsletter (70k+ subscribers). |
| XAI "three steps" framing only | Confirmed ("the 3-steps of explainable machine learning"), but the README says built on "the 8 principles for Responsible Machine Learning" — legacy count. [OWNER: update the XAI README to nine principles, or keep site copy principle-count-neutral (v3 does the latter).] |
| Kompute "AMD, Intel, Nvidia, mobile GPUs" | README says "AMD, Qualcomm, NVIDIA & friends"; no Apple/MoltenVK/Intel claim exists in README or docs. v3 uses their vendor list. |
| KAOS quickstart YAML manifests from README | Source audit found the README/docs example manifests stale against the current API (removed fields, missing `spec.model`). The CLI command path is the one to show. [OWNER: worth fixing upstream in the kaos README too.] |

## v3 /open-source (index) — "Project portal", not a card grid

Addressing the owner comment: no reuse of the homepage showcase grid, and no four-projects paragraph. The index becomes a portal of full-width project panels with a persistent rail.

[WIDGET: `ProjectPortal` — a scroll-driven vertical stack of four full-bleed panels, one per project, with a thin sticky rail on the left listing the four names (active one highlighted as the user scrolls, click jumps). Each panel is a consistent composition: status pill row (e.g. `v0.7.0 · APACHE-2.0 · K8S ≥1.28`), project wordmark-sized title, one-line subtitle, a live visual filling the panel's right/backdrop, and a single "Enter →" link to the detail page. The live visual is each project's own canvas or media, not a shared placeholder: KAOS = the kaos-graph canvas; Kompute = the KomputeCube canvas; XAI = a static imbalance-plot motif; Production ML list = an animated category constellation (see list page). Panels use the site's reveal/settle motion; the rail is the only new chrome. Reduced motion: panels render stacked and static. This is a new layout component, not `OpenSourceShowcase`; it expects exactly (pills, title, subtitle, visual, href) per project, which matches the owner's "header, subtitle, pill, image rendered in a nice way" framing.]

> **Eyebrow:** OPEN SOURCE / BUILT IN PUBLIC
> **Title:** Open-source software and tools
> **Intro:** Openly licensed software for agent orchestration, GPU compute, explainability and production ML. Built in public, governed in the open, used in production.

Panel subtitles (the only copy per panel):
> **KAOS** — Deploy, manage and orchestrate AI agents on Kubernetes. `v0.7.0 · APACHE-2.0 · K8S ≥1.28`
> **Kompute** — The general-purpose GPU compute framework for cross-vendor graphics cards, hosted by LF AI & Data. `LINUX FOUNDATION · APACHE-2.0 · 2.5K STARS`
> **XAI** — An explainability toolbox for machine learning, across data, model and production. `ALPHA · MIT · 1.3K STARS`
> **Awesome Production ML** — The community catalogue of production ML tooling: 24 categories, 550+ libraries. `COMMUNITY · 20.8K STARS`

CTA at the portal's end: existing CenteredCTA ("Contribute to the open-source projects.").

## v3 /open-source/kaos — flagship page

> **Eyebrow:** OPEN SOURCE · V0.7.0 · APACHE-2.0
> **Title:** K8s Agent OS (KAOS)
> **Intro:** Deploy, manage and orchestrate AI agents on Kubernetes. KAOS turns agents, models, tools and memory into declarative Kubernetes resources, reconciled by an operator, secured at the gateway and observable end to end. "Managing the chaos in your agentic systems."

[WIDGET: keep the KAOS hero canvas (bare backdrop). The banner tagline above is from the project's own title card.]

### From zero to a running agent

> An agent is a resource, not a script. Install the system, deploy a model API and an agent, and talk to it; every agent exposes an OpenAI-compatible `/v1/chat/completions` endpoint, so existing clients work unchanged.

[WIDGET: `QuickstartTerminal` — animated terminal in the site typewriter idiom, playing the real CLI sequence with realistic pauses and output lines, replay button, static code block under reduced motion:
`pip install kaos-cli` → `kaos system install` → `kaos modelapi deploy my-api --mode Hosted --model "smollm2:135m"` → `kaos agent deploy my-agent --modelapi my-api --model "smollm2:135m"` → `kaos agent invoke my-agent --message "Hello"` → `kaos ui`.
A secondary tab shows the Helm path (`helm repo add kaos https://axsaucedo.github.io/kaos/charts` → `helm install kaos kaos/kaos-operator -n kaos-system --create-namespace` → `kubectl apply -f my-agent.yaml`). Commands verified against the current CLI; the stale README YAML manifests are NOT reproduced.]

### The control plane

> Five custom resources define an agent system: **Agent** (the running agent, its model, tools, peers and memory binding), **ModelAPI** (LLM access, proxied via LiteLLM or hosted in-cluster with Ollama), **MCPServer** (tool servers speaking the Model Context Protocol), **MemoryStore** (the central memory service agents bind to) and **AccessGrant** (who may reach what). Four controllers reconcile them into pods, services and policy.

[WIDGET: `ControlPlaneMap` — a bespoke interactive canvas: the five CRDs as typed nodes around an operator hub, with the reconciled runtime (agent pods, gateway, memory service) as a second ring. Selecting a node slides a side panel with the CRD's one-line definition and two or three key spec fields (from the source audit). A delegation pulse traces Agent → MCPServer and Agent → Agent (A2A) paths on demand, user-triggered, never auto-rotating. This is the evolution of kaos-graph into a real architecture explorer; reduced motion gets the static graph with the panel interaction intact.]

> Agents delegate through the A2A protocol: discovery via `/.well-known/agent.json`, sub-agents exposed to the model as tools, and "hierarchical agent systems with automatic delegation".

### Memory that survives the session

> "Memory is augmentation, not a hard dependency." A MemoryStore runs one central memory service per store, with Mem0 embedded as a library rather than a separate server. Short-term memory keeps the recent conversation window in relational rows; an optional rolling summary preserves narrative continuity; long-term memory holds semantic facts in a vector store, recalled by relevance across sessions.

> Scopes make memory multi-tenant: reads select session, agent, user or store scope, and "scope is derived server-side from the authenticated agent identity", never from model arguments. When a store fails, the agent keeps serving short-term-only and surfaces a `MemoryDegraded` condition instead of going down.

[WIDGET: `MemoryTiers` — a three-band diagram (short-term rows / rolling digest / long-term vector recall) with an animated event flowing through: a user message lands in the short-term band, the digest band absorbs it into the summary, and a fact crystallises into the long-term band. A scope selector (session / agent / user / store) dims the bands a read at that scope may touch. Static bands with the scope selector under reduced motion. Data and labels straight from the docs' own tier table.]

Storage fact row (static): `LOCAL: Chroma + SQLite on one volume · EXTERNAL: pgvector + Postgres, 2 replicas` 

### Secured at the gateway

> Security is off until you turn it on, and fail-closed once you do: protected routes pass Envoy Gateway, which verifies JWTs and consults an OPA policy decision point; "an unavailable PDP never permits a request". Identity is two-plane: the subject (a Keycloak user, or the agent itself when autonomous) and the acting agent, verified on every hop. Agent identity comes from per-agent ServiceAccounts with short-lived projected tokens, an identity broker, or per-agent OAuth clients registered dynamically.

> Authorization is declarative: `AccessGrant` resources bind users, groups and agents to the resources they may enter, and the operator projects them into policy. Memory enforces the same identities, so one user's recall can never serve another's session.

[WIDGET: `RequestPath` — a horizontal flow: client → Envoy Gateway (JWT check) → OPA PDP (allow/deny stamp) → Agent → onward hop with both tokens shown as small labelled chips (subject / actor). A toggle switches the scenario: user request, autonomous agent, denied request (red 403 path). Step-through on click, not timed. Static diagram under reduced motion.]

### Watch it work

[WIDGET: `MediaBand` — the two real docs GIFs, self-hosted copies: `demo.gif` (the dashboard workflow) and `demo-monitoring.gif` (the observability view with traces and flamegraphs). Lazy-loaded, poster first frames, captions linking to the docs. The UI screenshot set (agent chat, memory inspector, MCP tool debugger) exists if we prefer stills to GIFs on mobile. [OWNER: confirm self-hosting copies of these assets.]]

> The dashboard covers the operational loop: monitor agents, chat with them live, inspect memory sessions and events, debug MCP tools with real calls, and stream pod logs. Agents ship OpenTelemetry instrumentation, so traces land in your existing observability stack.

### Metrics + CTAs

Metrics row (repos-metrics.yaml): `268 STARS · V0.7.0 · APACHE-2.0 · K8S ≥1.28`
CTAs: "Explore the project →" github.com/axsaucedo/kaos · "Read the docs →" axsaucedo.github.io/kaos [OWNER: confirm repo stays under axsaucedo at cutover.]

## v3 /open-source/kompute

> **Eyebrow:** OPEN SOURCE · LINUX FOUNDATION · APACHE-2.0
> **Title:** Kompute
> **Intro:** "The general purpose GPU compute framework for cross vendor graphics cards (AMD, Qualcomm, NVIDIA & friends). Blazing fast, mobile-enabled, asynchronous, and optimized for advanced GPU acceleration usecases." Donated by the Institute and "backed by the Linux Foundation as a hosted project by the LF AI & Data Foundation."

[WIDGET: KomputeCube canvas as the hero backdrop (existing shared canvas, bare full-bleed variant).]

### The mental model

> Four concepts carry the whole framework: a **Manager** owns the device, **Tensors** own data, an **Algorithm** wraps the shader logic, and a **Sequence** records operations to submit as a batch. Everything else is Vulkan doing what Vulkan does, without the boilerplate.

[WIDGET: `SequencePipeline` — an animated strip showing a sequence being recorded then dispatched: tensor chips load, an OpSyncDevice pulse moves them to the device band, OpAlgoDispatch fires the shader block, results sync back. Mirrors the real API call order from the README example. One pass on scroll-into-view, replayable; static diagram (the project's own kompute-architecture.jpg as fallback imagery) under reduced motion.]

### Two languages, one API

[WIDGET: `CodeTabs` — tabbed Python / C++ block with the verbatim README examples (the mgr/tensor/algorithm/sequence flow with push constants), syntax highlighted, copy button. Static.]

> The Python module covers experimentation; the C++ SDK goes as deep as the optimisation requires. Asynchronous and parallel execution comes through GPU family queues, and the BYOV design ("bring-your-own-Vulkan") plugs into existing Vulkan applications.

### Proven where it counts

> Kompute backs on-device LLM inference in **GPT4ALL**, appeared as a backend in **llama.cpp**, and powers **vkJAX**, the JAX interpreter for Vulkan. It runs on Android via the NDK, on Raspberry Pi through Mesa, and in the Godot engine for game development. [OWNER: llama.cpp's README labels its Kompute backend "now decomissioned"; phrasing here says "appeared", confirm you're happy naming it.]

Fact strip: `90% UNIT TEST COVERAGE · MONTHLY COMMUNITY CALLS · FOSDEM TALKS · C++ AND PYTHON`

Metrics row: `2.5K GITHUB STARS · 42 CONTRIBUTORS · 197 FORKS`
CTAs: "View on GitHub →" github.com/KomputeProject/kompute · "kompute.cc →"

## v3 /open-source/xai

> **Eyebrow:** OPEN SOURCE · ALPHA · MIT
> **Title:** XAI — an eXplainability toolbox for machine learning
> **Intro:** "XAI is a Machine Learning library that is designed with AI explainability in its core." It implements the three steps of explainable machine learning: data analysis, model evaluation and production monitoring, tools and process together.

### The toolbox, by stage

[WIDGET: `StageExplorer` — three-stage selector in the principles-explorer interaction family but purpose-built for an API: selecting a stage shows its real functions as rows, each row expanding to a one-line purpose and a thumbnail of the actual README plot. Data below is the verified public API:]

> **01 — Data analysis.** `imbalance_plot` (class imbalances across one or more columns) · `balance` (up/down-sampling to correct them) · `correlations` (matrix or dendogram) · `group_by_columns` · `balanced_train_test_split` (splits balanced across protected attributes).
> **02 — Model evaluation.** `feature_importance` (permutation-based) · `metrics_plot` (metric imbalances overall and across protected columns) · `roc_plot` (ROC per group, e.g. gender, ethnicity, age) · `confusion_matrix_plot`.
> **03 — Production monitoring.** `smile_imbalance` (accuracy and statistical metrics bucketed by prediction probability) with explicit support to "visualise benefits of adding manual review on probability thresholds".

> The library ships with a census dataset for experimentation (`xai.data.load_census()`), and installs from PyPI. The protected-attribute lens runs through every stage: the same gender or ethnicity split that shapes the train/test split reappears in the metric and ROC comparisons.

[WIDGET: `ImbalanceDemo` (optional): a live rendering of the library's signature plot, class-imbalance bars across a protected column with an "apply balancing" toggle animating to the corrected distribution, data precomputed from the bundled census dataset so the chart is real, not invented. Cut if it reads as decoration.]

### Talk and worked example

> The approach was presented at PyData London, covering how to identify and mitigate undesired bias with the toolbox. [WIDGET: video card with the talk thumbnail from the README, linking out. [OWNER: confirm the PyData 2019 talk is the video you want surfaced; the legacy site's credit-risk video reference appears to be this talk.]]

Metrics row: `1.3K STARS · MIT · ALPHA — ACTIVE`
CTA: "Open the framework →" github.com/EthicalML/xai · "Read the docs →" ethicalml.github.io/xai

## v3 /open-source/production-ml-list

> **Eyebrow:** OPEN SOURCE · COMMUNITY · 20.8K STARS
> **Title:** Awesome Production Machine Learning
> **Intro:** "A curated list of awesome open source libraries to deploy, monitor, version and scale your machine learning." More than 550 libraries across 24 categories, with a summary of new additions released every month.

### Explore the categories

[WIDGET: `CategoryAtlas` — the page's centrepiece: all 24 real categories as a packed, animated field sized by entry count (Evaluation & Monitoring 68 · Deployment & Serving 60 · Computation Optimisation 58 · Industry NLP 45 · Reinforcement Learning 39 · Training & Orchestration 27 · and the rest), each tile carrying the README's own emoji and count. Hover/tap lifts a tile and shows its description; clicking goes to the section anchor on GitHub. Counts are generated at build time by parsing the README (small script, refreshed each deploy), so the numbers stay honest without manual upkeep. Reduced motion: a static two-column table of category, count. [OWNER: confirm build-time README parsing; the alternative is names without counts.]]

### How it stays current

> New libraries are added continuously and summarised in monthly releases, so watching the repository doubles as an ecosystem changelog. The weekly companion is the Machine Learning Engineer newsletter, where "over 70,000 ML professionals and enthusiasts" receive curated production ML articles and tutorials.

[WIDGET: `StarHistory` — a single static SVG line of the star history (the README embeds the star-history chart; we render our own from a build-time snapshot rather than hotlinking). Optional; cut if the page feels busy.]

Metrics row: `20.8K STARS · 550+ LIBRARIES · 24 CATEGORIES` (all build-time derived or repos-metrics.yaml)
CTA: "Browse the ecosystem on GitHub →" github.com/EthicalML/awesome-production-machine-learning

## v3 /open-source/ai-guidelines

> **Eyebrow:** OPEN SOURCE · POLICY
> **Title:** Awesome AI Regulation, Principles & Guidelines
> **Intro:** A repository "mapping the ecosystem of guidelines, principles, codes of ethics, standards and regulation being put in place around artificial intelligence", from national law to practical checklists.

### Two ways in

> By geography: national regulation and policy across fifteen economic areas, from the EU AI Act ("the first regulation implemented on AI") to national strategies across the Americas, Asia and the Middle East. By theme: high-level frameworks and principles, industry standards initiatives, practical tools and checklists, courses, and research newsletters.

[WIDGET: `RegulationGrid` — a compact grid of the fifteen economic areas (flag + name), each linking to its section anchor on GitHub, with the six thematic sections as a second row of pills. Static component with hover states only; this page stays light deliberately, the catalogue is the content. Generated from the README structure at build time alongside the CategoryAtlas parser.]

> The Institute's own nine principles sit in the same ecosystem this list maps, which is why the repository is where our policy work and the wider landscape meet.

Metrics row: `1.4K STARS · 15 ECONOMIC AREAS · MIT`
CTA: "Browse AI guidelines →" github.com/EthicalML/awesome-artificial-intelligence-regulation

## Build inventory (bespoke components, no reuse-for-reuse's-sake)

| Component | Page | What it shows | Interaction | Reduced motion |
| --- | --- | --- | --- | --- |
| ProjectPortal | index | four full-bleed project panels + sticky rail | scroll-driven rail highlight, jump links | stacked static panels |
| QuickstartTerminal | kaos | real CLI quickstart, Helm tab | autoplay once, replay, tab switch | static code block |
| ControlPlaneMap | kaos | five CRDs + operator + runtime ring | node select → spec panel, on-demand delegation pulse | static graph, panels intact |
| MemoryTiers | kaos | three memory bands + scope selector | event flow animation, scope dimming | static bands + selector |
| RequestPath | kaos | gateway → PDP → agent token flow | scenario toggle, click step-through | static diagram |
| MediaBand | kaos | demo.gif, demo-monitoring.gif | lazy, poster frames | posters only |
| SequencePipeline | kompute | record → dispatch → sync flow | one pass on view, replay | architecture still |
| CodeTabs | kompute | verbatim Python/C++ examples | tabs, copy | n/a |
| StageExplorer | xai | 3 stages → real API rows → plot thumbnails | stage select, row expand | all stages stacked |
| ImbalanceDemo (optional) | xai | real census imbalance plot + balance toggle | toggle | final state |
| CategoryAtlas | production-ml-list | 24 categories sized by real counts | hover lift, click-out | two-column table |
| StarHistory (optional) | production-ml-list | star growth line | none | static |
| RegulationGrid | ai-guidelines | 15 areas + 6 themes | hover, click-out | static |

Shared modules only where two consumers exist: the terminal reuses the typewriter core; ControlPlaneMap and the index's kaos panel share the kaos-graph canvas engine; the README-parser build script feeds both CategoryAtlas and RegulationGrid. Everything else is a colocated custom element per the client-architecture order. No islands: nothing here changes rendered structure from state.

## Open owner decisions (collected)

1. Index portal: approve the ProjectPortal direction (full-bleed panels + rail) before any build.
2. KAOS: self-hosting the docs GIFs/screenshots; repo location at cutover; whether to fix the stale README manifests upstream.
3. XAI: update the repo README's "8 principles" to nine, or keep site copy count-neutral; confirm the PyData talk as the surfaced video.
4. Kompute: naming llama.cpp given the "decomissioned" backend note.
5. Production ML list: approve build-time README parsing for live counts (recommended) vs static names.
6. Sequencing: KAOS page first (release momentum), then index portal, then the three remaining pages.
