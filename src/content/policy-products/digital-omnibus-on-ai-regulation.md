---
title: 'Digital Omnibus on AI regulation'
date: 'JAN 2026'
track: 'eu-ai-act'
href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc/acm-consultation-submission-2026---digital-omnibus-on-ai-regulation-proposal.pdf'
---

January 2026

COMMENTS IN RESPONSE TO
EUROPEAN COMMISSION CALL FOR EVIDENCE SURVEY
ON THE “DIGITAL OMNIBUS ON AI REGULATION PROPOSAL”
Gaston Besanson
Universidad Torcuato Di
Tella

Maciej Zuziak
National Research Council
of Italy

Francisco Mederios
F.M. Consult

Tom Romanoff
Association for Computing
Machinery

Alejandro Saucedo
The Institute for Ethical AI &
Machine Learning

The Association for Computing Machinery (ACM) is the world’s longest-established
professional society of individuals involved in all aspects of Computing. It annually bestows
the ACM A.M. Turing Award, often popularly referred to as the “Nobel Prize of Computing.”
ACM’s Europe Technology Policy Committee (“Europe TPC”) is charged with and committed
to providing policymakers and the general public with sound technical information in support
of sound public policymaking. Europe TPC has responded to the European Union stakeholder
consultations in the past in the context of the AI Act1, the Data Act2, the Digital Services Act34,
the Digital Citizen Principles5, and the Cyber Resilience Act6, amongst others7. ACM and
Europe TPC are non-profit, non-political, and non-lobbying organisations.
Europe TPC is pleased to respond to the European Commission’s call for evidence launched
on 13 November 2024 on the European Union’s “Digital Omnibus on AI Regulation
Proposal”. Europe TPC supports the European Commission’s intent on refining the regulatory
framework to ensure legal certainty and safety while fostering a competitive environment for
innovation. Notwithstanding this general support, EuropeTPC would like to put forward a set
of recommendations for eight articles in the proposal.

https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-ai-consultation.pdf
https://www.acm.org/binaries/content/assets/public-policy/acm-eur-tpc-data-act-comments-13may22a.pdf
https://www.acm.org/binaries/content/assets/public-policy/europetpc-digital-services-act-comments.pdf
https://www.acm.org/binaries/content/assets/public-policy/acm-europe-tpc-dsa-comments.pdf
https://www.acm.org/binaries/content/assets/public-policy/europetpc-comments-digital-principles.pdf
https://www.acm.org/binaries/content/assets/public-policy/acm-europe-tpc-cyber-reslience-comments-pdf
https://www.acm.org/public-policy/public-policy-statements

Article 4a: Bias Detection and the Synthetic Data Hierarchy
Article 4a provides welcome legal clarity for a policy that encompasses processing sensitive
data for bias detection. However, two sub-provisions require technical refinement.
● The Synthetic Data Limitation
Article 4a(1)(a) mandates that sensitive data processing is permissible only when bias
detection “cannot be effectively fulfilled by processing other data, including synthetic or
anonymised data”. This creates an implicit hierarchy that ignores the lack of statistical
independence.
Synthetic datasets are generated from learned distributions. If the source model encodes
intersectional biases, the synthetic data inherits them. Furthermore, it may mask the biases
by smoothing statistical anomalies that would be visible in real distributions.
For safety-critical bias testing, synthetic data serves as a supplement for stress-testing edge
cases, not a substitute for validation against ground-truth distributions. The current wording
could be interpreted to require that providers first attempt synthetic data approaches,
document their inadequacy, and only then access real data—a procedural burden that delays
legitimate safety work without improving outcomes.
Proposed refinement: Replace the hierarchy with a risk-proportionate standard: "Providers
shall justify the categories of data processed based on the specific bias risks identified,
documenting why alternative approaches would be insufficient for the detection methodology
employed.”
● The Privacy-Utility Trade-off
Article 4a(1)(b) requires “state-of-the-art security and privacy-preserving measures” without
acknowledging the mathematical constraints this creates. Privacy-preserving techniques like
Differential Privacy rely on injecting calibrated noise. As epsilon values decrease (stronger
privacy), statistical power to detect fine-grained bias degrades predictably.
This is not an implementation gap; it is a mathematical property. If the regulation demands
maximum privacy without flexibility, it may render compliant bias detection statistically
meaningless.
Proposed refinement: Require providers to document the privacy-utility trade-off explicitly,
specifying acceptable confidence intervals for bias detection given the privacy parameters
employed. This shifts to a transparent calibration.

Article 6(4): Defining “Narrow” in an Era of General-Purpose (or Frontier) Models
Article 6(4) permits providers to exempt systems from high-risk classification when they
perform only “narrow or procedural tasks”. This sounds positive, but the definition
mechanism is technically fragile.
For example, a large language model deployed for "narrow" invoice processing retains latent
capabilities far beyond that task. Behaviors can push systems outside their intended scope
without any change to the underlying model.
Proposed refinement: Require both architectural and operational constraints for the
exemption. Systems claiming “narrow” status should demonstrate: (1) technical guardrails
limiting output space, (2) runtime monitoring for out-of-distribution inputs, and (3) periodic
re-validation that actual use matches intended scope. This acknowledges that narrowness is
maintained rather than merely declared.
Article 11(1): Simplification Without Sacrificing Auditability
This article introduces “simplified technical documentation” for Small and Medium
Enterprises (SMEs), a pragmatic accommodation that recognizes compliance costs can be
disproportionate barriers for SMEs and start-ups.
The risk lies in interpretation: if “simplified” is understood to mean reduced technical depth
rather than streamlined reporting format, safety verification becomes impossible. Certain
artifacts are irreducible for a meaningful audit. Without these, no external party can assess
whether a system is safe, regardless of the deployer’s size.
Proposed refinement: The article should explicitly state that simplification applies to
administrative format and reporting frequency, not to the underlying technical records that
must be maintained.
Article 50(7): Code of Practice for Detection, Marking and Labelling of Artificially
Generated or Manipulated Content.
Europe TPC acknowledges that the successful detection, marking, and labelling of artificially
generated or manipulated content requires a standardised assessment framework. Hence,
the changes to Article 50(7) are beneficial for designing a system in which such content is
realistically detectable. However, there are a few essential elements that those codes of
practice should incorporate, and they should be reflected in Article 50(7).
The current state of the art does not provide clear guarantees that the detection and marking
techniques will be universally robust in the future, and it may be necessary to quantify the
level of uncertainty associated with them. Because of that, the code of practice mentioned in
article 50(7) should at least require AI providers to include: a) the type of watermarking that
is used for a specific model, b) the robustness of the solution as assessed in the appropriate
testing phase against a specific type of removal attacks, c) all the related metrics that are

obtained during that testing phase (including accuracy, sensitivity and specificity of a
detection) and d) all the relevant information that is needed for performing a proper
detection (if the method relies on them).
We also acknowledge that disclosing certain types of information may make the labelling
method more susceptible to removal attacks (since it provides a potential attacker with
additional information). In this sense, the code of practice should allow the provider to keep
specific details confidential and encourage reporting only information that does not pose a
risk to the labelling or detection method itself.
Proposed refinement: Codes of practice mentioned in Article 50(7) should include a minimum
standardised content harmonised across the European Union. This minimal standardised
content should encourage providers to disclose certain fundamental information about the
labelling and detection techniques used, which is essential for comparing and evaluating their
effectiveness and for understanding the probability that a given type of content was generated
or tampered with. The AI Office should be responsible for evaluating the consistency and
comparability of already-deployed codes of practice
Article 56(6): General Codes of Practice.
Similar to the previous recommendation, Europe TPC highlights that for the codes of practice
to be beneficial for general AI safety, they should adhere to a unified reporting framework,
enabling comparison of certain aspects of reported systems. The updated version of Article
56(6) should also place greater emphasis on this aspect, ensuring that risks are reported in an
interpretable and comparable manner.
Proposed refinement: In addition to their current responsibilities, the Commission and the
Board shall regularly review the level of standardisation across published codes of practice
and take all necessary actions to achieve a universal, standardised format that may enable
the quantification of systematic risks. Codes of Practice should place particular emphasis on
objectives and verifiable metrics (e.g., training and testing metrics, probabilities associated
with specific types of systematic risks, and related confidence intervals) that would enable a
systematic review.
Articles 60 & 60a: Protocols for Real-World Testing
Expanding real-world testing provisions is essential. Simulation has limits; automotive,
robotics, and medical AI systems ultimately require validation in physical environments.
Articles 60 and 60a recognize this reality.
The gap is procedural specificity. Testing stochastic systems in uncontrolled environments
creates physical risk that “cooperation with authorities” cannot adequately address.
Proposed refinement: Mandate that real-world testing plans include: (1) deterministic
override mechanisms (hardware kill switches), (2) continuous monitoring for distribution drift
with predefined abort thresholds, and (3) incident reporting timelines measured in hours, not

days. These are established practices in safety-critical domains; the regulation should codify
them.
Article 63(1): Relaxed Requirements of Quality Management System for SMEs
Europe TPC acknowledges the need to relax certain types of compliance requirements for
SMEs, including start-ups. Otherwise, those entities may face disproportionate regulatory
burden, making them unable to compete in a free market. However, it could be helpful and
desirable for SMEs and start-ups to comply with a set of minimum requirements when
designing a quality management system. The current wording of Article 63(1) indicates that
they may comply in a ‘simplified manner’, without defining the simplified manner explicitly.
This may result in either SMEs creating overly complicated documentation and assessment
procedures that incur unnecessary costs, or in the implementation of inadequate quality
management systems that do not provide sufficient protection and are impossible to audit
due to many omissions and a lack of satisfactory depth of technical detail.
Proposed refinement: Specify the minimal set of requirements (if any) with which SMEs should
comply when designing a quality management system pursuant to Article 63(1).
Article 111(4): The Watermarking Timeline
This article requires that generative AI providers ensure synthetic content is “marked and
detectable” by February 2027.
This mandate assumes technical progress that is not guaranteed. Current watermarking
techniques for text are not robust against basic adversarial operations. Image watermarking
is more mature but still vulnerable to transformations.
The timeline creates a compliance requirement that engineers cannot meet in practice with
available technology. This does not mean the goal is wrong -content provenance is a
legitimate concern- but the mechanism needs adjustment.
Proposed refinement: Replace the detectability mandate with a provenance standard: require
providers to implement machine-readable metadata and disclose the detection accuracy of
any watermarking employed, including false positive/negative rates under specified
adversarial conditions. Set detectability targets as aspirational benchmarks to be reviewed in
2027, not compliance mandates.
