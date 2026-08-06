---
title: 'Climate disclosure statement'
track: 'sustainability'
href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc/acm_climate_disclosure_final.pdf'
---

June 2, 2025
POLICY BRIEF ON​
THE EU AI ACT ​
FOR TRUE ENVIRONMENTAL ACCOUNTABILITY
Lead authors: Philipp Hacker, Nicolas Alder, Kai Ebert, Ralf Herbrich
Contributors: Bran Knowles, Lynn Kaack, Alejandro Saucedo
The Association for Computing Machinery (ACM) is the world’s longest established professional
society of individuals involved in all aspects of Computing. It annually bestows the ACM A.M. Turing
Award, often popularly referred to as the “Nobel Prize of Computing.” ACM’s Europe Technology
Policy Committee (“Europe TPC”) is charged with and committed to providing sound technical
information to policymakers and the general public in the service of sound public policymaking.
Europe TPC has responded to the European Union stakeholders’ consultations in the past in the
context of the AI Act1, the Data Act2, the Digital Services Act34, the Digital Citizen Principles5, the Cyber
Resilience Act6, amongst others7. ACM and Europe TPC are non-profit, non-political, and non-lobbying
organisations.
Europe TPC is pleased to provide this policy brief on the 16th of May, proposing five (5) primary
recommendations and four (4) secondary recommendations for policymakers to enable true
environmental accountability in the EU AI Act.

Executive Summary
Problem/Gap

Recommendation

Incomplete inference phase coverage

- Include inference-phase energy ​
  disclosures in Annexes IV, XI, XII AI Act
- Disclose the energy of AI hardware data and
  PUE

Omission of indirect emissions

Mandate disclosure of indirect GHG emissions

https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-ai-consultation.pdf
https://www.acm.org/binaries/content/assets/public-policy/acm-eur-tpc-data-act-comments-13may22a.pdf
https://www.acm.org/binaries/content/assets/public-policy/europetpc-digital-services-act-comments.pdf
https://www.acm.org/binaries/content/assets/public-policy/acm-europe-tpc-dsa-comments.pdf
https://www.acm.org/binaries/content/assets/public-policy/europetpc-comments-digital-principles.pdf
https://www.acm.org/binaries/content/assets/public-policy/acm-europe-tpc-cyber-reslience-comments-pdf
https://www.acm.org/public-policy/public-policy-statements

Omission of AI-specific water consumption

Include AI-related water use estimates in
Annexes IV and XI, with simplified rules for
SMEs.

Open-source exemption

Amend Art. 53(2) to include open-source
climate metrics and apply threshold-based
disclosure obligations

Lack of standard methodology

- Standardize energy reporting at the​
  cumulative server level
- Develop task-specific benchmarks
  inference energy reporting

for

No public access to energy data

- Create a public registry for climate metrics
- Ensure access under open data principles

Sustainability not clearly included in risk
assessments

Expand Art. 9 and 55 to require explicit
sustainability impact assessments

No time-of-use limits

Introduce constraints on training/inference
during peak hours

No renewable investment requirement

Require operators to fund new renewable
energy capacity equivalent to consumption

No AI energy credit system

Establish market-based AI energy credits to cap
and trade consumption

Primary Recommendations
The widespread adoption of artificial intelligence (AI) has generated keen interest globally and in the
European Union, particularly concerning energy consumption, greenhouse gas (GHG) emissions, and
overall environmental sustainability. As in other areas, sunlight is often the best disinfectant, and
reliable information is a necessary prerequisite for adequately tackling the dual green and digital
transition. Hence, meaningful data about the climate impact of AI is crucial to inform evidence-based
corporate strategy, AI development, consumer reactions, and policy choices. Climate-sensitive AI may
indeed also offer a European USP, and reduce reputational risks for AI users and deployers. Europe
TPC is pleased that the newly enacted AI Act offers an initial effort to address these concerns through
mandatory climate-related disclosures for specific AI providers. However, deficiencies in the
legislative text threaten to undermine its efficacy. While some of it may be remedied during
implementation (e.g., in the Code of Practice), important gaps remain.
These shortcomings raise serious questions about the law’s ability to comprehensively capture the AI
sector’s environmental footprint. Building on a technical and legal assessment of the Act’s
transparency provisions, Europe TPC proposes the following recommendations for targeted policy
interventions aimed at ensuring that the EU’s regulatory framework captures the real-life
environmental impacts of modern AI systems.

Problem A: Incomplete Coverage of the Inference Phase
Under the AI Act, high-risk AI systems must document training-related computational resources.
Under Art. 53, Annex XI, general-purpose AI (GPAI) providers must record known or estimated energy
consumption during model development. There is, however, no explicit requirement to disclose
energy consumption during inference, i.e., during the use of the model in the real world. The Code of
Practice (CoP) may partially close this loophole for GPAI providers. However, the CoP is not binding
and does not cover high-risk system providers. This oversight is particularly problematic for models
deployed in consumer-facing or industrial settings, where research has shown that inference energy
consumption, over time, dwarfs training consumption.8 The AI Act, hence, turns a blind eye to the
largest source of direct energy consumption–the everyday use of the model by millions of customers.
Recommendation 1: Inference Energy Transparency
●​ The preferred response is to extend Annex IV (high-risk systems), Annex XI and XII
obligations (GPAI models) to explicitly encompass inference-phase consumption on
standardized benchmarks. Downstream model providers/deployers would also benefit from
standard disclosures of AI hardware, in particular Graphics Processing Unit (GPU) hours or
server/rack-level data with Power Distribution Units (PDU9), as well as a data center’s Power
Usage Effectiveness (PUE10). While a reference in the CoP would be helpful, ultimately, the
Annexes need to be revised for an enforceable obligation.
●​ In the interim, existing law could be interpreted in a novel way by reclassifying requirements
to disclose technical integration (Annex XI(2)(a)) and interaction data (Annex XII(1)(d)).11 Both
categories can be understood to include hardware requirements for inference, based on
energy and computational demands. An administrative guideline or legislative clarification
should require providers of GPAI models to track and disclose operational energy usage
beyond initial training to this effect.
●​ Transparent reporting generates reputational incentives beyond economic considerations.
Inference, not just training, incurs substantial energy demands.8 For models subjected to high
inference volumes, cumulative inference energy can exceed that of the initial training phase.
Various techniques, such as knowledge distillation,12 pruning,13 or quantization,14 have been
developed that reduce these energy costs while preserving model performance.

See, e.g., Luccioni, S., Jernite, Y., and Strubell, E. 2024. Power hungry processing: Watts driving the
cost of AI deployment? In Proceedings of the 2024 ACM Conference on Fairness, Accountability, and
Transparency, 85; Wu, C. J., et al. (2022). Sustainable AI: Environmental implications, challenges and
opportunities. In Proceedings of Machine Learning and Systems, 4, 795-813.
A Power Distribution Unit (PDU) in a data center is a device used to distribute and measure electrical
power to servers, networking equipment, and other computing devices within a rack or across multiple
racks.
The Power Usage Effectiveness (PUE) is a metric used to measure how efficiently a data center
uses energy. It represents the ratio of the total energy consumed by the facility—including systems like
cooling and lighting—to the energy consumed specifically by the IT equipment performing computing
tasks.
Alder, N., Ebert, K., Herbrich, R., and Hacker, P. 2024. AI, climate, and transparency:
Operationalizing and improving the AI Act. arXiv preprint. arXiv:2409.07471; Ebert, K., Alder, N.,
Herbrich, R., and Hacker, P. 2024. AI, Climate, and Regulation: From Data Centers to the AI Act. arXiv
preprint. arXiv:2410.06681.
See, e.g., Sanh, V. "DistilBERT, a distilled version of BERT: smaller, faster, cheaper and lighter."
Proceedings of Thirty-third Conference on Neural Information Processing Systems (NIPS2019). 2019
See, e.g., Frankle, Jonathan, and Michael Carbin. "The Lottery Ticket Hypothesis: Finding Sparse,
Trainable Neural Networks." International Conference on Learning Representations. 2018.
See, e.g., Frantar, Elias, et al. "OPTQ: Accurate post-training quantization for generative pre-trained
transformers." 11th International Conference on Learning Representations. 2023.

Problem B: Oversight of Indirect Greenhouse Gas Emissions
The AI Act focuses on providers’ own energy-related metrics, including hardware configuration and
partial consumption data. However, emissions stemming from AI-driven applications—such as using
machine learning for fossil fuel exploration15—remain unaddressed. Entities deploying AI for
carbon-intensive activities thus face no obligation to disclose associated indirect GHG impacts.
Recommendation 2: Inclusion of Indirect Emissions
●​ The AI Act should incorporate indirect GHG effects in its transparency obligations. For
instance, supply chain accountability could be mandated, where providers collaborate with
downstream users to document carbon-intensive applications. Disclosures should be
quantitative to the best extent possible, which requires further basic research on methods
and best practices.16 SMEs could benefit from simplified disclosures or threshold limits.
Problem C: Oversight of Water Consumption
While the EU Energy Efficiency Directive compels large data centers to report water usage, the AI Act
itself imposes no AI-specific water-reporting mandates. However, cooling systems and ancillary
processes in data centers can consume vast quantities of water (with loss mostly through
evaporation),17 but current provisions fail to ensure that water consumption attributable to AI
workloads is disclosed. Water use is a crucial metric as climate change increasingly leads to water
scarcity in many areas, including in Europe.
Recommendation 3: Including Estimates of Water Consumption
●​ Through direct references in Annexes IV and XI, the law could require GPAI providers to
estimate water consumption tied to AI operations—either at a data center or server level.
SMEs could again benefit from simplified disclosures or threshold limits.
Problem D: Exemption of Open-Source Models
Open-source GPAI providers escape the transparency duties of Article 53(1) and Annexes XI and XII
unless their models pose a “systemic risk.” This is because the Act’s open-source definition (Art.
53(2)) already requires significant disclosures – but none of them are related to the climate and
energy effects. This blanket carve-out runs counter to the growing prominence of open-source
platforms, which may host large, resource-intensive models, some of which qualify for the
exemption. Consequently, a significant share of AI activities potentially remains outside the Act’s
scope for climate-related disclosures. The public availability of model weights should not exempt
developers from disclosing environmental metrics.
​
Recommendation 4: Removing the Open-Source Exemption for Climate Disclosures
●​ Open-source models are comparable to closed models in scope and impact, and just as
energy-demanding as their proprietary counterparts. Large corporations or well-funded

Kaack, L. H., Donti, P. L., Strubell, E., Kamiya, G., Creutzig, F., and Rolnick, D. 2022. Aligning
artificial intelligence with climate change mitigation. Nature Climate Change 12, 6, 518, 522.
See also Climate Change AI, Feedback on the Public Consultation on the proposed Harmonised
Rules on Artificial Intelligence, 2021, p. 4.
Li, P., Yang, J., Islam, M. A., and Ren, S. 2023. Making AI less "thirsty": Uncovering and addressing
the secret water footprint of AI models. arXiv preprint. arXiv:2304.03271; Zuccon, G., Scells, H., and
Zhuang, S. (2023, August). Beyond CO2 emissions: The overlooked impact of water consumption of
information retrieval models. In Proceedings of the 2023 ACM SIGIR International Conference on
Theory of Information Retrieval (pp. 283-289); Hacker, P. 2024. Sustainable AI Regulation. Common
Market Law Review 61, 345, 354-355.

start-ups (e.g., Meta, Mistral, DeepSeek) often release such open-source models. Hence, the
AI Act should require providers of open-source GPAI models, once they exceed a specified
size or risk profile (e.g., 10^23 FLOPs during development or more than 1 Mio. users), to
comply with fundamental climate-transparency measures. This can be achieved by amending
Article 53(2) or introducing new language in Annexes XI and XII. SMEs could again benefit
from simplified disclosures or threshold limits.
●​ Protections for collaborative innovation need not be compromised if the AI Office offers
specific guidelines on how open-source developers, and others, can provide energy metrics
without disclosing sensitive details (e.g., for each training run, different development phases)
and by relying primarily on the disclosures by cloud and data center providers.
Problem E: Absence of Standard Reporting Methodology
The legislation references the necessity to log energy usage but fails to prescribe a uniform
methodology. Approaches can vary (data-center level, server-level, GPU-level; different benchmarks),
each with distinct advantages and limitations. Inconsistent methods undermine comparability across
different AI providers. They also create legal uncertainty regarding adequate compliance and hamper
the potential for industry-wide best practices.
​
Recommendation 5: Standard Methodology for Energy Measurement
●​ Annexes XI and XII, or delegated regulation, should mandate measuring energy consumption
at the cumulative server level with PDUs. This level balances accuracy and feasibility,
capturing a realistic view of actual power usage. Reporting should factor in a data center’s
PUE. Where possible, real metering data must override estimates to maximize reliability.
Modern data centers already use PDUs, which are an industry‐standard component, for
power delivery and metering, as also referred to by existing regulations.18 GPU servers or
racks that draw power through PDUs provide precise, whole-system energy metrics. This
surpasses GPU-only measurements (e.g., NVIDIA-SMI), which ignore non-GPU power draw in
training and inference. A uniform methodology not only fosters an even compliance
landscape but also informs future best practices and benchmarks.
●​ Jointly with researchers, the AI Office and/or standard-setting organizations should develop a
set of task-specific benchmark datasets to measure energy consumption during inference. For
example, this would include specific writing, summarization, image generation, and analytical
prompts. Such benchmarks are necessary to meaningfully compare inference energy
consumption between models and establish it as a choice criterion for downstream providers
and deployers.19
Problem F: Lack of Public Access to Energy Data
The AI Act generally confines transparency obligations to regulators or downstream providers
(Articles 53(7) and 78). Public disclosure of climate-related metrics remains voluntary or indirect at
best. Hence, civil society actors, researchers, consumers, and consumer advocacy groups lack the
means to hold providers accountable, spur reputational incentives, and make informed consumption
choices.
​
Recommendation 6: Enabling Transparency and Accountability through Public Data Disclosure
●​ The AI Act should ensure that reported climate-related data is shared in a centralized, publicly
accessible registry. This could be administered by the AI Office or a related EU body and made

See, e.g., Annex II of the Delegated Regulation EU/2024/1364 of March 14, 2024.
See, e.g., the AI Energy Score developed by Sasha Luccioni et al.,
https://huggingface.github.io/AIEnergyScore/.

available under standard open data principles. Such an approach balances transparency with
legitimate trade-secret protections, particularly if metrics are aggregated at the cumulative
server level and reference key benchmarks. As a bare minimum, the CoP should foresee such
disclosures for “downstream providers,” not only for regulatory bodies.

Secondary Recommendations
Sustainability Risk Assessment. Articles 9 and 55 should more explicitly encompass sustainability
impact assessments, obliging providers to detail steps taken to minimize resource consumption, both
in terms of direct and indirect impacts.20 Currently, such assessments are only indirectly mandated by
the reference to assess and mitigate the impact on fundamental rights, which—for the AI
Act—includes environmental protection (cf. Art. 1(1)).21
Time-of-Use Constraints. Future revisions could limit AI training and certain inferences to more
flexibly match load and capacity (e.g., off-peak hours in carbon-intense grids), reducing grid overload
and facilitating better integration of renewables, and shifting compute loads to
lower-carbon-intensity grids.22
Requirements to Invest in Additional Renewable Capacity. AI and data center operators could be
obliged to meet their growing electricity demand by building out new renewable energy sources.23
This would prevent the depletion of green energy for other sectors. Moreover, such buildout should
ensure resource adequacy in local electricity grids.
Market-Based Energy Credits for AI. Inspired by the EU Emissions Trading System, the Commission
might consider tradable “AI energy budgets,” effectively capping large-scale consumption for certain
use cases (e.g., mere entertainment) and incentivizing efficiency in the long run.24

Conclusion
The AI Act constitutes a welcome step toward embedding environmental considerations in AI
regulation. Yet, to realize its potential, climate effects must be considered in its implementation, and
amendments must be made. The EU has an opportunity to make climate transparency a core
component of the emerging AI regulatory paradigm, and to make AI in Europe differentiated and
competitive on the world stage from a business perspective. Europe TPC thinks that, by adopting the
targeted measures proposed herein, legislators and implementing authorities could promote not only

See, e.g., Climate Change AI, Feedback on the Public Consultation on the proposed Harmonised
Rules on Artificial Intelligence, 2021, p. 4-5.
See also Hacker, P. 2024. Sustainable AI Regulation. Common Market Law Review 61, 345,
376-379; Climate Change AI, Feedback on the Public Consultation on the proposed Harmonised
Rules on Artificial Intelligence, 2021, p. 2-3.
See also Kaack, L. H., Donti, P. L., Strubell, E., Kamiya, G., Creutzig, F., & Rolnick, D. (2022).
Aligning artificial intelligence with climate change mitigation. Nature Climate Change, 12(6), 518, 523;
Ebert, K., Alder, N., Herbrich, R., and Hacker, P. 2024. AI, Climate, and Regulation: From Data
Centers to the AI Act. arXiv preprint. arXiv:2410.06681, 15; Hacker, P. 2024. Sustainable AI
Regulation. Common Market Law Review 61, 345, 379-380.
Ebert, K., Alder, N., Herbrich, R., and Hacker, P. 2024. AI, Climate, and Regulation: From Data
Centers to the AI Act. arXiv preprint. arXiv:2410.06681, 15.
See also Hacker, P. 2024. Sustainable AI Regulation. Common Market Law Review 61, 345,
380-383.

accountability and public trust in AI, but also the alignment of technological progress with crucial
environmental imperatives to mitigate climate change.
