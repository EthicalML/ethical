PROPOSAL — for owner review (v2, frontier revision)

# Principles copy sheet — The 9 Responsible AI Principles

This version replaces the earlier annotation sheet with the actual proposed content, per principle: frontmatter (title, description, commitment, failure_modes, controls, related_links) followed by the body prose, mapping 1:1 to `src/content/principles/NN.md`. Edit in place.

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

## P01 — Human Augmentation

```yaml
title: Human Augmentation
description: Irrespective of how many levels of abstractions are introduced through AI systems, the impact is and will always continue to be human.
commitment: We commit to assess the consequences of incorrect outputs and automated actions and, to design systems with human oversight to ensure aligned and safe outcomes.
failure_modes:
  - Automation of decisions the AI Act treats as high risk or prohibits
  - Agents acting beyond their mandate
  - Review in name only
controls:
  - Impact assessment before automation
  - Approval gates for consequential actions
  - Bounded autonomy with escalation paths
related_links:
  - EU AI Act, Article 14 (human oversight)
  - "AI-RFX: operational process design"
```

Irrespective of how many levels of abstractions are introduced through AI systems, the impact is and will always continue to be human. AI systems should be developed to augment human cognition and capability as a whole. Human oversight must be enabled, and where reasonable, enabling human-in-the-loop to drive changes to high risk outcomes. This is a requirement now codified in Article 14 of the EU AI Act, which [the institute contributed to through its policy work](/initiatives).

The AI Act also draws the automation line in law: Article 5 prohibits some practices outright, such as social scoring and manipulative systems, while the high-risk uses of Annex III, including justice, healthcare and critical infrastructure, may only operate under the human oversight of Article 14. In these domains a single wrong prediction can carry generational impact, so the level of automation must follow the consequence, not the capability.

### Where it fails

Oversight designed for single predictions does not transfer to modern AI & Agentic systems. An agent can take hundreds of actions in one task, so reviewing each one is impossible and in some contexts reviewing none may be negligent.

- Automation that displaces meaningful human judgement.
- Agents that operate outside the mandate their operators intended.
- Interfaces which conceal uncertainty, or review exists only on paper.

### Practical controls

Controls should keep accountable people close to consequential decisions and scale oversight to the system's autonomy.

- Assess the consequences of errors before automating a decision.
- Bound what a system may do alone and gate consequential actions on approval.
- Measure outcomes for the people affected, and keep escalation paths that work.

## P02 — Bias Evaluation
[PROPOSED renames, pick one: 1) Bias Calibration (recommended — matches the description's "identified and where required, calibrated" and goes beyond only evaluating); 2) Fairness by Calibration (matches the "X by Y" house pattern of P03/P07); 3) Bias & Fairness (plainest, most searchable); 4) Equitable Impact (names the outcome; pairs cleanly with the 02/09 boundary "who carries the errors").]

```yaml
title: Bias Evaluation
description: All models have inherent bias; despite this, some can be useful, but some can be harmful. This bias must be identified and where required, calibrated.
commitment: We commit to continuously develop processes that allow us to understand, document and monitor bias in the models we use and across the systems we build on them.
failure_modes:
  - Inherited model bias propagated across the system
  - Application data and prompts amplifying skew
  - Fine-tuning shifting behaviour unnoticed
controls:
  - Disaggregated behavioural evaluations
  - Review of provider model documentation
  - Re-evaluation after fine-tuning and updates
related_links:
  - XAI Framework
  - "AI-RFX: data & model assessment"
```

Bias evaluation should examine who benefits, who carries risk, and where a system's errors concentrate. In systems built on general-purpose models the bias has two layers: 1) what the model inherited from training data that its deployer cannot inspect, and 2) what the application introduces through its own data, prompts, retrieval sources and thresholds. Furthermore, fine-tuning amplifies both layers, as it rewrites the model's behaviour and makes the result the fine-tuner's responsibility.

This principle asks who carries the skewed impact of the AI system errors. Teams must combine quantitative tests with domain knowledge and affected-community input, then re-evaluate as data, model versions and deployment conditions change.

## P03 — Explainability by Justification

```yaml
title: Explainability by Justification
description: Frontier models are black boxes; however AI systems that integrate them can be more opaque and undeterministic, or explainable through tooling, process and best practice.
commitment: We commit to develop tools and processes to enhance the transparency and explainability of AI systems where reasonable.
failure_modes:
  - Unnecessarily convoluted agentic graphs
  - Stated reasoning diverging from actual behaviour
  - Lack of deterministic flows where systematic execution required
controls:
  - Interpretability and attribution tooling
  - Transparency artifacts such as model and system cards
  - Infrastructure for semantic root cause analysis
related_links:
  - XAI Framework
  - "AI-RFX: transparency capabilities"
```

Frontier models are black boxes by design. When these are integrated into a larger AI system; these can become either more opaque or more transparent. This requires practitioners to work towards integrating and iteratively extending the infrastructure required to ensure key components have human interpretability and accountability. Explainability should also be proportionate to the risk involved in the system's outputs themselves.

Explainability today is built from interpretability and attribution tooling, grounding outputs in citable sources, and transparency artifacts. Foundational capabilities involve model and system cards that state what a system is, what it was evaluated on and where it should not be used. Any trade-offs that involve explainability vs capability/performance, should be documented and weighed against the domain's need for justification.

## P04 — Reproducibility & Provenance

```yaml
title: Reproducibility & Provenance
description: Storing traces of a system does not ensure provenance. These should not only provide lineage but should be reproducible and auditable in order to be useful.
commitment: We commit to develop the infrastructure required to enable reproducibility and provenance across the operations of our AI systems.
failure_modes:
  - Unpinned model versions
  - Gaps in data governance throughout system
  - Historical steps that cannot be reconstructed
controls:
  - Version pinning for models, prompts and configuration
  - Determinism in atomic steps through seed/input metadata
  - Data provenance and lineage across operations
related_links:
  - ML Maturity Model
  - State of Production ML 2025
```

Diagnosing a production incident requires reproducing the conditions that caused it. A team deploying a model it did not train cannot reproduce the model, but they can and must reproduce their own system. Foundational pillars of AI provenance include pinned model versions, the prompts and configuration in place, the data that flowed through, and the provenance of any fine-tune, including base model, data and adapters. Hosted models are updated and deprecated by their providers, so an unpinned version changes the system underneath its operators and must be explicitly captured.

Reproducibility is also what makes auditability possible, not only lineage. For AI systems it is necessary to record not only decisions but also trajectory metadata required to reconstruct what specific steps previously carried out. Retaining these records is now an operational capability that is foundational for production best practices for any AI systems in production.

## P05 — Reskilling by Design

```yaml
title: Reskilling by Design
description: Automation at scale changes work across organisations and industries; those effects should be identified and planned for, not discovered.
commitment: We commit to identify, document and systematically support the re-skilling and evolution of our domain experts to mitigate the impact on workers affected by automation.
failure_modes:
  - Lack of systematic plan for workforce support
  - No retraining and reskilling paths
  - Undocumented process change
controls:
  - Workforce impact assessment
  - Business change planning
  - Process documentation
related_links:
  - "AI-RFX: change management"
```

Automating medium or large processes affects many people across an organisation or industry, and general-purpose AI has widened the range of work this applies to. Technologists should look beyond the technology and help relevant stakeholders understand those effects and their impact. As Jevons observed of efficiency gains generally, cheaper automation tends to increase total demand for it not decrease it, so it is important that the industry as a whole is supported to evolve towards that increased demand.

Even if more junior practitioners do not lead an operational transformation, they should help ensure that appropriate change-management processes are in place, particularly if they are involved in the development in the AI systems involved. Those processes should contribute towards a sustainable industry-wide effort to shift and evolve amid the accelerated transformation that AI systems are imposing in society and the workforce. 

## P06 — Monitoring & Evals

```yaml
title: Monitoring & Evals
description: A system that is only evaluated before launch is unevaluated for most of its lifetime; robust observability and evaluation is required across the end-to-end lifecycle of the system.
commitment: We commit to evaluate our AI systems against the domain-specific consequences of their behaviour, and to ensure robust observability capapbilities are in place for as long as the system operates.
failure_modes:
  - Benchmark contamination and overfitting
  - Symmetric error assumptions
  - Drift that goes undetected after deployment
controls:
  - Domain-grounded capability and safety evals
  - Cost-weighted metrics with production monitoring
  - Incident feedback into the evaluation suite
related_links:
  - "AI-RFX: practical benchmarks"
  - State of Production ML 2025
```

A system can score well on public benchmarks and still be wrong in ways that matter in its domain. Evals should be built from the consequences of each kind of error, including **capability evals** for what the system must do, **safety evals** for what it must not, and **cost-weighted measures** that reflect the asymmetry between a false alarm and a missed harm. 

In production the same questions continue once the system is in production and should be monitored with robust observability. Behaviour must be tracked against real traffic rather than curated test sets, and where relvevant advanced monitoring such as drift and outlier detection, as well as agent/model-as-judge patterns throughout the data flow of the systems.. Incidents and near misses should feed back into the evaluation suite, so each release is tested against the failures the previous one produced.

## P07 — Trust by Privacy

```yaml
title: Trust by Privacy
description: Privacy protections must cover everyone a system touches, including people whose data reaches a model without their knowledge.
commitment: We commit to build and communicate processes that protect the data of stakeholders interacting with our AI systems directly and indirectly.
failure_modes:
  - Training data memorisation and extraction
  - Personal data retained by model providers
  - Sensitive data accumulating in agent context
controls:
  - Data minimisation before inference
  - Provider retention terms and agreements
  - Memorisation and extraction testing
related_links:
  - "AI-RFX: privacy capabilities"
```

AI systems widen the paths along which personal data can leak. Models can memorise training data and reproduce it under extraction attacks, a builder-side risk that fine-tuners take on the moment they train on their own records. On the deployer side, every inference call can send user data to a third-party provider, so retention terms belong in the privacy assessment, and agents accumulate sensitive material in their working context as they operate on a person's behalf.

Privacy should be designed into the system and its operating processes: minimise what enters a prompt or context window, contract for retention and use limits with providers, and test fine-tuned models for memorisation before release. Trust also requires communication, so stakeholders, direct and indirect, should be able to learn what data is held, how it is handled and why protecting it matters.

## P08 — Security & Safety

```yaml
title: Security & Safety
description: The attack surface of an AI system includes every piece of text its models read and every tool its agents can call. Security failures become safety failures the moment a system can act.
commitment: We commit to develop the processes and infrastructure required to secure our AI systems across their lifecycle, and to treat the safety of their actions as part of that security boundary.
failure_modes:
  - Prompt injection turning content into instructions
  - Agents misusing tools and permissions
  - Model and data supply-chain compromise
controls:
  - Threat reviews against the MLSecOps and OWASP agentic Top 10s
  - Least-privilege, sandboxed tool access for agents
  - Red-teaming, layered safeguards and monitoring
related_links:
  - MLSecOps Top 10
  - OWASP Agentic Security (attack-vector report)
```

Security spans the full lifecycle of an AI system: training data can be poisoned, model artifacts and their dependencies compromised through the supply chain, and deployed models probed through their own interface. Prompt injection turns any text a model reads into a potential instruction channel, jailbreaks defeat behavioural safeguards, and an agent connected to tools converts a successful injection into real actions with real permissions. This is where security and safety meet: a compromised agent is not only a breached system but an unsafe one, and controls should match both the system's exposure and the harm its actions could cause.

Teams should assume that capable adversaries will probe their models and tools, grant agents the least privilege their task requires, and validate layered safeguards through repeatable red-teaming and monitoring. The institute's MLSecOps Top 10 covers the pipeline-level vulnerabilities; the attack vectors specific to agentic systems are catalogued in the OWASP agentic security work the institute co-authored. Together with the OWASP Top 10 for LLM applications, these should anchor a threat review before any AI system reaches production.

## P09 — Intent Alignment

```yaml
title: Intent Alignment
description: An aligned system pursues the objectives its operators intended, within bounds set by the interests of the people its actions affect. Neither the intent nor the bounds can be assumed; both must be specified and tested.
commitment: We commit to evaluate whether our AI systems pursue the objectives their operators intended, to test for goal misgeneralisation, deception and misuse where reasonable, and to hold those objectives to the interests of the people they affect.
failure_modes:
  - Goal misgeneralisation outside training conditions
  - Deceptive behaviour under evaluation
  - Operator objectives that harm the people affected
controls:
  - Testable intent specification
  - Adversarial and scheming evaluations
  - Interruptible deployments with revisable objectives
related_links:
  - K8s Agent OS (KAOS)
  - Agentic safety programme
```

An aligned system behaves consistently with the purpose, constraints and values established by accountable people. A capable system can satisfy its evaluations while pursuing something other than what its operators intended: optimising a proxy that diverges outside training, behaving differently when it detects it is being tested, or being repurposed for harm. Alignment to operator intent is therefore the first requirement, and it must be made testable rather than assumed.

It is not the last requirement. An objective can be faithfully pursued and still cause harm, so the values a system serves must extend beyond its operator to the people its actions affect. This principle asks what the system is pursuing and for whom; whether its errors fall unevenly across people is the separate question covered by principle 02. Teams should specify intent, examine how systems behave under adversarial pressure, and retain the ability to interrupt or revise deployments as real-world evidence changes.
