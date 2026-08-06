---
title: 'Comments on the proposed AI Act'
date: '5 AUG 2021'
track: 'eu-ai-act'
href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-ai-consultation.pdf'
---

5 August 2021

COMMENTS ON A
“PROPOSAL FOR A REGULATION OF THE EUROPEAN PARLIAMENT AND OF THE
COUNCIL LAYING DOWN HARMONISED RULES ON ARTIFICIAL INTELLIGENCE”
BY THE
EUROPE TECHNOLOGY POLICY COMMITTEE
OF THE
ASSOCIATION FOR COMPUTING MACHINERY
The Association for Computing Machinery (ACM) is the world’s largest and longest
established professional society of individuals involved in all aspects of computing. It annually bestows the ACM A.M. Turing Award, often popularly referred to as the “Nobel Prize of
computing.” ACM’s Europe Technology Policy Committee (“Europe TPC”) is charged with
and committed to providing objective technical information to policy makers and the general public in the service of sound public policy formation. ACM and Europe TPC are nonprofit, non-political, and non-lobbying organizations.
Europe TPC is pleased to provide the following “feedback,”1 as invited by the European Commission, on the pending Proposal for a Regulation of the European Parliament and
of the Council Laying Down Harmonised Rules on Artificial Intelligence (Proposal).2

GENERAL OBSERVATIONS
Europe TPC supports the intent of the proposed AI Regulation to set harmonised rules
for the development, placement on the market, and use of AI systems in the European Union
following a proportionate risk-based approach that would most regulate the use of AI systems which pose significant risks to the health, safety, or fundamental rights of individuals.
The Proposal, however, raises several significant technical concerns detailed below as
“Specific Comments.” Europe TPC first wishes to highlight in broad terms that:

1. The Proposal’s definition of high-risk systems would benefit from a more precise
   definition of the risk hierarchy (see discussion of Articles 6 and 7, below);

The principal authors of this document for ACM’s Europe Technology Policy Committee are: Alejandro
Saucedo, Engineering Director at Seldon Technologies and Chief Scientist at Institute for Ethical AI & Machine
Learning; and Chris Hankin, Fellow of the Institute for Security Science and Technology and Professor of
Computing Science at Imperial College, London. Also contributing were: Oliver Grau, Principal Investigator
at Intel Corporation; Dame Wendy Hall, Regius Professor of Computer Science, University of Southampton;
Andrew McGettrick, Professor Emeritus of Computer and Information Sciences, University of Strathclyde;
Enrico Nardelli, Professor in Informatics at Università di Roma; Gerhard Schimpf, Senior Manager at SMF Management Consulting - Pforzheim; Gurkan Solmaz, Senior Researcher at NEC Laboratories Europe; and Julie
Williamson, Lecturer in Human Computer Interaction, University of Glasgow. (NOTE: All affiliations above are
listed for identification purposes only.)

European Commission Document 2021/0106 (COD), released 21 April 2021. [https://eur-lex.europa.eu/legalcontent/EN/TXT/HTML/?uri=CELEX:52021PC0206&from=EN]

2. The proposed regulation incorporates technical computer science and mathematical
   terms without formally defining them. Such imprecision may lead to counterproductive ambiguity in their interpretation and inconsistency in their application. In addition, the Proposal’s treatment of “health and safety” issues is generic rather than
   based, as would be advisable, on the highly evolved technical discipline of Safety
   Assurance (see discussion of Article 15, below);
3. Final regulations to be adopted by the co-legislators must in multiple ways fully
   respect personal privacy, affording at minimum the full protections mandated by all
   other applicable current law or regulation (including the General Data Protection
   Regulation). Protections afforded by the Proposal also must, in Europe TPC’s view,
   expressly include constraints on continuous data collection in public contexts (see
   discussion of Article 52, below); and
4. While constructively calling on all Member States to have a sufficiently large workforce expert in AI and many other related matters, the Proposal does not concretely
   address or enable the forms of education necessary to create such a highly skilled
   and appropriately diverse population (see discussion of Article 59, below).

SPECIFIC COMMENTS
Article 5 – Biometric Identification Systems
With respect to the issue of real-time, remote biometric identification systems, we
commend to the Commission the principles identified in the recent Statement on Principles
and Prerequisites for the Development, Evaluation and Use of Unbiased Facial Recognition
Technologies.3
Articles 6 & 7 – Classification and Definition of High-Risk Systems
The definition of high-risk AI systems appears to be comprehensive but may not be
fully future-proof in that it may not permit a would-be AI developer to assess whether a
given new system would fall within the definition. Europe TPC thus recommends that this
Article (and Annexes II and III) be supplemented by a more precise definition of the intended risk hierarchy to be applied as designs and technologies evolve.4
Article 10 – Data and Data Governance
The Proposal requires that datasets used in training, testing, and validation be “relevant, representative, free of errors and complete.” These concepts also should be defined
further to provide more meaningful and effective guidance.

This Statement was produced by ACM’s U.S. Technology Policy Committee. While Europe TPC approves of its
Principles, the Committee has not taken a position on its core recommendation of a temporary moratorium on
the deployment of facial recognition systems by governments and industry until they can reliably be made
sufficiently unbiased.

Europe TPC recognizes that proposed Article 7 partially addresses this concern but considers its present
wording insufficiently clear.

Article 15 – Accuracy, Robustness and Cybersecurity
Europe TPC notes that the Proposal appropriately considers “health” and “safety”
matters to which the use of AI and autonomous systems may give rise. It does so, however,
only in the most general and colloquial senses. Europe TPC strongly recommends that the
Commission carefully study the established discipline of Safety Assurance with the express
objective of “importing” such concepts, terminology, and methodologies from it (and its
many present applications) as may be appropriate and useful in addressing AI systems of all
kinds and their potential impacts.5
Terms such as “robustness” and “accuracy” as employed in Article 15 also must be
carefully defined, rather than left to self-definition by system providers. Rather, the Commission may wish to adopt or endorse accepted concepts and terms used to define security
levels in an established standard, e.g., ISA/IEC 62443.6
In addition, Europe TPC encourages the Commission to modify Article 15 (and potentially other germane parts of the Proposal)7 to effectively regulate the use of AI systems which
– although initially tested, verified, and certified – by design will continue to “learn” and
modify themselves after their initial approval and deployment. There is an ongoing risk,
therefore, that the performance of such AI systems may degrade over time or be otherwise
volatile. Malicious action, intended to produce such maladaptive modifications with the
intent to produce harm, is of particular concern. The Proposal thus should directly address
mechanisms for detecting and remedying such “operational divergence” in previously
approved self-modifying AI systems.
Europe TPC notes that once a particular system is approved, it also will be essential to
regulate the process of evaluating and approving updates to the software that controls it
and, per above, detecting potentially undesirable or harmful software-generated operational
divergence. Such processes must be as rigorous as those established for initial system approval, inspection, testing and/or certification.
Similarly, periodic security updates to autonomous control system software also are
certain to be required. Because such “fixes” may be urgent and matter of life and safety,
expedited but still rigorous valuation and approval processes must be designed for them.
While these issues may arise most conspicuously with respect to autonomous vehicles, they
also will need to be addressed in the context of many other less visible AI applications.
Article 40 – Harmonised Standards
Europe TPC agrees that devising standards for AI systems and publishing them alongside those of other “vertical” sectors (e.g., chemical substances, construction products, cosmetics) in the Official Journal of the European Union is appropriate and desirable. It suggests, however, that the creation and publication of standards “across” the AI sector also
may be productive. Such “horizontal” standards categories might include (but need not be
limited to) “AI algorithms,” “controller software,” and “training data.”

The automated driving industry has formalized these principles in standards ISO 26262-1:2018, “Road
vehicles - Functional safety” and draft ISO/DIS 21448, “Road vehicles - Safety of the intended functionality.”

See, https://www.isa.org/intech-home/2018/september-october/departments/new-standard-specifiessecurity-capabilities-for-c

The Commission may wish to expressly address responsibility for detecting operational divergence in Article
16 concerning human oversight of self-modifying AI systems.

Article 52 – Transparency Obligations and Data Collection
Data collection and processing in the context of high-risk AI systems present new
challenges for the protection of personal data, privacy, and an individual’s right to remain
anonymous. At minimum, therefore, any final regulations adopted by the co-legislators
must explicitly disclaim diminishing the privacy and other civil liberties protections afforded
by all other applicable current law or regulation, including particularly the General Data
Protection Regulation. Protections afforded by the Proposal also must in Europe TPC’s view
expressly include constraints on continuous data collection in public contexts.
The proposed Regulation also should include, but not be limited to prohibitions on:
non-consensual facial recognition; the storage of facial images; and the retention of other
personal data incidentally captured by an AI system but not critical to its safe and intended
operation. The operation of AI systems also must be transparent to all individuals (whether
targeted or indirectly observed) about whom data is recorded, processed, and/or stored
even when such data is collected for such benign purposes as assuring safety. Europe TPC
notes in this context that special consideration is likely to be necessary to address circumstances and needs that arise uniquely during autonomous vehicle operation.8
Article 53 – AI Regulatory Sandboxes
Given the intrinsic and desirable ability of AI systems to improve and evolve as new
relevant data is available for training, the proposed Sandboxes as implemented should be
designed to permit participants to ensure that AI systems under “regulatory trial” do not
change in ways that produce undesirable consequences.
Article 59 – National Authorities and Assuring AI Competence and Expertise
Europe TPC concurs with the Commission that it is important to recognize the alarming breadth of the current skills gap in relation to artificial intelligence and, with it, the
profound lack of diversity in the present AI workforce. It thus also strongly recommends that
the proposed regulation identify and enable steps both to define and bridge that gap and
remedy those disparities. To be truly effective, such steps must address all sectors of the
population. ACM, through its Europe Council, has teamed with three other respected
organizations9 to form the Informatics for All coalition (I4All), an initiative whose main
purpose is to give due recognition to Informatics as an essential foundational discipline for
education in the twenty-first century. As an element of the ACM Europe Council, Europe TPC
urges the Commission to draw fully upon I4All’s deep expertise in this area and to foster
development of a universal Informatics (including AI) curriculum to be deployed at all levels
of the European educational system.

For example, an automated vehicle continuously collects and processes data about natural persons external
to it to assure safe operation, but also may have the capacity to collect data from passengers. Humans outside
the vehicle have the right to remain anonymous in public spaces. Accordingly, applicable regulations should
prohibit the vehicle (or any device or person with access to its data) from subjecting such “outsiders” to facial
recognition or from storing data about that outside individual. Any data collection regarding passengers,
however, also must by regulation be transparent to them. Ideally, passengers would be given the ability to opt
out of any data collection. Further, if and when data is collected from passengers, Europe TPC recommends
that they should by law own that data and retain control over its use and retention.

They are: the International Federation for Information Processing, Technical Committee 3 (IFIP-TC3);
Informatics Europe; and the Council of European Professional Informatics Societies (CEPIS).

Article 69 – Codes of Conduct
Europe TPC welcomes the proposal to create codes of conduct for developers and
deployers of AI systems and commends two recent Europe TPC policy products to the Commission’s attention in this context: its Joint Statement on Algorithmic Transparency and
Accountability, and When Computers Decide: European Recommendations on MachineLearned Automated Decision Making white paper co-authored with Informatics Europe.
We also urge the Commission to consult for relevant precepts and practices the ACM
Code of Ethics and Professional Conduct. Revised in 2018 after a three-year and highly
collaborative international process, ACM’s benchmark Code and its precursors have guided
the work of professionals in all aspects of computing for 55 years.
Conclusion
ACM’s Europe Technology Policy Committee, and its thousands of expert European
members, stand ready to assist the Commission at any point in its further consideration of
the Proposal or otherwise with respect to technical matters implicating artificial intelligence,
machine learning, and all other aspects of computing. To request such technical, apolitical
and non-lobbying input, please contact ACM’s Director of Global Policy & Public Affairs,
Adam Eisgrau, at acmpo@acm.org or +1 202.580.6555.
