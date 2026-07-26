PROPOSAL — for owner review

# Principles copy sheet — The 9 Responsible AI Principles

Per principle: **CURRENT** (commitment / failure_modes / controls / body as drafted in `src/content/principles/NN.md`) vs **PROPOSED** (rephrased per `01-voice-and-messaging.md`, grounded in the ORIGINAL substance from `master:principles.html`). Commitments are near-verbatim from master and mostly need only voice rettouch; the **body prose is the problem** — principles 03–07 currently carry misaligned placeholder sentences unrelated to their titles (documented below).

## Cross-cutting findings
- **Broken bodies (03–07):** current body text is mismatched — 03 says "Privacy is an operating constraint", 04 "Transparency should help a person…", 05 "Fairness requires evidence…", 06 "Reliability includes knowing when not to answer", 07 "Accountability turns governance…". None match their principle. Master supplies the correct substance for each; PROPOSED below restores it.
- Commitments switched from master's first person ("I commit…") to institutional first-person-plural ("We commit…") — keep the plural, it suits an institute.
- Keep "where/when reasonable" — load-bearing conditional, per voice rules.
- failure_modes/controls chips were agent-drafted; most are sound and map to master + AI-RFX criteria. Proposed keeps good chips, notes weak ones.

---

## P01 — Human augmentation
- **Commitment (current):** "We commit to assess the consequences of incorrect predictions and, when reasonable, design systems with human-in-the-loop review processes." → **KEEP** (faithful to master).
- **Failure modes (current):** Full automation in justice/healthcare/transport · No escalation path · Review in name only → **KEEP** (well-grounded in master's critical-domain examples).
- **Controls (current):** Impact assessment before automation · Partial automation · Manual review during rollout → **KEEP** (matches master's three examples: prison-sentence scrutiny, fraud-detection partial automation, temporary manual review).
- **Body:** current body is on-topic and good. **KEEP+LIGHT EDIT.** Grounded correctly. Optional: reference the master examples (prison sentencing, fraud review, temporary manual review during rollout) in the related-links, which already point there.

## P02 — Bias evaluation
- **Commitment:** "We commit to continuously develop processes that allow us to understand, document and monitor bias in development and production." → **KEEP** (verbatim from master).
- **Failure modes:** Bias in data/features/models/outcomes · Ethics reduced to an optimisation problem · Drift after deployment → **KEEP** (directly reflects master's "don't embed ethics only in the algorithm" argument).
- **Controls:** Data and model assessment · Domain-contextual interpretation · Production monitoring → **KEEP** (maps to AI-RFX "data & model assessment").
- **Body:** current body is on-topic. **KEEP.** Grounded. Could optionally draw in master's equity-vs-equality point (decisions should sit with stakeholders/ethics boards, not technologists alone) — strong, on-voice substance currently unused.

## P03 — Explainability by justification
- **Commitment:** "We commit to develop tools and processes to enhance transparency and explainability of machine learning systems where reasonable." → **KEEP** (faithful).
- **Failure modes:** Opaque pipelines · Explanations no operator can use · Accuracy pursued at any cost → **KEEP** (matches master's "throw data into pipelines without understanding" + accuracy/explainability trade-off).
- **Controls:** Model and feature selection · Domain knowledge in design · Trade-off documentation → **KEEP** (matches master: feature importance/SHAP, domain knowledge to increase explainability, accepting accuracy trade-offs).
- **Body:** ⚠ **BROKEN** — current body reads "Privacy is an operating constraint, not a policy footnote." (belongs to privacy, not explainability). **REWRITE from master:** explainability is about teams understanding how models and pipelines produce results; it can be improved through model/feature selection and injecting domain knowledge (SHAP, feature importance); a reduction in predictive accuracy is sometimes worth the transparency gain; treat it as tools + models + organisational process, not an algorithmic afterthought.

## P04 — Reproducible operations
- **Commitment:** "We commit to develop the infrastructure required to enable a reasonable level of reproducibility across the operations of our ML systems." → **KEEP** (verbatim).
- **Failure modes:** Untracked experiments · Broken lineage · Environment drift → **KEEP** (matches master's "can't diagnose/reproduce" + revert-model/reproduce-input themes).
- **Controls:** Experiment tracking · Data and model lineage · Environment parity → **KEEP** (matches master's abstract-each-step: data, config/environment, computational graph; open standards ONNX/NNEF/PMML).
- **Body:** ⚠ **BROKEN** — current body reads "Transparency should help a person make a better decision." (belongs to explainability). **REWRITE from master:** production ML systems often can't diagnose, revert or reproduce results; reproducibility needs each computational step abstracted — data, environment/config and computational graph — plus experiment tracking and lineage; adopting open model/pipeline standards gives a reasonable, portable level of reproducibility.

## P05 — Displacement strategy
- **Commitment:** "We commit to identify and document relevant information so that business change processes can be developed to mitigate the impact towards workers being automated." → **KEEP** (verbatim).
- **Failure modes:** Silent role removal · No retraining path · Undocumented process change → **KEEP** (reflects master's "impact to individuals forgotten", no transition plan).
- **Controls:** Workforce impact assessment · Business change planning · Process documentation → **KEEP** (matches master's business-change / operational-transformation framing).
- **Body:** ⚠ **BROKEN** — current body reads "Fairness requires evidence across the people a system affects." (belongs to bias). **REWRITE from master:** automating medium-to-large processes has org- and industry-level impact on people; technologists should look beyond the technology and support stakeholders in building a change-management strategy, regardless of whether skilled or unskilled work is automated; raise displacement concerns when transformation plans are set up. (Master's Jevons-paradox aside is optional colour, not core.)

## P06 — Practical accuracy
- **Commitment:** "We commit to develop processes to ensure our accuracy and cost metric functions are aligned to the domain-specific applications." → **KEEP** (verbatim).
- **Failure modes:** Benchmark overfitting · Symmetric error assumptions · Offline-only evaluation → **KEEP** (matches master's "what's correct for a computer may be wrong for a human", asymmetric error costs).
- **Controls:** Practical benchmarks · Cost-weighted metrics · Operational shadow tests → **KEEP** (maps to AI-RFX "practical benchmarks"; master's precision/recall/F1/confusion-matrix toolbox + domain-specific cost functions).
- **Body:** ⚠ **BROKEN** — current body reads "Reliability includes knowing when not to answer." (adjacent but not the principle). **REWRITE from master:** plain accuracy or default cost metrics are not enough — what is "correct" for a model may be wrong in context; break down F1/precision/recall from a domain-specific perspective and choose cost functions that reflect the real consequences of each error type, since in critical settings some errors are far costlier than others.

## P07 — Trust by privacy
- **Commitment:** "We commit to build and communicate processes that protect and handle data of stakeholders interacting with the system directly and indirectly." → **KEEP** (faithful).
- **Failure modes:** Indirect stakeholders overlooked · Retention creep · Unclear consent → **KEEP** (reflects master's direct/indirect stakeholder + metadata exposure themes; "retention creep"/"unclear consent" are reasonable additions).
- **Controls:** Privacy-enforcing infrastructure · Data minimisation · Stakeholder communication → **KEEP** (maps to AI-RFX "privacy-enforcing capabilities/infrastructure"; master's differential-privacy example).
- **Body:** ⚠ **BROKEN** — current body reads "Accountability turns governance from aspiration into responsibility." (belongs to alignment/governance, not privacy). **REWRITE from master:** large data systems affect many direct and indirect stakeholders; trust comes not only from stating what data is held but from the processes around it and communicating why protection matters; enforce privacy by design (e.g. differential privacy) and watch for personal information leaking through metadata (Cambridge Analytica as the cautionary case).

## P08 — Security and data risk
- **Commitment:** "We commit to develop and improve reasonable processes and infrastructure to ensure data and model security are taken into consideration during the development of machine learning systems." → **KEEP** (verbatim).
- **Failure modes:** Unrestricted model endpoints · Artifact exploit injection · Supply-chain vulnerabilities → **KEEP** (directly from the MLSecOps Top 10 taxonomy).
- **Controls:** MLSecOps controls · IAM and RBAC for ML services · Observability and lineage → **KEEP** (maps to MLSecOps rows).
- **Body:** current body is on-topic and good. **KEEP.** Optional: fold in master's human-error point (a large share of breaches are simple human error — misdirected email, lost device — not just adversarial attacks), which usefully broadens "security" beyond adversarial ML and is currently unused.

## P09 — Alignment with intent  *(the refined principle — highest scrutiny)*
- **Commitment (current):** "We commit to evaluate whether systems pursue the objectives intended by operators and stakeholders, and to test for goal misgeneralisation, misuse and deceptive behaviour where reasonable." → **KEEP** (matches master's new P09 verbatim; this is the anchor of the whole rebrand).
- **Failure modes:** Goal misgeneralisation · Deceptive behaviour under evaluation · Misuse of autonomous agents → **KEEP** (maps exactly to master's misgeneralisation / misuse / deceptive-behaviour triad).
- **Controls:** Intent specification · Adversarial and scheming evaluations · Continuous monitoring → **KEEP+REFINE.** Strong. Consider aligning wording to master's stated methods: red-teaming, behavioural evaluations, and meaningful human oversight of high-stakes decisions; "scheming evaluations" is good but confirm the owner is comfortable with the frontier-lab term, else "deception / scheming tests".
- **Body:** current body is on-topic and the strongest of the drafted bodies. **KEEP+REFINE toward master:** as systems become more capable and autonomous (LLMs, agents), accuracy is no longer enough — ask whether the system pursues its operators' and stakeholders' intended objective; misalignment surfaces as goal misgeneralisation (optimising a proxy that diverges outside training), misuse (capable systems repurposed for harm) or deceptive/manipulated behaviour under adversarial pressure; evaluate alignment explicitly via red-teaming, behavioural evaluations and human oversight, and document residual risk where full assurance isn't yet possible. Related links to KAOS / agentic-safety are correct — P09 is what makes KAOS' oversight infrastructure "enforceable rather than aspirational".
