# What gets picked

Derived from issues 340-398 (59 issues, 300 article sections). Host, tag, recency, negative-space and ordering counts are exact over the full range; the content-type taxonomy comes from a full read of 15 issues (77 sections) extrapolated across the range.

## Content types and the real per-issue mix

| Type                                                                                                          | Per issue |
| ------------------------------------------------------------------------------------------------------------- | --------- |
| Opinion/essay from a named individual practitioner (Simon Willison, Ben Evans, Raschka, Karpathy, Eugene Yan) | 0.60      |
| Named-company production-engineering blog (Netflix, Pinterest, Klaviyo, Bluesky, DuckDB, Modular)             | 0.53      |
| Research paper / arXiv-adjacent tech report                                                                   | 0.53      |
| Video or talk (YouTube)                                                                                       | 0.47      |
| Industry or state-of-X survey report (McKinsey, DX, CircleCI, OpenAI enterprise report)                       | 0.47      |
| Big-lab model or product release                                                                              | 0.40      |
| Educational course, curated list, tutorial                                                                    | 0.40      |
| Big-lab technical or best-practice blog (not a release: "Building Effective Agents", MCP)                     | 0.33      |
| Tooling or framework release                                                                                  | 0.33      |
| Architecture deep-dive (model internals explainer)                                                            | 0.20      |
| Safety or security incident/report                                                                            | 0.20      |

There is no fixed slot template. What an issue near-always has is one named-individual opinion piece, plus one of {production-engineering blog, research paper}. Those two rotate almost interchangeably and rarely both appear in the same issue — that is a description of the corpus, not a cap: an issue carrying both is unusual, not wrong. The other two or three slots rotate freely across the rest. Architecture deep-dives and security incidents are 1-in-5 anchors, not staples: do not over-select them because they read well.

## The core beat and the adjacent beat

Four of the five slots are the core beat: AI/ML, LLMs, agentic systems, MLOps and LLMOps, ML security and safety.

Up to one slot per issue, in roughly every second issue, goes to an adjacent story. This is not a concession, it is part of the newsletter's character, and 21 of the 59 issues from 340 to 398 carry one:

- **Data systems and data engineering at scale.** DuckDB appears six times (362, 370, 374, 378, 392, 397), ClickHouse twice (379, 392), plus `OpenAI Scaling Postgres to 800m Users` (371), `Kafka Guide to Distributed Messaging` (383), `Databases 2025 Year in Review` (369) and `The Race of DuckDB / Polars / Spark` (364). Large data-intensive architecture, the Netflix genre, belongs here. Agentic-data stories are core, not adjacent.
- **Courses and lecture series from strong universities.** Stanford CS336 (390), CS25 (381), CS236 (361), `MIT Distributed Systems` (367), `Cornell: Advanced Compilers` (392).
- **Core systems, compilers and performance engineering.** `C++: The Documentary` (390), `Scaling Python Performance` (378), `Bringing GPU Kernels to Rust` (392).

The test for an adjacent pick is engineering depth for a practitioner, not whether the subject is AI.

## Depth

Depth is not length. `SQLite Critical CVEs or LLM Slop?` runs 1497 words with 40 code blocks and is still thin: it reports findings without developing them. `LLMs reward expertise` is 945 words and substantive, because it argues a thesis and works an example through. Word count only catches the obvious case, a 276-word rant.

The question to ask of a candidate is whether it develops an idea or merely enumerates observations. That cannot be judged from a title, which is why the shortlist is built from a skim of each candidate rather than its metadata.

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

Corporate events are their own reject class: acquisitions and mergers, funding rounds, layoffs, executive changes, lawsuits and antitrust. An acquisition reaches the newsletter at most as a clause inside another section, and only when it bears directly on that section's subject.

This is about the event, not the subject matter. A first-party engineering post about cost, pricing or efficiency is squarely on beat: `Managing AI Coding Costs at Scale` on databricks.com is a good pick, while `AMD acquires Taalas` is not, however high it ranks.

The other test an acquisition story fails is recognition. If a practitioner working in the space would not recognise the central actor, it is not news to this audience. Nobody in ML knows Taalas. No host list or keyword encodes this, so the shortlist names the actor and says why they matter, and an unrecognisable one is then obvious.

This is the main filter to apply on top of `candidates.mjs` output, whose keyword matching is deliberately recall-oriented and will surface popular AI-adjacent opinion posts with no engineering substance.

## Self-promotion

31 of 300 sections link the author's own projects, clustered in one campaign window (350-382: the State of MLOps 2025 survey, then the KAOS launches). That count only catches project domains, and it undercounts: issue 344 opened with the author's own conference talk on YouTube, which no domain match would find.

So own content is a normal part of the newsletter, not an exception to apologise for. Talks, projects, initiatives and work the author is connected to — a foreword, a collaboration, a colleague's launch — are all eligible on merit. What matters is that they are visible: mark them as own content in the shortlist, keep to one per issue outside a declared campaign, and let the owner make the call rather than deciding for them.

## Ordering

Slot 1 is a hook rather than the biggest story: a video, an opinion piece, or during a campaign the self-promo. Slots 2 to 4 carry the technical substance. Slot 5 is a lower-stakes closer, often tooling or a second paper. There is no importance ranking; the flow is personal hook, then meat, then a lighter close.

## Scoring a candidate list

The pool from `candidates.mjs` carries `kind`, `company`, `firstParty` and `ownProject` fields to make these rules checkable. They are cheap heuristics from the host and title: good enough to filter and sort, not good enough to decide. The shortlist is built from a skim of each candidate, never from its metadata alone.

1. Reject anything without engineering depth for a practitioner, however popular. The test is substance, not whether the subject is AI: a data-systems or compilers piece can pass it, and an AI story with nothing under the headline fails it.
2. Reject corporate events outright: acquisitions, mergers, funding, layoffs, executive changes, lawsuits. Cost, pricing and efficiency are engineering topics and stay eligible.
3. Reject a story whose central actor a practitioner would not recognise.
4. Prefer the first-party source over any summary or aggregator rewrite of it.
5. At most one arXiv/research paper per issue.
6. At most two flagship model releases per issue. Flagship means the vendor's headline general-purpose model for that cycle: the one the launch post is built around, not a distilled, small or single-purpose sibling.
7. At most one specialised model release per issue, counted separately from flagships: a safety or moderation model (Mistral's Shieldstral), a domain model (DeepMind's WeatherNext). These earn a slot by being different in kind, not by being big. With rule 6 the ceiling is three model stories, and an issue at that ceiling is already unusually release-heavy: this is not the model announcements newsletter.
8. At most one adjacent-beat pick per issue, in roughly every second issue: data systems, university courses, core systems and compilers.
9. Same-week or same-month, unless explicitly framed as a classic.
10. Include one named-individual opinion or analysis piece when a good one exists, provided it argues something rather than venting.
11. Include one named-company production-engineering piece when a good one exists.
12. Keep "big-lab technical/best-practice blog" distinct from "model release"; both count separately.
13. Weight toward LLMs, agents and ML security; deprioritise generic MLOps process and policy.
14. A European story qualifies on a model or research milestone, never on regulation.
15. Do not manufacture geographic or topical quotas. This rule outranks rule 14: rule 14 says what makes a European story eligible, not that an eligible one must be picked. When a European candidate competes with a stronger non-European one for the same slot, the stronger candidate wins.
16. Own content is eligible and should be surfaced, never silently dropped. The author's talks, projects and initiatives, and work they are connected to, are judged on merit like anything else: issue 344 opened with `The State of GenAI in 2025`, the author's own WeAreDevelopers talk. Cap it at one per issue and never place it in the final five without the owner saying so. The `ownProject` flag only recognises the author's own domains and repositories, so it will miss a talk on a conference channel or a book someone else wrote a foreword for. Do not treat an absent flag as evidence: the owner says which links are theirs when sharing them.
17. No two picks from the same host, company or author in one issue. The shortlist carries at most two per company, so a prolific week at one lab cannot crowd out the rest: when Anthropic ships six good posts, the shortlist shows the best two and the others wait in the pool.
18. Reject a subject the newsletter has already covered in the last twelve issues, whatever the URL. Coverage repeats by subject, not by link: issue 397 ran Claude Opus 5 through a `claude.com` context-engineering post, so `anthropic.com/news/claude-opus-5` is the same story from a different domain and the pool's URL dedup cannot see it. Entries carry a `recentlyCovered` flag for this; it is advisory, and a genuine second development in an ongoing story still qualifies.
19. Video or talk content is an occasional opener, not core substance, and never more than one.
20. Match the natural low frequency of architecture deep-dives and security incidents rather than over-selecting them.
