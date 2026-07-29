PROPOSAL — for owner review (v2, frontier revision)

# Principles copy sheet — The 9 Responsible AI Principles

This version replaces the earlier annotation sheet with the actual proposed content, per principle: frontmatter (title, description, commitment, failure_modes, controls, related_links) followed by the body prose, mapping 1:1 to `src/content/principles/NN.md`. Edit in place.

## Cross-cutting decisions (ratified in review)

- **Persona:** the principles address teams that build systems with AI models: deployers, integrators and fine-tuners. Each entry stays readable by model builders; where the builder obligation differs, the entry states it.
- "machine learning systems" wording replaced with "AI systems" throughout, including commitments.
- `description` no longer duplicates the commitment.
- Monitoring lives in 06 (evaluation continued in production); auditability lives in 04 (renamed Traceable operations). No tenth principle.
- Boundary between 02 and 09 written into both bodies: 02 asks who carries the errors, 09 asks what the system is pursuing.
- No em-dashes anywhere.

## Proposed index intro (persona statement, for /principles)

> These principles are written for the teams that put AI systems into the world: deployers, integrators and fine-tuners. Each principle names a failure domain, the commitment that addresses it and the controls that implement it. Where the obligation differs for organisations that train models, the principle says so.

---

## P01 — Human augmentation

```yaml
title: Human augmentation
description: AI should extend what people can understand and accomplish without transferring responsibility to a system.
commitment: We commit to assess the consequences of incorrect outputs and automated actions and, where reasonable, to design systems with human oversight that can change the outcome.
failure_modes:
  - Full automation in justice, healthcare or transport
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

AI should extend what people can understand and accomplish without transferring responsibility to a system. Human oversight must be informed, timely and capable of changing an outcome, a requirement now codified in Article 14 of the EU AI Act, which the institute contributed to through its policy work.

### Where it fails

Oversight designed for single predictions does not transfer to systems that act. An agent can take hundreds of actions in one task, so reviewing each one is impossible and reviewing none is negligent.

- Automation displaces meaningful human judgement.
- Agents operate outside the mandate their operators intended.
- Interfaces conceal uncertainty, or review exists only on paper.

### Practical controls

Controls should keep accountable people close to consequential decisions and scale oversight to the system's autonomy.

- Assess the consequences of errors before automating a decision.
- Bound what a system may do alone and gate consequential actions on approval.
- Measure outcomes for the people affected, and keep escalation paths that work.

## P02 — Bias evaluation

```yaml
title: Bias evaluation
description: Bias evaluation should examine who benefits, who carries risk, and where a system's errors concentrate.
commitment: We commit to continuously develop processes that allow us to understand, document and monitor bias in the models we use and in the applications we build on them.
failure_modes:
  - Inherited model bias assumed away
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

Bias evaluation should examine who benefits, who carries risk, and where a system's errors concentrate. In systems built on general-purpose models the bias has two layers: what the model inherited from training data that its deployer cannot inspect, and what the application introduces through its own data, prompts, retrieval sources and thresholds. The first layer is probed through disaggregated behavioural evaluation and provider documentation; the second is the deployer's own code and data, which can amplify or correct what the model brings. Fine-tuning bridges the two: it rewrites the model's behaviour and makes the result the fine-tuner's responsibility.

This principle asks who carries a system's errors. Whether the system is pursuing its operator's intent at all is a separate question, covered by principle 09. Teams should combine quantitative tests with domain knowledge and affected-community input, then re-evaluate as data, model versions and deployment conditions change.

## P03 — Explainability by justification

```yaml
title: Explainability by justification
description: People affected by an AI system's output should be able to obtain an explanation that is faithful to how the result was produced.
commitment: We commit to develop tools and processes to enhance the transparency and explainability of AI systems where reasonable.
failure_modes:
  - Opaque pipelines
  - Explanations no operator can use
  - Stated reasoning diverging from actual behaviour
controls:
  - Interpretability and attribution tooling
  - Grounding and citation of sources
  - Transparency artifacts such as model and system cards
related_links:
  - XAI Framework
  - "AI-RFX: transparency capabilities"
```

Frontier models are more opaque than any system this principle was written for, which makes the commitment matter more, and changes how it is met. A model can also produce a fluent account of its reasoning that does not correspond to how the answer was actually computed, so an explanation is only useful if it is faithful.

Explainability today is built from interpretability and attribution tooling, grounding outputs in citable sources, and transparency artifacts such as model and system cards that state what a system is, what it was evaluated on and where it should not be used. Where a design choice trades capability for transparency, the trade-off should be documented and weighed against the domain's need for justification.

## P04 — Traceable operations

```yaml
title: Traceable operations
description: Teams should be able to reconstruct what a system did and why, and reproduce the conditions under which it did it.
commitment: We commit to develop the infrastructure required to enable a reasonable level of reproducibility and auditability across the operations of our AI systems.
failure_modes:
  - Unpinned model versions
  - Broken lineage
  - Agent actions that cannot be reconstructed
controls:
  - Version pinning for models, prompts and configuration
  - Data and fine-tune provenance
  - Audit logs of decisions and agent trajectories
related_links:
  - ML Maturity Model
  - State of Production ML 2025
```

Diagnosing a production incident requires reproducing the conditions that caused it. A team deploying a model it did not train cannot reproduce the model, but it can and must reproduce its own system: the pinned model version, the prompts and configuration in force, the data that flowed through, and the provenance of any fine-tune, including base model, data and adapter. Hosted models are updated and deprecated by their providers, so an unpinned version silently changes the system underneath its operators.

Reproducibility is also what makes an audit possible. For systems that act, the record extends to decision and trajectory logs sufficient to reconstruct, after the fact, what an agent did, with which tools, and why. Retaining that record is an operational capability to be built, tested and kept working, in the same way as backups.

## P05 — Displacement strategy

```yaml
title: Displacement strategy
description: Automation at scale changes work across organisations and industries; those effects should be identified and planned for, not discovered.
commitment: We commit to identify and document relevant information so that business change processes can be developed to mitigate the impact on workers affected by automation.
failure_modes:
  - Silent role removal
  - No retraining path
  - Undocumented process change
controls:
  - Workforce impact assessment
  - Business change planning
  - Process documentation
related_links:
  - "AI-RFX: change management"
```

Automating medium or large processes affects many people across an organisation or industry, and general-purpose AI has widened the range of work this applies to. Technologists should look beyond the technology and help relevant stakeholders understand and document those effects. As Jevons observed of efficiency gains generally, cheaper automation tends to increase total demand for it, so displacement questions recur rather than resolve.

Even when technologists do not lead an operational transformation, they should help ensure that appropriate change-management processes are in place. Those processes should mitigate impacts on workers regardless of the type of work being automated. The scope of this principle is deliberately organisational: it commits teams to the effects they can assess and plan for, rather than to statements about the labour market at large.

## P06 — Practical evaluation

```yaml
title: Practical evaluation
description: Evaluation should reflect the domain-specific consequences of a system's behaviour, and it does not stop at deployment.
commitment: We commit to develop evaluation processes that reflect the domain-specific consequences of our AI systems' behaviour, before deployment and in production.
failure_modes:
  - Benchmark contamination and overfitting
  - Symmetric error assumptions
  - Evaluation that stops at deployment
controls:
  - Domain-grounded capability and safety evaluations
  - Cost-weighted metrics
  - Production monitoring and drift detection
related_links:
  - "AI-RFX: practical benchmarks"
  - State of Production ML 2025
```

A system can score well on public benchmarks and still be wrong in ways that matter in its domain, because benchmarks leak into training data and because headline metrics assume every error costs the same. Teams should examine the consequences of each kind of error and evaluate against them: capability evaluations for what the system must do, safety evaluations for what it must not, and cost-weighted measures that reflect the asymmetry between a false alarm and a missed harm. Automated judging, including using one model to grade another, inherits the judge's own failure modes and needs the same scrutiny.

Pre-deployment evaluation is a rehearsal. The same activity continues in production as monitoring: tracking behaviour against real traffic, detecting drift as data, model versions and usage change, and feeding incidents back into the evaluation suite. A system that is only evaluated before launch is unevaluated for most of its life.

## P07 — Trust by privacy

```yaml
title: Trust by privacy
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

## P08 — Security and data risk

```yaml
title: Security and data risk
description: Security is a lifecycle responsibility spanning data collection, model development, deployment, and retirement.
commitment: We commit to develop and improve reasonable processes and infrastructure to ensure data and model security are taken into consideration across the lifecycle of our AI systems.
failure_modes:
  - Prompt injection and jailbreaks
  - Agent tool misuse
  - Supply-chain vulnerabilities
controls:
  - MLSecOps and agentic security controls
  - Least-privilege access for models and tools
  - Observability and lineage
related_links:
  - MLSecOps Top 10
  - OWASP Agentic Security (attack-vector report)
```

Security is a lifecycle responsibility spanning data collection, model development, deployment, and retirement. Controls should match the system's exposure and the harm a compromise could cause. The threat surface now includes the model's interface itself: prompt injection turns any text a model reads into a potential instruction channel, jailbreaks defeat behavioural safeguards, and agents connected to tools convert a successful injection into real actions with real permissions.

Teams should assume that models and their surrounding tools will be probed by capable adversaries, grant models and agents the least privilege their task requires, and validate layered safeguards through repeatable testing and monitoring. The institute's MLSecOps Top 10 covers the pipeline-level vulnerabilities; the attack vectors specific to agentic systems are catalogued in the OWASP agentic security work the institute co-authored.

## P09 — Alignment with intent

```yaml
title: Alignment with intent
description: An aligned system should behave consistently with the purpose, constraints, and values established by accountable people.
commitment: We commit to evaluate whether systems pursue the objectives intended by operators and stakeholders, and to test for goal misgeneralisation, misuse and deceptive behaviour where reasonable.
failure_modes:
  - Goal misgeneralisation
  - Deceptive behaviour under evaluation
  - Misuse of autonomous agents
controls:
  - Intent specification
  - Adversarial and scheming evaluations
  - Continuous monitoring
related_links:
  - K8s Agent OS (KAOS)
  - Agentic safety programme
```

An aligned system should behave consistently with the purpose, constraints and values established by accountable people. A system can meet a narrow metric while producing a harmful wider outcome, and a capable system can satisfy its evaluations while pursuing something other than what its operators intended: optimising a proxy that diverges outside training, behaving differently when it detects it is being tested, or being repurposed for harm.

This principle asks what the system is pursuing. Whether its errors fall unevenly across people is the separate question covered by principle 02; a system can be free of bias and still misaligned, pursuing the wrong objective equally for everyone. Teams should make intent testable, examine how systems behave under adversarial pressure, and retain the ability to interrupt or revise deployments as real-world evidence changes.
