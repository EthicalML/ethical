PROPOSAL — for owner review

# Research cluster copy sheet — Alignment science · Agentic safety & oversight · Technical assurance & evaluations · ML security

Four pages under `/research/*` (nav-proposal §3, Initiatives → Research). Per `00-content-audit.md` §B these are the hardest cluster: **no standalone research prose exists anywhere in the estate.** Each page below has a real anchor to point to (a principle, a shipped/drafted project, a framework) but no research programme description. This sheet is a scaffold for the owner to fill, not a finished draft — every DRAFT paragraph is deliberately thin and says so where it would otherwise need to invent a research claim.

## Cross-cutting notes
- None of these pages currently exist in any form (not even a stub) — confirmed against `institute-crawled-content.md`, which has zero mentions of "alignment science," "agentic safety," "technical assurance" or "ML security" as page-level concepts (only as CV/positioning language, §1).
- Per `01-voice-and-messaging.md` §5: no frontier-lab capability claims, no solved-problem language. These drafts use "evaluate whether," "test for," "document" — never "solve," "ensure," "guarantee."
- The honest shape of each page, until the owner supplies more: **what the anchor artefact already does** (principle commitment / KAOS / MLSecOps / AI-RFX) + **what a research strand around it would need to claim** (currently blank) + **links out to the concrete work**. Do not let the page read as a lab with a publication list — it should read as a research *area the Institute organises its practical work under*, honestly scoped to what's proven (P09 commitment text, KAOS's early-access controls, MLSecOps's ten-row taxonomy, AI-RFX's criteria) rather than implying a paper trail that doesn't exist.

---

## `/research/alignment-science`

**Purpose:** the research area P09 ("Alignment with intent") sits under — evaluating whether AI systems pursue the objectives their operators and stakeholders actually intend, and studying failure modes (goal misgeneralisation, misuse, deceptive behaviour) when they don't.

**Section skeleton:**
1. What alignment science means here (scope: intent specification, evaluation methodology, not model training)
2. The failure modes we study (goal misgeneralisation · misuse · deceptive/scheming behaviour — from P09)
3. How this connects to KAOS (oversight infrastructure that makes evaluation actionable, not just descriptive)
4. [OWNER INPUT NEEDED] — current work, if any, beyond the P09 principle text

**DRAFT intro:**
> Alignment science, here, is the study of whether an AI system pursues the objective its operators and stakeholders actually intend — not just the objective it was trained against. Our starting position is Principle 09: as systems become more capable and autonomous, evaluating alignment means testing explicitly for goal misgeneralisation, misuse and deceptive behaviour, and documenting residual risk where full assurance isn't yet possible. This is an evaluation and oversight discipline, not a claim to have solved alignment or to train frontier models ourselves.

**Related work:** KAOS (`/open-source/kaos`) — the control-plane primitives (scoped credentials, budget/time limits, human approval gates, audit trail) are what make alignment evaluation enforceable rather than aspirational; Principle 09 (`/principles/09`) — the commitment text this page expands on.

**Owner questions:**
- Is there any alignment-science work beyond the P09 principle text and KAOS's control primitives — internal research notes, a red-teaming methodology, evaluation results — that can be cited, even informally?
- Who, if anyone, is the named lead/author for this area? (Page needs a person or "the Institute" — avoid an anonymous "we study" if there's a real name to attach.)
- Is "alignment science" the right term, or does the owner prefer "alignment research" / "AI alignment" (register check against CV usage)?
- Any planned publications, workshops or partnerships to reference, even as "forthcoming"?

---

## `/research/agentic-safety`

**Purpose:** research area for the safety and oversight of autonomous/agentic AI systems — the direct research framing around KAOS, which is currently presented only as a product, not as a research strand.

**Section skeleton:**
1. Why agentic safety is distinct from model-level alignment (operational constraints: credentials, budgets, time, approval, audit)
2. The oversight primitives we study/build (scoped credentials · sandboxing · budget & time limits · human approval gates · audit trail)
3. Bounded agency as a design principle (agents get only the authority their task requires)
4. [OWNER INPUT NEEDED] — any oversight research, incident analysis or case studies beyond KAOS's own capability list

**DRAFT intro:**
> Agentic safety and oversight is the study of how autonomous systems should be constrained once they can use tools, credentials, budgets and time on their own initiative — not just how they should be trained. Our reference implementation is KAOS, an early-access control plane that treats safety controls as runtime infrastructure: scoped credentials, sandboxed execution, budget and time-horizon limits, human approval gates, and a replayable audit trail. The research question this area is organised around is what a minimal, enforceable set of oversight primitives looks like for agentic systems in production — not a general theory of agent alignment.

**Related work:** KAOS (`/open-source/kaos`) — the primary artefact this research area is built around; Principle 09 (`/principles/09`) — the alignment commitment KAOS operationalises.

**Owner questions:**
- KAOS is listed as "early access" / "9 contributors" (unverified, per `01-voice-and-messaging.md` §5) — is there any deployed or pilot usage that demonstrates oversight in practice, citable here?
- Is there a distinct research contribution beyond the KAOS capability table (e.g. a threat model, an incident taxonomy for agent failures, a methodology for setting budget/time limits)?
- Should this page lead with the product (KAOS) or the research framing — owner preference on emphasis?

---

## `/research/assurance-evaluations`

**Purpose:** research area for technical assurance methodology — how the Institute evaluates AI systems for procurement and deployment readiness (the research framing behind AI-RFX / ML Maturity Model, which currently exist only as procurement/framework artefacts).

**Section skeleton:**
1. What "technical assurance" means (maturity of infrastructure, process and monitoring — not just model accuracy)
2. Assurance as an evaluation discipline (practical benchmarks, domain-specific cost functions, evidence bands)
3. How AI-RFX / ML Maturity Model operationalise this research
4. [OWNER INPUT NEEDED] — any assurance methodology work beyond the existing frameworks

**DRAFT intro:**
> Technical assurance and evaluation is the study of how to determine whether an AI system is fit for a given deployment — not only whether it is accurate, but whether its infrastructure, processes and monitoring are mature enough to support the claim. This area underlies the AI-RFX Procurement Framework and the ML Maturity Model: both translate assurance questions (is this reproducible? is this explainable? is this monitored in production?) into criteria an organisation can actually evaluate a supplier or system against. The Board/NED CV describes this as "technical assurance" work; this page is where that gets a defined scope.

**Related work:** AI-RFX Procurement Framework (`/frameworks/ai-rfx`) — the assessment-criteria artefact; ML Maturity Model (`/frameworks/maturity-model`) — the underlying evaluation model; State of Production ML surveys (`/reports/*`) — the evidence base on how organisations actually run these systems in production.

**Owner questions:**
- "Technical assurance" appears in the CV framing (`institute-crawled-content.md` §1) but with no page-level content — does the owner want this page to primarily restate AI-RFX/MLMM in research language, or is there separate assurance-methodology work to add?
- Is there any evaluation methodology (test suites, benchmark design, evidence-band scoring) beyond what AI-RFX already documents?
- AI-RFX's maturity model is still built on the original eight principles, not the new ninth (per crawled content §5) — should this page flag that gap, or is reconciling it a prerequisite before the page ships?

---

## `/research/ml-security`

**Purpose:** research area recasting the MLSecOps Top 10 as a research strand — the ML-specific security taxonomy, framed as ongoing study rather than a finished checklist.

**Section skeleton:**
1. Why ML systems need a distinct security taxonomy (the OWASP Top 10 doesn't map cleanly onto ML pipelines)
2. The ten vulnerability classes we track (unrestricted endpoints, artifact exploits, supply-chain, IAM/RBAC failures, etc. — full list already exists in MLSecOps)
3. How this connects to Linux Foundation Trusted AI / the ML security committee
4. [OWNER INPUT NEEDED] — any security research beyond the existing ten-row taxonomy

**DRAFT intro:**
> ML security research studies how the standard software-security taxonomy fails to cover machine-learning-specific risk — model artifacts, training pipelines, and inference endpoints all introduce failure modes the OWASP Top 10 wasn't written for. The MLSecOps Top 10 is this Institute's applied answer: ten vulnerability classes mapped from OWASP categories onto the ML lifecycle, from unrestricted model endpoints to supply-chain risk in ML code. This page frames that taxonomy as an active research area — reviewed and extended as new attack surfaces appear — rather than a fixed checklist.

**Related work:** MLSecOps Top 10 (`/frameworks/mlsecops`) — the primary artefact; Principle 08 (`/principles/08`, security and data risk) — the principle commitment this research operationalises; Linux Foundation AI & Data (`/policy/linux-foundation`) — the Trusted AI / ML security committee connection.

**Owner questions:**
- Is the "Institute participated in a Machine Learning Security committee" (Linux Foundation, per crawled content §7) a current or historical role — needed before this page can claim an active committee tie?
- Any incidents, CVEs, or case studies analysed beyond the ten taxonomy rows and the existing "Flawed Machine Learning" case studies referenced in the MLSecOps page?
- Is there appetite to publish updates to the taxonomy periodically (making this genuinely a "research area" rather than a static framework restated), or should the page stay close to the existing MLSecOps content?
