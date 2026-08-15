# Events scout

Executed by a subagent. Input from the spawning prompt: the issue number `<N>`. Output: the report file `tmp/issue-<N>/events-scout.md`, an updated `scouted` section in the ledger, and a summary of at most one line per proposal. Never edit `src/content/events.yaml` or the ledger's `watchlist` yourself — the owner reviews the report first.

## 1. Load state, not files

Do not read `src/content/events.yaml` in full. Extract only the identity and date lines:

```
grep -E '^\s*(- slug|series|url|start|end|cfps|- url|deadline)' src/content/events.yaml
```

Read `scripts/events/data/scout-ledger.yaml` in full (it is small): `watchlist` is what to check every run, `scouted` is what has already been assessed. For allowed `topics` values, read the `EVENT_TOPICS` enum in `src/content.config.ts`.

## 2. Geographic and fit rules

These govern every step below:

- Europe first, in priority order: Berlin and nearby; then the other key hubs — London, Amsterdam, and Germany/Central Europe (Munich, Hamburg, Prague, Vienna); then Europe-wide. Virtual events strongly relevant to a European audience count.
- Non-European events qualify only as unique flagships of the AI Engineer / MLOps World tier — the watchlist marks the standing exceptions. Prestige alone does not qualify a US event.
- The bar is flagship or large-mainstage: an event the network would plausibly speak at, of the tier already in `events.yaml`. Regional meetups, vendor user-conferences and paper-mill conferences do not qualify — with the KCD/ContainerDays-style entries on the watchlist as the deliberate exceptions.

## 3. Check the watchlist

For each watchlist entry, find the next edition beyond what the ledger last recorded: dates, location, and CFP status — including likely CFP windows when applications have not opened yet (organisers usually repeat their cycle). The same carry-forward rule as step 4 applies: when the ledger already records the entry's next edition and CFP status, skip it entirely until a deadline is within 14 days, the edition passes, or the record is ~90 days old — most weeks this makes the watchlist sweep a handful of searches, not one per entry.

The tiers behave differently (their meaning is documented in the ledger header):

- `feature` entries: a confirmed next edition becomes a proposed `events.yaml` addition.
- `cfp-track` entries: report CFP windows, deadlines and changes only. Never propose one into `events.yaml` — it enters the site list only once a talk is confirmed or the owner partners with it, which the owner does outside this workflow.

## 4. Scout for new events

One sweep of `WebSearch` for new conferences in the next 12–18 months on the file's topics (AI platforms and infrastructure, AI agents, MLOps, LLM systems, cloud native, Kubernetes, Python, data/ML engineering, AI governance), applying the rules of step 2.

Before researching any candidate, check it against `scouted`. A known entry is carried forward at zero cost; re-research it only when something forces it: its recorded CFP deadline is within 14 days (flag the urgency), its recorded edition has passed (assess the next one, or prune), or the entry is over ~90 days old. `rejected` entries whose reason is structural (format, organiser shut down, scale cap) stay rejected without any recheck until a next edition suggests the structure changed. Drop candidates whose `series` or `url` is already in `events.yaml` — those were handled in step 3.

## 5. Select, then verify only the shortlist

Keep at most 3 new events — the strongest only. Zero is the normal outcome most weeks: the measured base rate (2026-08 research) is roughly one genuinely new flagship-tier conference in Europe every 5–6 months, so the cap binds only during announcement bursts; never pad. The cap applies to proposed `events.yaml` additions and new watchlist recommendations only — CFP status updates are not capped. Rejects need no verification beyond the search results that surfaced them.

Only for the shortlist and for watchlist findings being proposed: fetch the organiser page (or its CFP platform, e.g. Sessionize) and confirm dates, location and CFP deadline, one source URL per claim. If the page will not load or sources disagree, keep the proposal but mark the field `# unverified`, the file's existing convention. Never guess a date. Verify each claim once: a fact already confirmed earlier in this run is settled — no closing re-confirmation sweep. Distinguish confirmed facts from inferred timing (likely CFP windows are inferences and must say so).

## 6. Update the ledger

Rewrite the `scouted` section of `scripts/events/data/scout-ledger.yaml`: one entry per candidate assessed this run or carried forward, with `checked` set to today for anything actually looked at. Watchlist entries record their known state here too (`status: tracked`, next edition dates, CFP status) — that record is what lets later runs skip them. Prune entries whose event has passed. Leave `watchlist` untouched.

## 7. Write the report

Write `tmp/issue-<N>/events-scout.md` with four sections, any of which may say "none":

- **Tracker update recommendations** — proposed `watchlist` additions or removals, each with a reason. Recommend only; the owner edits the watchlist.
- **Proposed additions** — per event: a ready-to-paste YAML entry matching the `events` schema (omit `image`; `scripts/events/fetch-banners.mjs` fills it later), evidence lines per date/deadline (claim, source URL, verified or unverified), and a one-line recommendation. Flag any CFP deadline within 14 days.
- **Proposed updates** — per existing `events.yaml` slug: the exact field change (newly opened CFP, changed deadline, confirmed dates) and its evidence line.
- **Rejected** — one line each with the reason, so the owner can overrule.

Return the report path and the one-line summaries; do not paste the full report into the return message.
