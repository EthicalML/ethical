PROPOSAL — for owner review

# Standards & policy cluster copy sheet — ISO/IEC · IEEE · ACM · Linux Foundation AI & Data · UN & UN CSTD · European Commission

Six pages under `/standards/*` and `/policy/*` (nav-proposal §3, Initiatives → Standards & policy). Per `00-content-audit.md` §B and the crawled-content inventory (§17–18): **"most of this broader standards portfolio is not currently surfaced comprehensively on the website itself"** and there is **"relatively little detailed standalone regulatory content."** The only existing anchor for all six is `src/data/affiliations.json` — a nine-line role list with zero supporting prose — plus scattered CV/newsletter mentions. Every page below is a scaffold; none can ship without owner-supplied current status and citable outputs.

## Cross-cutting findings
- `affiliations.json` is titled "MEMBERSHIPS, ADVISORY ROLES & STANDARDS COLLABORATIONS" and lists role labels only (e.g. "UN AI EXPERT", "ACM GOVERNING BOARD") — no dates, no scope, no output. Per `01-voice-and-messaging.md` §5: *"Role titles ... must be owner-verified as current; many are historical. State collaboration, not endorsement."* Treat every role below as **unverified until confirmed** — this is the single largest blocker for the whole cluster.
- OWASP and NumFOCUS appear in `affiliations.json` but are **not** in the nav-proposal's six standards/policy pages (nav lists ISO/IEC, IEEE, ACM, Linux Foundation AI & Data, UN & UN CSTD, European Commission only). OWASP is covered contextually inside `/frameworks/mlsecops` and `/research/ml-security`; NumFOCUS is a brief blurb candidate per the audit (§A) — flagging so nothing silently drops.
- Split per nav-proposal: ISO/IEC and IEEE sit under `/standards/*` (technical standards bodies); ACM, Linux Foundation, UN & UN CSTD, European Commission sit under `/policy/*` (professional/policy/regulatory bodies). This sheet follows that split.
- No page implies certification, formal membership status, or voting authority beyond what's confirmed — "collaboration" and "engagement," not "we are members of the governing body of X" unless verified.

---

## `/standards/iso-iec`

**Proposed structure:** role statement · what ISO/IEC AI standards work covers (scope, not the Institute's specific contribution until confirmed) · related Institute work (AI-RFX, MLMM as the practical counterpart to formal standards) · status note.

**Draft framing copy:**
> [OWNER: confirm current role — "AI STANDARDS GROUP" per internal records] ISO/IEC's AI standards work sets the formal, cross-industry baseline for how AI systems are assessed and governed. The Institute's practical frameworks — AI-RFX, the ML Maturity Model — are built to be compatible with that baseline rather than to replace it: where ISO/IEC defines the standard, our frameworks are one way to operationalise it inside an organisation's own procurement and development process.

**Owner questions:**
- What is the current status of the ISO/IEC role — active working-group membership, past contribution, informal engagement? `affiliations.json` says only "AI STANDARDS GROUP."
- Which specific ISO/IEC standard(s) or working group (e.g. ISO/IEC JTC 1/SC 42) is this — needed to make the page concrete rather than generic.
- Any citable output — a submitted comment, a contribution credited in a published standard, a committee role with a public roster entry?
- Is this a personal role (the Board/NED) or an institutional one — affects whether the page can say "the Institute" or must say "our [role]."

---

## `/standards/ieee`

**Proposed structure:** role statement · what IEEE's AI standards group covers · related Institute work (P09/alignment evaluation, MLSecOps as the practical layer) · status note.

**Draft framing copy:**
> [OWNER: confirm current role — "AI STANDARDS GROUP" per internal records] IEEE's AI standards work is one of the more established channels [OWNER: confirm — crawled content notes the website "links to standards-related activity, particularly IEEE work" but with no detail on what that activity is]. [OWNER: what specific IEEE standard, working group or programme — e.g. IEEE 7000-series ethics standards — does this refer to?]

**Owner questions:**
- Same core question as ISO/IEC: current vs. historical, which specific working group/standard, and any citable output.
- The existing site links to "IEEE work" without specifying what — is there a URL, standard number, or committee name to anchor the page on?
- Should this page cross-reference the P09/alignment-science research area (IEEE has ethics/autonomous-systems standards work that could tie in), or keep strictly to the standards-body relationship?

---

## `/policy/acm`

**Proposed structure:** role statement · ACM's relevant work (Code of Ethics, technology policy) · related Institute work (the nine principles as a practitioner-facing counterpart to ACM's professional code) · status note.

**Draft framing copy:**
> [OWNER: confirm current role — "GOVERNING BOARD" per internal records, described only as "ACM" without specifying which board/committee] ACM's Code of Ethics and Professional Conduct and its technology-policy work set expectations for computing professionals broadly. The nine Responsible AI Principles are a narrower, ML-specific complement — commitments a practitioner or organisation can act on day to day, alongside the professional-conduct baseline ACM sets.

**Owner questions:**
- "GOVERNING BOARD" is a strong claim — governing board of what specifically (ACM itself, a SIG, a technology-policy committee)? This needs precision before it ships; "governing board" read generically implies ACM-wide governance.
- Is this role current? Per `01-voice-and-messaging.md` §5, this is explicitly flagged as needing verification.
- Any citable output — policy comments, committee minutes, published position the owner contributed to?

---

## `/policy/linux-foundation`

**Proposed structure:** role statement · Linux Foundation AI & Data scope (Trusted AI work, MLSecOps committee tie) · related Institute work (Kompute, MLSecOps, cross-vendor GPU) · status note.

**Draft framing copy:**
> [OWNER: confirm current role — "ASSOCIATE MEMBER" per internal records] The Institute's collaboration with Linux Foundation AI & Data runs through two open-source projects: Kompute, the cross-vendor GPU acceleration work maintained alongside LF AI & Data and NumFOCUS, and the MLSecOps Top 10, which was connected to LF's Trusted AI work and an ML-security committee. [OWNER: is Institute participation in that committee current?]

**Related work:** Kompute (`/open-source/kompute`) — the most concrete existing tie, already tagged "Linux Foundation AI & Data" in `projects.json`; MLSecOps Top 10 (`/frameworks/mlsecops`) — the committee connection.

**Owner questions:**
- Is "associate member" accurate and current, or was this a project-level (Kompute) affiliation rather than an institutional membership?
- Crawled content (§15) mentions "related Linux Foundation AI & Data committee leadership" from the CV — is there a named committee and role to cite specifically?
- Is the MLSecOps ↔ LF Trusted AI connection still active, or was it a past initiative? This is the strongest existing anchor for the page and needs a status check before publishing as present-tense.

---

## `/policy/un-cstd`

**Proposed structure:** two roles to disambiguate — "UNITED NATIONS, AI EXPERT" and "UN CSTD, CHAIR, COMMITTEE" are separate line items in `affiliations.json` — role statement for each · scope of UN/UN CSTD AI and data-governance work · related Institute work (four-phase strategy, Phase 4 "By Regulation") · status note.

**Draft framing copy:**
> [OWNER: confirm — two distinct roles on record: "AI expert" to the United Nations, and "chair" of a UN CSTD committee. Confirm both are current, and which committee the chair role refers to.] The United Nations' and UN Commission on Science and Technology for Development's AI and data-governance work sits at the "By Regulation" end of the Institute's four-phase strategy — the point where principle-level commitments are translated into public, national-scale frameworks. [OWNER: what specific contribution — a submitted paper, a chaired session, a published UN document — can this page cite?]

**Owner questions:**
- "CHAIR, COMMITTEE" is the highest-authority claim in the whole affiliations list and the vaguest — which committee, is the chairship current, and is there a public UN record (roster, meeting minutes, published output) to link to?
- Are "AI expert" and "CSTD chair" the same engagement or two separate ones — the page structure depends on this.
- This is the role most likely to need the most caution per `01-voice-and-messaging.md` §5 ("no affiliation inflation") — is the owner comfortable with a public page naming a UN chairship, or would they prefer a more conservative "contributed to" framing pending verification?

---

## `/policy/european-commission`

**Proposed structure:** role statement · scope (EC AI policy — AI Act, Data Act, Digital Services Act, Cyber Resilience Act, per CV per crawled content §18) · related Institute work (four-phase Phase 4, AI-RFX as a procurement-readiness tool ahead of regulation) · status note.

**Draft framing copy:**
> [OWNER: confirm current role — "APPOINTED EXPERT" per internal records] European Commission AI policy work — spanning the AI Act, Data Act, Digital Services Act and Cyber Resilience Act, per the owner's professional record — is substantially more developed than what's currently surfaced on the site (crawled content notes "relatively little detailed standalone regulatory content"). [OWNER: which specific appointment, expert group or consultation is this, and what output can be cited — a submitted response, a named expert-group membership, a published contribution?]

**Owner questions:**
- "Appointed expert" — appointed to what specifically (a named EC expert group, a consultation panel, an advisory body)? Needed to make the claim concrete and verifiable.
- Crawled content flags this as the biggest gap between what the CV claims and what the website shows — is there a document trail (an EC expert-group public register entry, a submitted consultation response) the owner can point to, or is this page better scoped narrowly until that exists?
- Is the appointment current, or was it time-bound (many EC expert groups have fixed terms)?

---

## Sequencing note
All six pages are blocked on the same input: a verified, dated status for each `affiliations.json` role plus at least one citable, linkable output per body. Until that lands, these pages cannot ship beyond this scaffold — publishing the draft framing copy as-is would be exactly the "affiliation inflation" `01-voice-and-messaging.md` §5 warns against.
