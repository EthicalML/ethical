PROPOSAL — for owner review (regenerated 2026-07-28 against current homepage)

# Homepage copy sheet

Regenerated in full against the current render of `src/pages/index.mdx` and the data files it consumes (`stats.json`, `projects.json`, `home-reports.json`, `network.json`, `network-sectors.json`, `newsletter-issues.json`, `footer.json`, `site.json`, `affiliations.json`, `talks.json`). The previous version of this sheet described a subtitle ("Advocating for the safe and aligned development of AI…") that no longer exists on the page — it has been replaced by the owner-ratified mission line and typewriter treatment. Per section: **CURRENT** (quoted as rendered today) · **STATUS** (ratified / style-swept draft / placeholder-flagged) · **PROPOSED** (a genuine improvement under the binding style rules, or "no change proposed"). ⚠ = unverified number — do not ship without owner confirmation.

## Hero — status pill, headline, mission typewriter, buttons
| CURRENT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | STATUS                                                                                                                                                                                                                                                                                                                                  | PROPOSED                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Status pill: "NINTH PRINCIPLE ADDED — ALIGNMENT WITH INTENT". Headline: "The Institute" / "for Ethical AI" / "Alignment & Safety" (third line rendered as glitch/em accent). Mission typewriter, two static lines + rotating third line: "We are an independent research institute with a mission to / ensure that frontier AI is safe, aligned and accountable to" + rotating beneficiary (initial: "people and society."). Rotation list: people and society · the people who use it · the teams who deploy it · the public · future generations · everyone it touches. Buttons: "Join the network" (`#join`) / "Contact us" (`#contact`). | Mission line + beneficiary rotation: **ratified** (owner, 2026-07-27), verbatim and matching the approved interactive spec exactly, including region-free wording. Status pill, headline, buttons: style-swept draft, not separately ratified but compliant with the binding rules — factual, no banned vocabulary, no invented claims. | No change proposed. The mission line and rotation must not be touched — they are the ratified text. The status pill is a factual, dated claim ("ninth principle added") rather than a marketing device; confirm it stays accurate as the principle set evolves, but no rewording is needed now. Headline and button labels are plain and additive; no rework meets the bar. |
Change: I don't like the current status pill being "ninth principle". Give me a few options of what we can do here. 
## Evidence stat band
| CURRENT | STATUS | PROPOSED |
| --- | --- | --- |
| Five tiles: `09 RESPONSIBLE AI PRINCIPLES` · `393 NEWSLETTER ISSUES PUBLISHED` ⚠ · `70k+ ML PRACTITIONERS REACHED` ⚠ · `10k+ GITHUB STARS, OSS ECOSYSTEM` ⚠ · `2 STATE OF PRODUCTION ML REPORTS`. | Style-swept draft. Labels are plain and factual (no banned vocabulary). "09" and "2" are structural counts the site itself defines; the other three are illustrative figures carried from the prototype, still unverified. | No change proposed to wording or structure. **Unverified, must be confirmed or removed before ship:** issue count (393 — cross-check against the real current newsletter issue number, not the prototype figure), "70k+" subscriber/reach figure, "10k+" GitHub-stars figure. If any cannot be confirmed by ship, drop that tile rather than assert a number. |
Change: this is fine. Chnages are github stars as 20k+ stars. What can we replace production ML reports with? Give me options.
## Affiliations marquee
| CURRENT | STATUS | PROPOSED |
| --- | --- | --- |
| Eyebrow "MEMBERSHIPS, ADVISORY ROLES & STANDARDS COLLABORATIONS". Items (name — role): UNITED NATIONS — AI EXPERT; UN CSTD — CHAIR, COMMITTEE; EUROPEAN COMMISSION — APPOINTED EXPERT; ACM — GOVERNING BOARD; LINUX FOUNDATION — ASSOCIATE MEMBER; OWASP — MLSECOPS COLLABORATION; IEEE — AI STANDARDS GROUP; ISO/IEC — AI STANDARDS GROUP; NUMFOCUS — CONTRIBUTION; TUM/TUM IEAI — SPEAKER SERIES. | Style-swept draft. Eyebrow and format are neutral and factual. Every specific role/title is flagged in `01-voice-and-messaging.md` §5 as requiring owner verification of current-ness (many read as present-tense offices that may be historical). | No change proposed to structure or eyebrow. **Every role line is unverified and must be confirmed as current before ship.** Where a title has lapsed, reword to a non-office, collaboration-only form (e.g. "STANDARDS COLLABORATION" instead of a specific chair/board title) per the "no affiliation inflation" rule — state collaboration, not endorsement. Do not add member logos until licensing is cleared (separate open item, not a copy question). |
No change.
## Four-phase strategy
| CURRENT | STATUS | PROPOSED |
| --- | --- | --- |
| Eyebrow "01 — THE FOUR-PHASE RESPONSIBLE AI STRATEGY". Heading "From individual practice to national regulation." Cards: 01/EMPOWERING INDIVIDUALS — By Principle (Best practices; Applied principles; Personal and professional commitments); 02/EMPOWERING ORGANISATIONS — By Process (Practical industry frameworks; Applied guides; Principles translated into implementation); 03/EMPOWERING INDUSTRIES — By Standards (Technical and industry standards; Standards bodies engagement; Cross-industry initiatives); 04/EMPOWERING NATIONS — By Regulation (Policy and regulatory work; Public frameworks and requirements; International governance). | Ratified-equivalent: carried verbatim from the master homepage's four-phase model, which `01-voice-and-messaging.md` §3 treats as established IP. "Empowering" is the one word on the banned-adjacent list explicitly grandfathered in these four labels. | No change proposed. This is the strongest existing asset on the page — factual, additive, no banned constructions outside the sanctioned "Empowering" exception. |
Change: Add a full stop on every line, including the title. 
## Principles section (explorer intro labels)
| CURRENT | STATUS | PROPOSED |
| --- | --- | --- |
| Eyebrow "02 — THE NINE RESPONSIBLE AI PRINCIPLES". Heading "A framework for evaluating AI systems." Intro "Each principle specifies a commitment, the failure modes it addresses and the controls that implement it." | Style-swept draft. Compliant: neutral register, no banned vocabulary, describes the explorer's actual card model (commitment / failure modes / controls) accurately. | No change proposed. Heading and intro are already additive and precise; individual principle card bodies (commitment/failure-modes/controls text) are governed separately by `11-sheet-principles.md`, not this sheet. |
Change: Let's rename to "Principles for Align & Safe AI". And title should be "Nine Principles to Ensure Alignment and Safety in AI Systems."
Subtitle: "Each principle... + We invite both individuals and organisations can pledge towards these principles."

Principles content should becovered in principles. ANd reflected back.
## Open-source cards (section 03)
| CURRENT | STATUS | PROPOSED |
| --- | --- | --- |
| Section: "03 — OPEN SOURCE & TOOLS" / "Open-source infrastructure for implementing the principles." **Kompute** — "Cross-vendor GPU computing"; "Kompute provides portable GPU compute across hardware vendors. The project is maintained in the open alongside Linux Foundation AI & Data and NumFOCUS."; metrics 2.1k stars ⚠ / 38 contributors ⚠ / 160+ releases ⚠ / Apache-2.0. **XAI** (badge ALPHA) — "XAI Explainability Framework"; "Explainability and bias mitigation across three stages, combining technical tools with the organisational processes around them."; 3-stage pipeline (Data analysis, Model evaluation, Production monitoring); stats 1.4k stars ⚠ / 21 contributors ⚠ / "ALPHA — ACTIVE". **Production ML list** — "Production ML open-source list"; "The community-maintained catalogue of production ML and MLOps tooling, curated weekly."; stats 10.2k stars ⚠ / 230+ contributors ⚠ / 260 tools tracked ⚠. **KAOS** (badge NEW) — "K8s Agent OS (KAOS)"; "An open-source control plane for running autonomous agents under operational constraints. It provides scoped credentials, sandboxed execution, budget and time-horizon limits, human approval gates and a replayable audit trail. These controls implement Principle 09 in the infrastructure."; 6 capability rows; stats EARLY ACCESS / 9 contributors ⚠ / Apache-2.0 / K8s 1.29+. | Style-swept draft. Section heading and all four card descriptions are compliant — plain, additive, verb-of-assurance register ("provides", "implements"), and the KAOS→Principle-09 link is a real, useful cross-reference. Every per-project count (stars, contributors, releases, tools tracked) is carried from the prototype as illustrative and remains unverified. Status badges (ALPHA, EARLY ACCESS, NEW) read as literal ship-status claims. | No change proposed to section heading, card titles, descriptions or the Principle-09 cross-reference — they meet the bar as written. **Replace every star/contributor/release/tool-tracked count with the real current figure pulled from each repo, or remove that metric row entirely rather than ship a guessed number.** Confirm ALPHA (XAI) and EARLY ACCESS (KAOS) are still literally true ship states before ship; "NEW" on KAOS should be time-boxed or dropped once the project is no longer new. |
Change:
* Remove early access for KAOS and remove Alpha for KAOS.
* The text "View Kompute on GitHub →kompute.cc ↗" looks terrible. Let's update it to a standard button.
* Kompute: The tagline in the repo is "General purpose GPU compute framework built on Vulkan to support 1000s of cross vendor graphics cards (AMD, Qualcomm, NVIDIA & friends). Blazing fast, mobile-enabled, asynchronous and optimized for advanced GPU data processing usecases. Backed by the Linux Foundation" - here we can take a subset. We can mention: The Institute donated Kompute to The Linux Foundation on 2021; we can also link: https://lfaidata.foundation/blog/2021/08/26/kompute-joins-lf-ai-data-as-new-sandbox-project/. Also it has 2.5k stars, 38 contributors. 197 forks. about 1.5k contributions.
* Overall ti seems everything is being guessed here. YOU have access to github. fetch the data.


## Reports & data (section 04)
| CURRENT | STATUS | PROPOSED |
| --- | --- | --- |
| Eyebrow "04 — REPORTS, DATA & INITIATIVES". Title "The State of Production ML". Intro "Two annual practitioner surveys — context, tools, scope and statistics. Choose a question, compare 2024 with 2025, and select any answer to read what it means for the principles." Buttons: "Read the 2025 report" / "2024 edition" (both → `/data/survey-explorer/`). Side card A — "AI-RFX Procurement Framework": "Open-source RFP and tender templates for organisations procuring, building or deploying AI. The templates define safety, quality and technical-maturity criteria for the model and its surrounding system." (8/8 maturity-model criteria list, mapped to principles P01–P08). Side card B — "MLSecOps Top 10": "A vulnerability taxonomy for the machine-learning lifecycle, with flawed-ML case studies and mitigations — developed alongside Linux Foundation Trusted AI work." (7 of 10 OWASP↔MLSecOps rows shown). | Style-swept draft. All copy is neutral, factual and additive; no banned vocabulary. Substance (survey existence, MMM criteria, MLSecOps taxonomy) is real, not invented. One structural note, not a wording issue: "2024 edition" and "Read the 2025 report" both point to the same `/data/survey-explorer/` href — worth confirming that's intentional (explorer handles both years internally) rather than a broken link. | No change proposed to any prose. Two non-copy items to flag for the owner/engineering, not this sheet: (1) confirm the shared href above is intentional; (2) the MLSecOps card shows 7 of 10 rows as a homepage teaser — acceptable here, but the full framework page must carry all 10 rows, and this sheet does not cover that page. |
Change:
* Remove "Data", let's update it to Reports & Initiatives".
* On MLSecOps I am remembering we established the ML Security Committee in the Linux Foundation https://lfaidata.foundation/groups/security-compliance-work-group/. Here's another article: https://lfaidata.foundation/blog/2023/06/15/machine-learning-system-security-risks-best-practices/ - I also esablished a joint partnership with OSSF and LF AI & Data. Also we are activng reviewers for the OWASP agentic work, so this should be referenced as well; that way we can have a section on security overall.
* On the survey - is the data correct? It is static so I do like that we are having a preview here (althouhg it's the full dataset pretty much which is also cool).

## Network + form (section 05)
| CURRENT | STATUS | PROPOSED |
| --- | --- | --- |
| Eyebrow "05 — NETWORK & NEWSLETTER". Heading "A practitioner network for ethical AI". Intro "Responsible technology requires changes to models and to the systems around them. Membership includes the Ethical AI Network and the Machine Learning Engineer newsletter." Stats: 1,034 NETWORK MEMBERS ⚠ · 70,412 NEWSLETTER SUBSCRIBERS ⚠ · 393 ISSUES PUBLISHED ⚠. Sector breakdown (WHO IS HERE): Universities & research 24%, Technology companies 22%, Financial services 17%, Government & public bodies 14%, Startups & scale-ups 13% ⚠ (rows do not sum to 100%). Recent issues list: #393–#390 with titles ⚠. Form: eyebrow "ONE FORM", title "Join, subscribe or get in touch", fields (Name, Email, Organisation & role), interest checkboxes (Join the Ethical AI Network; Subscribe to the ML Engineer newsletter; Request the AI-RFX materials or a collaboration), button "Send", disclaimer "We only use your details to reply and to send what you asked for. Unsubscribe any time." | Style-swept draft. Heading, intro, form copy and disclaimer are compliant — plain, additive, no banned vocabulary, no overreach ("requires changes to models and to the systems around them" is a scoped, defensible claim, not a solved-problem claim). All numeric content (member/subscriber/issue counts, sector percentages, individual issue numbers and titles) is carried from the prototype as illustrative and unverified. | No change proposed to heading, intro, form fields, checkboxes, button or disclaimer. **Unverified, must be confirmed or removed before ship:** network members (1,034), newsletter subscribers (70,412), issues published (393 — must match the real current issue count, not the prototype figure), all five sector percentages (note they sum to 90%, not 100% — check whether a category is missing or the set is intentionally partial), and the four listed issue numbers/titles (#393–#390). |
Changes: The form shoultn' have "Join", but "Apply to join". You need to see the contents of the public form (pasted below). I like that the form is currently quite small and simple, perhaps we can keep it as simple as Name, Email, Content. And if they tick "Apply to join", then we likely should kick off a modal or add extra fields. Actually, no, we dont need that much complexity. We can just have Name, then to the right it could be email, then below Organisation & role full width. And then another full with "Furtehr information", which can by default still be the same size input to avoid increasing the size of the form. I like that it's small. And then if they tick "Apply to join", the help text could also read "please provide enough information to consider your application".

On the title on the left, the title should be, "Contact us, subscribe to the newsletter or apply to the network."

Full form content:

The Institute for Ethical AI & Machine Learning

Get in touch, inquire for speaking opportunities, apply or request access to our work

axsauze@gmail.com [Switch account](https://accounts.google.com/AccountChooser?continue=https://docs.google.com/forms/d/e/1FAIpQLScLmKLxQ8s5nv1xlgID08xPEhlcaigWBGg1qUU1hozqXG2v-w/viewform?embedded%3Dtrue&service=wise)

Not shared

* Indicates required question

You can find our privacy policy at [http://ethical.institute/privacypolicy.html](http://ethical.institute/privacypolicy.html). We ensure all the GDPR rights are provided, including the right to rectification, right to be forgotten, right to portability, right to object, and right of access. As the privacy policy states, you can send an email to a@ethical.institute at any time to update or remove your information.

Main reason*

I want to apply to join the Ethical ML Network

I want to get access to the AI-RFX Framework

I want to inquire about keynote / speaking opportunities

Other:

First name*

Last name*

Email Address*

Do you you want to submit this request as an individual or as a representative of your company?*

As an individual that doesn't represent your company

As a representative of your company

What company do you work at?*

What is your position at the company?*

Please provide any further information (e.g. reason for contact, motivation to join the network, background, links to linkedin/github, etc)*
## Footnote band
| CURRENT | STATUS | PROPOSED |
| --- | --- | --- |
| About column — eyebrow "ABOUT THE INSTITUTE", text "An independent research institute working to ensure that frontier AI is safe, aligned and accountable to people and society.", standards chips: ISO/IEC AI standards, IEEE AI standards, ACM technology policy, Linux Foundation AI & Data, European Commission, United Nations. Talks column — eyebrow "TALKS & KEYNOTES", four entries (NeurIPS 2023 Workshop keynote; NeurIPS 2022 — machine learning security; KubeCon Europe — ML evaluation at scale; PyCon keynote — monitoring, drift and explainability). Elsewhere column — eyebrow "ELSEWHERE", links: GitHub, LinkedIn, YouTube, Contact the Institute. | About text: **ratified-equivalent** — a direct, faithful restatement of the ratified mission line, same substance, no drift. Standards chips and Elsewhere links: style-swept draft, compliant (plain labels, no claims of active office). Talks list: style-swept draft; entries are event/title claims, unverified as to whether all four are still the right/current representative set. | No change proposed to the about text, standards-chip labels, or Elsewhere links. **Talks list is placeholder-flagged for currency, not wording**: confirm each of the four talks is real, correctly dated and still the set the Institute wants to lead with (a 2022/2023 keynote list may need refreshing with more recent talks by ship time) — no rewording needed once the entries are confirmed. |
Change: I would like to understand what are options to put under the institute mission, as currently reads "ISO/IEC AI standards
IEEE AI standards
ACM technology policy
Linux Foundation AI & Data
European Commission
United Nations" - which seems a bit random. What is this supposed to be? Maybe it's ok. Give me a few options.

For the talks section, I'd like to indeed have a few highlighted, and then a link to my full playlist of talks: https://www.youtube.com/watch?v=v2LENQOG-Xg&list=PL7F3ZwS1Ae8UJIbFB_yBFUSe3cNtpZObi

Make a note of this playlist as we will likely be using ti to fetch all the talks available, and make a section potentially on all the highighted talks, etc. 
## Footer
| CURRENT | STATUS | PROPOSED |
| --- | --- | --- |
| Identity: "ETHICAL.INSTITUTE — THE INSTITUTE FOR ETHICAL AI ALIGNMENT & SAFETY". Legal: "© 2026 — OPEN SOURCE, CC BY-SA WHERE APPLICABLE". (Meta description, used site-wide including this page: "An independent research institute working to ensure that frontier AI is safe, aligned and accountable to people and society.") | Ratified-equivalent: identity/legal lines are plain factual statements; meta description is the ratified mission line verbatim, no legacy-identity leakage (no "& Machine Learning", no "(BETA)", no "Ethical ML"/"IEML"). | No change proposed. One non-wording item to flag: confirm the "CC BY-SA where applicable" licence claim is accurate for the site's actual content before ship — this is a factual/legal check, not a copy question. |
ok.