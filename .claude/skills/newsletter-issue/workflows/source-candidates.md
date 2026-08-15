# Source candidates

Executed by a subagent. Input from the spawning prompt: any owner-supplied URLs already added to the pool. Output: a return message carrying the 15-survivor table described in step 4 — the orchestrator presents it to the owner; never present or decide yourself.

Read `.claude/skills/newsletter-issue/references/selection.md` in full first. Then:

1. Fetch this week's candidates from all three sources:

   ```
   node --env-file=.env scripts/newsletter/candidates.mjs fetch --days 7 --source hn,reddit,feeds
   ```

   This drops every URL the newsletter has already linked and merges the rest into the pool at `scripts/newsletter/data/candidates.json`. Entries stay `pool` until marked, so a thin week draws on earlier ones.

   Reddit needs `REDDIT_CLIENT_ID` and `REDDIT_CLIENT_SECRET` in the repo `.env`; without them the command warns, skips Reddit and continues on the other sources. Drop `--source` to fetch Hacker News only.

   `feeds` polls a hand-picked table of publisher blogs, so authoritative writing is picked up even when it never trends. Cap each publisher with `--per-feed N` (default 5).

2. Review the ranked pool:

   ```
   node scripts/newsletter/candidates.mjs list --limit 40
   ```

   Add `--source hn`, `--source reddit` or `--source feeds` to list one source. Reddit scores and Hacker News points are not comparable, so read the `src` column before trusting the ranking. Feed entries are unscored and show `—` in `pts`: a publisher blog has no popularity signal at all, which is not the same as a low one, and those entries are ordered by recency instead. Judge them on the article, exactly as the rules require for every other entry.

3. Score every entry against the rules in `references/selection.md`. The `kind`, `company`, `firstParty` and `ownProject` fields are heuristics from the title and host: use them to filter and sort, never to decide.

4. Skim candidates from the top of the ranking until 15 survive the rules. Fetch each one and read enough to answer three questions: what does it actually claim or report, does it develop that idea or only enumerate observations, and who is the central actor. A title answers none of these. Metadata ranks a thin findings dump above a strong argument, and popularity is not a selection criterion at any point.

   Own content — the author's talks, projects and initiatives, and work they are connected to — is eligible and must be surfaced, flagged as own content, never silently dropped.

5. Return the surviving 15 as a table, each row carrying: URL, source, points (or `—`), age, host, kind, word count, the central actor and why they matter, and one line on what the piece argues. Mark anything thin and anything that is own content. Do not mark any entries rejected — the owner has not cut yet.
