# Source candidates

Executed by a subagent. Input from the spawning prompt: any owner-supplied URLs already added to the pool. Output: a return message carrying the factual digest described in step 4. You gather and summarise; you do not score, rank editorially, or cut — the orchestrator applies the selection rules to what you return. Read `.claude/skills/newsletter-issue/references/selection.md` first, only to know which candidates are worth skimming at all (hard exclusions), not to score.

1. Fetch this week's candidates from all three sources:

   ```
   node --env-file=.env scripts/newsletter/candidates.mjs fetch --days 7 --source hn,reddit,feeds
   ```

   This drops every URL the newsletter has already linked and merges the rest into the pool at `scripts/newsletter/data/candidates.json`. Entries stay `pool` until marked, so a thin week draws on earlier ones.

   Reddit needs `REDDIT_CLIENT_ID` and `REDDIT_CLIENT_SECRET` in the repo `.env`; without them the command warns, skips Reddit and continues on the other sources. Drop `--source` to fetch Hacker News only.

   `feeds` polls a hand-picked table of publisher blogs, so authoritative writing is picked up even when it never trends. Cap each publisher with `--per-feed N` (default 5).

   A skipped feed is a blocking defect, not a footnote. The feed table exists precisely for posts with no popularity signal, so a skipped publisher silently loses the stories nothing else can catch (issue 402 lost the week's best production-engineering post this way). If the fetch output reports any skipped feed, fix the cause and re-run before continuing: for the Playwright-backed feeds that means `npx playwright install chromium`. Only proceed with a feed still down when it cannot be fixed from this machine, and then say so in the digest's first line, not buried in a run-facts note.

2. Review the ranked pool:

   ```
   node scripts/newsletter/candidates.mjs list --limit 40
   ```

   Add `--source hn`, `--source reddit` or `--source feeds` to list one source. Reddit scores and Hacker News points are not comparable, so read the `src` column before trusting the ranking. Feed entries are unscored and show `—` in `pts`: a publisher blog has no popularity signal at all, which is not the same as a low one, and those entries are ordered by recency instead. Judge them on the article, exactly as the rules require for every other entry.

3. Drop only hard exclusions under `references/selection.md`; everything debatable stays in. The `kind`, `company`, `firstParty` and `ownProject` fields are heuristics from the title and host: use them to order the skim, never to drop.

4. Skim the top ~25 remaining candidates. Fetch each one and read enough to answer three questions: what does it actually claim or report, does it develop that idea or only enumerate observations, and who is the central actor. A title answers none of these, and popularity is not a criterion.

   Own content — the author's talks, projects and initiatives, and work they are connected to — is eligible and must be surfaced, flagged as own content, never silently dropped.

5. Return all skimmed candidates as a factual digest table, each row carrying: URL, source, points (or `—`), age, host, kind, word count, the central actor, one line on what the piece claims, and one line on how far it develops the claim. Flag own content. Record facts, not verdicts — no scores, no ranking of your own, no rejections.

   Every URL in the digest is the pool entry's URL copied verbatim and complete: never a bare host, never truncated with `...`, never abbreviated to fit the table. A wrong or shortened URL propagates into the shortlist as a broken link the owner clicks (issue 402 shipped a shortlist with bare-host links and an invented slug this way). Long URLs are fine; the table does not need to be pretty.
