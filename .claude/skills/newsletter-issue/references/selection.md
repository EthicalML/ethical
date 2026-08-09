# What gets picked

Derived from issues 340-398 (59 issues, 300 article sections). Host, tag, recency, negative-space and ordering counts are exact over the full range; the content-type taxonomy comes from a full read of 15 issues (77 sections) extrapolated across the range.

## Content types and the real per-issue mix

| Type                                                                                          | Per issue |
| --------------------------------------------------------------------------------------------- | --------- |
| Opinion/essay from a named individual practitioner (Simon Willison, Ben Evans, Raschka, Karpathy, Eugene Yan) | 0.60      |
| Named-company production-engineering blog (Netflix, Pinterest, Klaviyo, Bluesky, DuckDB, Modular) | 0.53      |
| Research paper / arXiv-adjacent tech report                                                   | 0.53      |
| Video or talk (YouTube)                                                                       | 0.47      |
| Industry or state-of-X survey report (McKinsey, DX, CircleCI, OpenAI enterprise report)       | 0.47      |
| Big-lab model or product release                                                              | 0.40      |
| Educational course, curated list, tutorial                                                    | 0.40      |
| Big-lab technical or best-practice blog (not a release: "Building Effective Agents", MCP)     | 0.33      |
| Tooling or framework release                                                                  | 0.33      |
| Architecture deep-dive (model internals explainer)                                            | 0.20      |
| Safety or security incident/report                                                            | 0.20      |

There is no fixed slot template. What an issue near-always has is one named-individual opinion piece, plus one of {production-engineering blog, research paper}. Those two rotate almost interchangeably and rarely both appear in the same issue — that is a description of the corpus, not a cap: an issue carrying both is unusual, not wrong. The other two or three slots rotate freely across the rest. Architecture deep-dives and security incidents are 1-in-5 anchors, not staples: do not over-select them because they read well.

## Sourcing

148 distinct hosts across 300 sections. The top 25 supply only 55%, and ~110 hosts appear exactly once. Recurring: youtube 29, arxiv 21, github 13, simonwillison.net 8, openai family 10, raschka 7, anthropic family 8, Google family 16, netflixtechblog 5, huggingface 5.

No independent third-party host exceeds ~3 picks in 59 issues. Sourcing is deliberately spread thin. Do not shortlist two items from the same company or blog in one issue.

## Recency

Same-week to same-month is the norm. Of 21 arXiv links only 3 predate the issue by years, and each is explicitly framed as a classic. The freshness vocabulary is "this week"/"last week" or explicit-classic framing, with nothing in between: "last month" appears zero times in 300 sections. Anything older than about two months needs deliberate evergreen framing or it does not qualify.

## Topic weighting

The newsletter's identity has moved from "MLOps + responsible AI" to "LLMs + agentic systems". Recent tag counts (340-398) against all-time: `llms` 35 (all-time 132), `ai-agents` 35 (61), `mlops` 19 (198), `ml-security` 13 (50), `generative-ai` 10 (55). Gone to zero recently despite strong all-time totals: `ai-ethics` (51), `explainability` (44), `privacy` (15), `computer-vision` (7). `ai-policy` collapsed from 38 to 1.

Weight shortlists toward LLMs, agents and ML security. Generic MLOps-process content and policy pieces are no longer the beat.

## Europe

EU-regulation coverage effectively stopped around issue 310: zero `AI Act` mentions across 340-398. Recent European content means model milestones instead (EuroLLM in 359, the German open-weights model in 396, APERTUS 1.5 in 397) and totals 3 of 300 sections, concentrated in one news cycle. A European story earns a slot on a genuine research or model milestone, not on regulation, and never as a quota.

## Never selected

Across 300 sections, zero genuine hits for: crypto/blockchain/web3, startup funding or valuations, "Show HN", generic web/frontend development, consumer hardware or gadget reviews. Career and hiring content appears only in the author's own preamble, never as one of the five picks. Industry reports about engineering leadership do get picked, but only when framed as data for ML practitioners.

This is the main filter to apply on top of `candidates.mjs` output, whose keyword matching is deliberately recall-oriented and will surface popular AI-adjacent opinion posts with no engineering substance.

## Self-promotion

31 of 300 sections are self-referential, but they cluster in one campaign window (350-382: the State of MLOps 2025 survey, then the KAOS launches). Outside it, issues 340-349 and 383-398 contain none. Treat own-project content as off by default and only include it when the author says a campaign is running.

## Ordering

Slot 1 is a hook rather than the biggest story: a video, an opinion piece, or during a campaign the self-promo. Slots 2 to 4 carry the technical substance. Slot 5 is a lower-stakes closer, often tooling or a second paper. There is no importance ranking; the flow is personal hook, then meat, then a lighter close.

## Scoring a candidate list

The pool from `candidates.mjs` carries `kind`, `company`, `firstParty` and `ownProject` fields to make these rules checkable. They are cheap heuristics from the host and title: good enough to filter and sort, not good enough to decide. Open the URL before committing a candidate to the final five.

1. Reject anything without direct ML/AI substance, however popular.
2. Prefer the first-party source over any summary or aggregator rewrite of it.
3. At most one arXiv/research paper per issue.
4. At most one flagship big-lab model release per issue; two in the same week become two issues. Flagship means the vendor's headline general-purpose model for that cycle: the one the launch post is built around, not a distilled, small, or single-purpose sibling. A 3B moderation model is a tooling or safety release and does not consume the cap; a new frontier or Max-tier model does.
5. Same-week or same-month, unless explicitly framed as a classic.
6. Include one named-individual opinion or analysis piece when a good one exists.
7. Include one named-company production-engineering piece when a good one exists.
8. Keep "big-lab technical/best-practice blog" distinct from "model release"; both count separately.
9. Weight toward LLMs, agents and ML security; deprioritise generic MLOps process and policy.
10. A European story qualifies on a model or research milestone, never on regulation.
11. Do not manufacture geographic or topical quotas. Rule 11 outranks rule 10: rule 10 says what makes a European story eligible, not that an eligible one must be picked. When a European candidate competes with a stronger non-European one for the same slot, the stronger candidate wins.
12. Own-project content only during a declared campaign.
13. No two picks from the same host, company or author in one issue.
14. Video or talk content is an occasional opener, not core substance, and never more than one.
15. Match the natural low frequency of architecture deep-dives and security incidents rather than over-selecting them.
