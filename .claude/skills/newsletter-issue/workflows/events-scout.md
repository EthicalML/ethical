# Events scout

Executed by a subagent. Input from the spawning prompt: the issue number `<N>`. Output: the report file `tmp/issue-<N>/events-scout.md` and a summary of at most one line per proposal. Never edit `src/content/events.yaml` yourself — the owner reviews the report first.

## 1. Load the current list

Read `src/content/events.yaml` in full. Collect every `slug`, `series` and `url`, and note which events are upcoming (start on or after today). Read the `EVENT_TOPICS` enum in `src/content.config.ts`; proposed `topics` values must come from it.

## 2. Search for new events

Two sweeps, both via `WebSearch` and `WebFetch` on organiser pages:

1. **Next editions of tracked series.** For each series in the file whose latest edition has passed or is within 3 months, check the organiser site for the next edition's dates.
2. **New flagship events.** Search for major conferences in the next 12 months on the file's topics (MLOps, LLMs, AI agents, AI infrastructure, AI policy, ML security, Python/data engineering). The bar is flagship: an event the network would plausibly speak at or recommend, of the same tier as those already listed. Regional meetups, vendor user-conferences and paper-mill conferences do not qualify.

Drop any candidate whose `series` or `url` already appears in the file — those are updates (step 4), not additions.

## 3. Verify each candidate

For each surviving candidate, fetch the organiser page and record: name, start/end dates, location, CFP page URL and deadline if one is open or announced. Every date and deadline needs a source URL from the organiser (or the CFP platform it links, e.g. Sessionize). If sources disagree or the page will not load, keep the candidate but mark the field `# unverified` — the same convention the file already uses. Never guess a date to fill a field.

## 4. Check existing upcoming events for updates

For each upcoming event already in the file, check the organiser page for: a CFP that has opened (or a deadline that changed) and is not yet in its `cfps` array, and date fields marked `# unverified` that can now be confirmed. Propose these as updates.

## 5. Select

Keep at most 3 new events — the strongest only. Zero is the normal outcome most weeks: flagship events rarely appear, and the list must not be padded. Prefer a short report over a stretched one.

## 6. Write the report

Write `tmp/issue-<N>/events-scout.md` with three sections:

- **Proposed additions** — for each, a ready-to-paste YAML entry matching the `events` schema in `src/content.config.ts` (omit `image`; `scripts/events/fetch-banners.mjs` fills it later), followed by one evidence line per date/deadline: the claim, the source URL, and whether it is verified or unverified.
- **Proposed updates** — per existing slug, the exact field change and its evidence line.
- **Rejected** — one line each for candidates found but dropped, with the reason, so the owner can overrule.

Any section may be empty; say "none" rather than omitting it. Return the report path and the one-line summaries; do not paste the full report into the return message.
