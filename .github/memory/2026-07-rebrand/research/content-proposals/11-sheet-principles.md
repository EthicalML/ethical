PROPOSAL — for owner review (v2, frontier revision)

# Principles copy sheet — The 9 Responsible AI Principles

This version replaces the earlier annotation sheet with the actual proposed content, per principle: a field table (title, description, commitment, failure modes, controls, related links) followed by the body prose, mapping 1:1 to the frontmatter and body of `src/content/principles/NN.md`. Edit in place.

## Cross-cutting decisions (ratified in review)

- **Persona:** the principles address teams that build systems with AI models: deployers, integrators and fine-tuners. Each entry stays readable by model builders; where the builder obligation differs, the entry states it.
- "machine learning systems" wording replaced with "AI systems" throughout, including commitments.
- `description` no longer duplicates the commitment.
- Monitoring lives in 06 (evaluation continued in production); auditability lives in 04 (renamed Reproducibility & Provenance). No tenth principle.
- Boundary between 02 and 09 written into both bodies: 02 asks who carries the errors, 09 asks what the system is pursuing.
- No em-dashes anywhere.

## Proposed index intro (persona statement, for /principles)

> These principles are written for the teams that put AI systems into the world: deployers, integrators and fine-tuners. Each principle names a failure domain, the commitment that addresses it and the controls that implement it. Where the obligation differs for organisations that train models, the principle says so.

---

## P01 — Human Augmentation by Oversight

| Field | Content |
| :---- | :---- |
| Title | Human Augmentation by Oversight |
| Tagline | Irrespective of how many levels of abstractions are introduced through AI systems, the impact is and will always continue to be human.  |
| Commitment | We commit to assess the consequences of incorrect outputs and automated actions and to design systems with human oversight to ensure aligned and safe outcomes, enabling **Human Augmentation by Oversight.** |
| Failure modes | Automation of decisions the AI Act treats as high risk or prohibits Agents acting beyond their mandate Review in name only |
| Practical controls | Impact assessment before automation Approval gates for consequential actions Bounded autonomy with escalation paths |
| Related links | EU AI Act, Article 14 (human oversight) AI-RFX: operational process design |

Irrespective of how many levels of abstractions are introduced through AI systems, the impact is and will always continue to be human. AI systems should be developed to augment human cognition and capability as a whole. Human oversight must be enabled, and where reasonable, with human-in-the-loop established to drive remediation to predictions in contexts of high or unacceptable risk outcomes. This is a requirement now codified in Article 14 of the EU AI Act, which [the institute contributed to through its policy work](https://todo.add.link).

The AI Act also draws the automation line in law: Article 5 prohibits some practices outright, such as social scoring and manipulative systems, while the high-risk uses of Annex III, including justice, healthcare and critical infrastructure, may only operate under the human oversight of Article 14\. In these domains a single wrong prediction can carry generational impact, so the level of automation must follow the consequence, not the capability.

### Where it fails

Oversight designed for single ML models does not transfer to modern AI & Agentic systems. An agent can take hundreds of actions in one task, so reviewing each one is impossible, however in some contexts reviewing none may be negligent.

* Automation that displaces meaningful human judgement.  
* Agents that operate outside the mandate their operators intended.  
* Interfaces which conceal uncertainty, or review exists only on paper.

### Practical controls

Controls should keep accountable people close to consequential decisions and scale oversight to the system's autonomy.

* Assess the consequences of errors before automating a decision.  
* Bound what a system may do alone and gate consequential actions on approval.  
* Measure outcomes for the people affected, and keep escalation paths that work.

## P02 — Fairness by Calibration

| Field | Content |
| :---- | :---- |
| Title | Fairness by Calibration |
| Tagline | All models carry inherent bias; some may be useful, but some can be harmful. This bias must be identified and where relevant, calibrated. |
| Tagline | We commit to introduce processes proportionate to risk that mitigate unintended discrimination across groups in the AI systems productionised, enabling **Fairness by Calibration**. |
| Failure modes | Inherited model bias propagated across the system Application data and prompts amplifying skew Fine-tuning shifting behaviour unnoticed |
| Practical controls | Disaggregated behavioural evaluations Review of provider model documentation Re-evaluation after fine-tuning and updates |
| Related links | XAI Framework AI-RFX: data & model assessment |

Human and model bias is present throughout the end-to-end AI system lifecycle; bias evaluation supports understanding who benefits, who carries risk, and where a system's errors concentrate. In systems built on general-purpose models the bias has two layers: 1\) what the model inherited from training data that its deployer cannot inspect, and 2\) what the application introduces through its own data, prompts, retrieval sources and thresholds. 

Furthermore, fine-tuning amplifies both layers, as it rewrites the model's behaviour and makes the result the fine-tuner's responsibility. This is why it is important to ensure processes and frameworks are in place, proportionate to the risk involved, in to understand the extent and scale of the bias present. This enables mitigation of the group-skewed risks identified throughout the system.

### Where it fails

Bias is ubiquitous in AI systems, however negative impact concentrates where nobody is measuring, and a system built on a general-purpose model inherits skew its team never chose.

* Inherited model bias propagates into every downstream decision the system takes.  
* Application data, prompts, retrieval sources and thresholds amplify skew the base model did not have.  
* Fine-tuning shifts behaviour in ways that go unnoticed without re-evaluation.

### Practical controls

Teams must combine quantitative tests with domain knowledge, as well as processes, as opposed to only tools.

* Run disaggregated behavioural evaluations across the groups the system affects.  
* Review provider model documentation for known biases and evaluation gaps.  
* Re-evaluate after fine-tuning, model updates and changes in deployment conditions.

## P03 — Explainability by Justification

| Field | Content |
| :---- | :---- |
| Title | Explainability by Justification |
| Tagline | Frontier models are black boxes by design; however AI systems that integrate them can be explainable through tooling, process and best practice. |
| Commitment | We commit to develop tools and processes to enhance the transparency and explainability of AI systems where reasonable, enabling **Explainability by Justification**. |
| Failure modes | Unnecessarily convoluted agentic graphs Stated reasoning diverging from actual behaviour Lack of deterministic flows where systematic execution required |
| Practical controls | Interpretability and attribution tooling Transparency artifacts such as model and system cards Infrastructure for semantic root cause analysis |
| Related links | XAI Framework AI-RFX: transparency capabilities |

Frontier models are black boxes by design. When these are integrated into a larger AI system; these can become either more opaque or more transparent. This requires practitioners to work towards integrating and iteratively extending the infrastructure required to ensure key components have human interpretability and accountability. 

Similarly, explainability does not arise from purely tooling, but particularly also from the processes and the steps carried out by domain experts. The right process should be designed proportionate to the risk involved in the system's outputs themselves.

### Where it fails

Opacity compounds when systems are assembled without explainability in mind, and the explanation a system gives is not automatically the truth of what it did.

* Unnecessarily convoluted agentic graphs that no operator can follow end to end.  
* Stated reasoning that diverges from the actual behaviour of the model.  
* Missing deterministic flows where systematic, repeatable execution is required.

### Practical controls

Explainability today is built from interpretability and attribution tooling, grounding outputs in citable sources, and transparency artifacts.

* Apply interpretability and attribution tooling proportionate to the risk of the output.  
* Publish model and system cards that state what a system is, what it was evaluated on and where it should not be used.  
* Build infrastructure for semantic root cause analysis, and document any explainability vs capability/performance trade-offs against the domain's need for justification.

## P04 — Provenance by Reproducibility

| Field | Content |
| :---- | :---- |
| Title | Provenance by Reproducibility |
| Tagline | Storing traces of a system does not ensure provenance. Lineage is not the goal but the means for reproducible operations with provenance, which together enable auditability. |
| Commitment | We commit to develop the infrastructure required to enable the lineage required to recreate and reconstruct historical operations across the AI system, enabling **Provenance by Reproducibility**. |
| Failure modes | Unpinned model versions Gaps in data governance throughout system Historical steps that cannot be reconstructed |
| Practical controls | Version pinning for models, prompts and configuration Determinism in atomic steps through seed/input metadata Data provenance and lineage across operations |
| Related links | ML Maturity Model State of Production ML 2025 |

Diagnosing a production incident requires reproducing the conditions that caused it. A team deploying a model it did not train cannot reproduce the model, but they can and must be able to reproduce operations on their own system. Foundational pillars of AI provenance include pinned model versions, the prompts and configuration in place, the data that flowed through, and the provenance of any fine-tune, including base model, data and adapters. Hosted models are updated and deprecated by their providers, so an unpinned version changes the system underneath its operators and must be explicitly captured.

Reproducibility is also what makes auditability possible, not only lineage. For AI systems it is necessary to record not only decisions but also trajectory metadata required to reconstruct what specific steps previously carried out. Retaining these records is now an operational capability that is foundational for production best practices for any AI systems in production.

### Where it fails

A single missing trail can have a trickling down impact on the provenance of the system, and the gap is usually discovered during the incident that needed it.

* Unpinned model versions that let providers change the system underneath its operators.  
* Gaps in data governance across the system's operations.  
* Historical steps that cannot be reconstructed from what was recorded.

### Practical controls

Controls should make the team's own system reproducible even when the model it builds on is not theirs.

* Pin versions for models, prompts and configuration, including the base model, data and adapters of any fine-tune.  
* Make atomic steps deterministic through seed and input metadata.  
* Record data provenance and lineage across operations, including the trajectory metadata needed to reconstruct past steps.

## P05 — Reskilling by Design

| Field | Content |
| :---- | :---- |
| Title | Reskilling by Design |
| Tagline | Automation at scale changes work across organisations and industries; those effects should be identified and planned for, not discovered. |
| Commitment | We commit to identify, document and systematically support the re-skilling of our domain experts and mitigate the impact on workers affected by automation, enabling **Re-skilling by Design.** |
| Failure modes | Lack of systematic plan for workforce support No retraining and reskilling paths Undocumented process change |
| Practical controls | Workforce impact assessment Business change planning Process documentation |
| Related links | AI-RFX: change management |

Automating medium or large processes affects many people across an organisation or industry, and general-purpose AI has widened the range of work this applies to. Technologists should look beyond the technology and help relevant stakeholders understand those effects and their impact. As Jevons Paradox observed, when a new technology unlocks major automations that reduce the costs of a service, total demand does not decrease, in fact as the service becomes more accessible, the total demand increases. So it is important that the industry as a whole is supported to evolve towards that increased demand.

Even if more junior practitioners do not lead an operational transformation, they should contribute to ensure that appropriate change-management processes are in place, particularly if they are involved in the development of the AI systems involved. Those processes should contribute towards a sustainable industry-wide effort to shift and evolve amid the accelerated transformation that AI systems are imposing in society and the workforce.

### Where it fails

Displacement is rarely a single event; it accumulates while attention stays on the technology.

* No systematic plan for supporting the workforce whose work is changing.  
* No retraining or reskilling paths for the roles being automated.  
* Process changes that go undocumented until the operational knowledge is gone.

### Practical controls

Controls should treat workforce impact as part of the delivery, not an afterthought of it.

* Assess workforce impact before automating a process.  
* Plan business change alongside technical delivery, with reskilling paths for affected domain experts.  
* Document process changes so knowledge survives the transition.

## P06 — Evaluation by Observability

| Field | Content |
| :---- | :---- |
| Title | Evaluation by Observability |
| Description | A system that is only evaluated before launch is unevaluated for most of its lifetime; robust observability converts evals into a live property of the system. |
| Tagline | We commit to evaluate our AI systems against the domain-specific consequences of their behaviour, and to ensure robust monitoring capabilities are in place for as long as the system operate, enabling **Evaluation by Observability**.. |
| Failure modes | Benchmark contamination and overfitting Lack of telemetry, tracing, logging and general observability Drift that goes undetected after deployment |
| Practical controls | Domain-grounded capability and safety evals Cost-weighted metrics with production monitoring Incident feedback into the evaluation suite |
| Related links | AI-RFX: practical benchmarks State of Production ML 2025 |

A system can score well on public benchmarks and still be wrong in ways that matter in its domain. Evals should be built from the consequences of each kind of error, including **capability evals** for what the system must do, **safety evals** for what it must not, and **cost-weighted measures** that reflect the asymmetry between a false alarm and a missed harm.

The same questions continue once the system is in production and should be answered with robust observability. Behaviour must be tracked against real traffic rather than curated test sets, and where relevant advanced monitoring applied, such as drift and outlier detection, as well as agent/model-as-judge patterns throughout the data flow of the systems.

### Where it fails

Evaluation fails silently: the score stays green while the system and its conditions drift.

* Benchmark contamination and overfitting inflating measured capability.  
* Symmetric error assumptions hiding the asymmetry between a false alarm and a missed harm.  
* Drift in data, usage or hosted model versions that goes undetected after deployment.

### Practical controls

Controls should make evaluation continuous, with production behaviour feeding the same suite that gated the release.

* Build domain-grounded capability and safety evals with cost-weighted metrics.  
* Monitor production behaviour with drift and outlier detection, and agent/model-as-judge patterns where relevant.  
* Feed incidents and near misses back into the evaluation suite, so each release is tested against the failures the previous one produced.

## P07 — Trust by Privacy

| Field | Content |
| :---- | :---- |
| Title | Trust by Privacy |
| Tagline | A Frontier Model can hold data from people who have never used it; every layer built on top can multiply exposure, so model deployers must ensure privacy is designed at each one in order to enable trust. |
| Commitment | We commit to build and communicate privacy processes that protect the data of stakeholders interacting with our AI systems directly and indirectly, enabling **Trust by Privacy.** |
| Failure modes | Personal data extractable from a model by prompting Sensitive data flowing to third parties the user never agreed to One user's data surfacing in another user's session |
| Practical controls | Privacy impact assessment before connecting data to a model Memory segregation across users with no shared session context End-to-end encryption of personal data in transit and at rest |
| Related links | AI-RFX: privacy capabilities |

AI systems widen the paths along which personal data can leak. Models can memorise training data and reproduce it under extraction attacks, a builder-side risk that fine-tuners take on the moment they train on their own records. On the deployer side, every inference call can send user data to third parties the person never agreed to, and shared agent infrastructure can let one user's data surface in another's session.

Privacy should therefore be designed at every layer: assessed before data is connected to a model, segregated across users and tiers in memory, and encrypted in transit and at rest. Trust also requires communication, so stakeholders, direct and indirect, should be able to learn what data is held, how it is handled and why protecting it matters.

### Where it fails

The leak paths are wider than the application's own database, and most of them sit outside classic privacy reviews.

* Personal data extractable from a model by prompting.  
* Sensitive data flowing to third parties the person never agreed to.  
* One user's data surfacing in another user's session.

### Practical controls

Controls should protect data at every layer it passes through, before it reaches a model, while it sits in memory, and wherever it travels.

*  Run a privacy impact assessment before deploying an AI system.  
* Segregate memory across users, with no shared session context.  
* Encrypt personal data end to end, in transit and at rest.

## P08 — Safety by Security

| Field | Content |
| :---- | :---- |
| Title | Safety by Security |
| Tagline | Any input a model processes is an attack surface; any tool an agent holds is blast radius. AI systems must be secured across its whole lifecycle, because there is no safety without security. |
| Commitment | We commit to develop the processes and infrastructure required to secure our AI systems across its lifecycle, and to treat the safety of their actions as part of that boundary, enabling **Safety by Security**. |
| Failure modes | Agents granted standing permissions beyond their task Models, data and tools adopted without vetting or integrity checks Agent credentials shared across users, tasks and environments |
| Practical controls | Threat modelling against the MLSecOps Top 10 and OWASP agentic attack vectors Trust boundaries separating model instructions from external content Red-teaming, layered safeguards and monitoring |
| Related links | MLSecOps Top 10 OWASP Agentic Security (attack-vector report) |

Security spans the full lifecycle of an AI system: training data can be poisoned, model artifacts and their dependencies compromised through the supply chain, and deployed models probed through their own interface. Prompt injection turns any text a model reads into a potential instruction channel, jailbreaks defeat behavioural safeguards, and an agent connected to tools converts a successful injection into real actions with real permissions. This is where security and safety meet: a compromised agent is not only a breached system but an unsafe one, and controls should match both the system's exposure and the harm its actions could cause.

Teams should assume that capable adversaries will probe their models and tools. The institute's MLSecOps Top 10 covers the pipeline-level vulnerabilities; the attack vectors specific to agentic systems are catalogued in the OWASP agentic security work the institute co-authored. Together with the OWASP Top 10 for LLM applications, these should anchor a threat review before any AI system reaches production.

### Where it fails

The interface itself is now attack surface, and a compromise propagates as far as the system's permissions reach.

* Agents granted standing permissions beyond what their task requires.  
* Models, data and tools adopted without vetting or integrity checks.  
* Agent credentials shared across users, tasks and environments.

### Practical controls

Controls should match the system's exposure and the harm its actions could cause.

* Threat-model against the MLSecOps Top 10, the OWASP agentic attack vectors and the OWASP Top 10 for LLM applications.  
* Enforce trust boundaries that separate model instructions from external content.  
* Validate layered safeguards through repeatable red-teaming and monitoring.

## P09 — Human Alignment by Intent

| Field | Content |
| :---- | :---- |
| Title | Human Alignment by Intent |
| Tagline | A system optimises what it was given, not what was meant. Intent must be made explicit, tested under pressure, and revisable when evidence contradicts it. |
| Commitment | We commit to evaluate whether our AI systems pursue what was intended rather than what was measured, and to test for misgeneralisation, deception and misuse where reasonable, ensuring **Human Alignment by Intent**. |
| Failure modes | No definition of what the system must never pursue High risk systems that cannot be interrupted once running Objectives never revisited as the deployment context changes |
| Practical controls | Periodic objective reviews as deployment conditions change Post-deployment audits of behaviour against the stated intent Monitoring for divergence between the metric and intended outcome |
| Related links | K8s Agent OS (KAOS) Agentic safety programme |

An aligned system behaves consistently with the purpose, constraints and values established by accountable people. A capable system can satisfy its evaluations while pursuing something other than what its operators intended: optimising a proxy that diverges outside training, behaving differently when it detects it is being tested, or being repurposed for harm. Alignment to operator intent is therefore the first requirement, and that intent must be made explicit and testable rather than assumed.

An objective can be faithfully pursued and still cause harm, so the values a system serves must extend beyond its operator to the people its actions affect, including a clear definition of what the system must never pursue. Those obligations do not end at deployment, as objectives should be revisited as deployment conditions change, behaviour audited against the stated intent, and high-risk systems kept interruptible for as long as they run.

### Where it fails

A system can pass its evaluations and still pursue the wrong thing, because the evaluations measured a proxy rather than the intent.

* No definition of what the system must never pursue.  
* High-risk systems that cannot be interrupted once running.  
* Objectives never revisited as the deployment context changes.

### Practical controls

Controls should make intent explicit and keep the deployment revisable when evidence contradicts it.

* Review objectives periodically as deployment conditions change.  
* Audit post-deployment behaviour against the stated intent.  
* Monitor for divergence between the metric and the intended outcome.

