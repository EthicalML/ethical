PROPOSAL — for owner review

# Homepage copy sheet

Per section: **CURRENT** (what the new site renders today) · **SOURCE** (origin / placeholder status) · **PROPOSED** (rephrased final per `01-voice-and-messaging.md`). ⚠ = invented/unverified number — do not ship without owner confirmation. Structure is fixed by the prototype; only wording is proposed.

## Hero
| | |
| --- | --- |
| CURRENT | Status pill: "NINTH PRINCIPLE ADDED — ALIGNMENT WITH INTENT". Title: "The Institute for Ethical AI Alignment & Safety". Subtitle: "Advocating for the safe and aligned development of AI. A research centre carrying out highly technical, practical and cross-functional work across the nine Responsible AI Principles — with industry, academia and governments." Buttons: Join the network / Contact us. |
| SOURCE | Prototype (canonical for structure/tone). Subtitle rephrases master homepage line. Status pill = design device. |
| PROPOSED | Keep as-is. This is on-position and clean. Optional tighten of subtitle: "Advocating for the safe and aligned development of AI. An independent research centre doing technical, practical, cross-functional work across the nine Responsible AI Principles — with industry, academia and governments." (drops "highly", adds "independent".) Status pill retained. |

## Evidence stat band
| | |
| --- | --- |
| CURRENT | `09 RESPONSIBLE AI PRINCIPLES` · `393 NEWSLETTER ISSUES PUBLISHED` ⚠ · `70k+ ML PRACTITIONERS REACHED` ⚠ · `10k+ GITHUB STARS, OSS ECOSYSTEM` ⚠ · `2 STATE OF PRODUCTION ML REPORTS`. |
| SOURCE | `stats.json`. "09" and "2" are structural facts. Others carried from prototype as illustrative. |
| PROPOSED | Keep the five tiles and labels. **Verify before ship:** issue count (393 vs. real 395/396 per repo commits — use the real current number), 70k+ subscribers, 10k+ stars. If any can't be confirmed, drop that tile rather than assert. Wording of labels is fine. |

## Affiliation marquee
| | |
| --- | --- |
| CURRENT | Eyebrow "MEMBERSHIPS, ADVISORY ROLES & STANDARDS COLLABORATIONS". Items: UNITED NATIONS (AI EXPERT), UN CSTD (CHAIR, COMMITTEE), EUROPEAN COMMISSION (APPOINTED EXPERT), ACM (GOVERNING BOARD), LINUX FOUNDATION (ASSOCIATE MEMBER), OWASP (MLSECOPS COLLABORATION), IEEE (AI STANDARDS GROUP), ISO/IEC (AI STANDARDS GROUP), NUMFOCUS (CONTRIBUTION). |
| SOURCE | `affiliations.json`. Roles ⚠ — inventory flags UN/CSTD/EC/ACM titles as "verify current"; several may be historical. Logo licensing also open. |
| PROPOSED | Keep structure and eyebrow. **Every role line requires owner verification of current-ness.** Where a title is past, reword to non-endorsing form (e.g. "STANDARDS COLLABORATION", "PRIOR ADVISORY") rather than a specific active office. State collaboration, not endorsement. Do not add logos until licensing cleared. |

## Four-phase strategy
| | |
| --- | --- |
| CURRENT | Eyebrow "01 — THE FOUR-PHASE RESPONSIBLE AI STRATEGY". Heading "From individual practice to national regulation." Cards: 01 EMPOWERING INDIVIDUALS / By Principle · 02 EMPOWERING ORGANISATIONS / By Process · 03 EMPOWERING INDUSTRIES / By Standards · 04 EMPOWERING NATIONS / By Regulation, each with 3 detail lines. |
| SOURCE | `index.mdx` frontmatter, verbatim from master homepage four-phase model. Core IP. |
| PROPOSED | Keep verbatim — this is the strongest existing asset and reads correctly. "Empowering" is retained here as established label IP (the one sanctioned exception in the voice framework). No change. |

## Principles intro (explorer header)
| | |
| --- | --- |
| CURRENT | Eyebrow "02 — THE NINE RESPONSIBLE AI PRINCIPLES". Heading "A practical framework, developed by domain experts." Intro "Each principle carries a commitment, the failure modes it guards against, and the controls that implement it." |
| SOURCE | `index.mdx`. Heading rephrases master ("practical framework put together by domain experts"). Intro = design device describing the explorer card model. |
| PROPOSED | Keep. Accurate and on-voice. (Explorer card bodies themselves are governed by `11-sheet-principles.md`.) |

## Open-source showcase (OSS cards)
| | |
| --- | --- |
| CURRENT | Section: "03 — OPEN SOURCE & TOOLS" / "Infrastructure the principles can actually run on." Cards — **Kompute** (2.1k stars ⚠, 38 contrib ⚠, 160+ releases ⚠, Apache-2.0), **XAI** (ALPHA; 1.4k stars ⚠, 21 contrib ⚠; 3-stage pipeline), **Production ML list** (10.2k stars ⚠, 230+ contrib ⚠, 260 tools ⚠), **KAOS** (NEW/early access; 9 contrib ⚠; 6 capability rows). |
| SOURCE | `projects.json`. Project existence + descriptions real (master/READMEs). All per-project metrics carried from prototype — unverified. |
| PROPOSED | Keep card structure, titles, descriptions and the P09→KAOS linkage (strong). Descriptions are on-voice; light-edit XAI/ecosystem text only if READMEs contradict. **Replace every star/contributor/release/tool count with the real current figure from each GitHub repo, or remove the metric row.** Keep status badges only where literally true (XAI ALPHA ✓, KAOS early access ✓). |

## Reports & data
| | |
| --- | --- |
| CURRENT | Eyebrow "04 — REPORTS, DATA & INITIATIVES". Title "The State of Production ML". Intro references 2024 vs 2025 comparison + per-answer principle mapping. Side panels: **AI-RFX / ML Maturity Model** (8/8 criteria list) and **MLSecOps Top 10** (7 OWASP↔ML rows shown). |
| SOURCE | `home-reports.json`. Survey, MMM criteria and MLSecOps taxonomy all real (master rfx/mlmm/security). Intro describes real 2024/2025 datasets. |
| PROPOSED | Keep. Substance is real and well-mapped. Two notes: (1) MLSecOps panel shows 7 of 10 rows — fine as a homepage teaser, but the framework page must carry all 10; (2) ensure the explorer links resolve to real 2024/2025 data, not the illustrative dataset. Copy itself needs no rework. |

## Network / form
| | |
| --- | --- |
| CURRENT | Eyebrow "05 — NETWORK & NEWSLETTER". Heading "A network of aligned humans". Intro "Responsible technology takes more than technical changes to models. One membership covers both the Ethical AI Network and the Machine Learning Engineer newsletter." Stats: 1,034 MEMBERS ⚠ · 70,412 SUBSCRIBERS ⚠ · 393 ISSUES ⚠. One-form (name/email/org + 3 interest checkboxes), disclaimer. |
| SOURCE | `network.json` + `index.mdx`. Framing from master ("network of responsible and aligned humans"). All three stats unverified. |
| PROPOSED | Keep heading, intro, form and disclaimer — all on-voice. **Confirm or replace all three stats** (members, subscribers, issues); the issue count must match the real current number, not 393. Form fields/checkboxes fine as-is. |

## Footnote / footer
| | |
| --- | --- |
| CURRENT | Wordmark "THE INSTITUTE FOR ETHICAL AI / ALIGNMENT + SAFETY". Footer identity "ETHICAL.INSTITUTE — THE INSTITUTE FOR ETHICAL AI ALIGNMENT & SAFETY". Legal "© 2026 — OPEN SOURCE, CC BY-SA WHERE APPLICABLE". Meta "Practical frameworks for the safe and aligned development of AI systems." |
| SOURCE | `site.json`. Fully rebranded, no legacy identity. |
| PROPOSED | Keep verbatim. Clean and on-position. Confirm CC BY-SA licence claim is accurate for the site content before ship. |
