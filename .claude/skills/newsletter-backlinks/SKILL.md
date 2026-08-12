---
name: newsletter-backlinks
description: Check and sync Substack, LinkedIn and Brevo syndication URLs in newsletter issue frontmatter. Use after a weekly issue is republished, when auditing recent newsletter backlinks, or when backfilling links from saved archive HTML or JSON maps.
---

# Newsletter backlinks

Work through the relevant procedure in order. Never construct a Substack URL; the sync script uses each post's canonical URL. Never print or commit API keys or files under `tmp/`.

## Weekly check

1. After the owner publishes and syndicates an issue, check the four issues ending at n-1:

   ```
   node --env-file=.env scripts/newsletter/backlinks.mjs status --recent 4
   ```

2. Report the missing platforms. A non-zero exit is the expected signal while any checked issue is incomplete.

3. Offer to resolve the live links. When approved, run:

   ```
   node --env-file=.env scripts/newsletter/backlinks.mjs sync --recent 4
   ```

   A missing `BREVO_API_KEY` or an unreachable platform warns and skips that source. To make the Brevo key available without displaying it, load `~/.all_secret_keys` into the shell environment before running the command.

4. Run the status command again. Report links added, conflicts left unchanged, and platforms still missing.

## Backfill

1. Put saved LinkedIn archive HTML or prebuilt source maps under `tmp/`. Confirm they are ignored by Git and do not regenerate a supplied map.

2. Preview the complete backfill. Repeat `--from` to combine sources:

   ```
   node --env-file=.env scripts/newsletter/backlinks.mjs sync --all --from tmp/brevo-issues.json --from tmp/linkedin-issues.json --from tmp/substack-issues.json --dry-run
   ```

   Use `--source brevo,substack,linkedin` to restrict the sources when required. A saved non-JSON file is parsed as LinkedIn archive HTML.

3. Review the planned per-source counts and every warning. Existing URLs that conflict are preserved and must be resolved by the owner.

4. Remove `--dry-run` to write the links. Run the same command a second time and require it to report zero updates.

5. Count the final links by platform, list issues with no links, and verify representative built issue pages before committing explicit paths only.
