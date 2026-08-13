#!/bin/sh
# Decides whether a *scheduled* deploy run has work to do: it does when any
# blog post's publish date falls within the lookback window ending today.
# The three-day window makes missed cron runs self-healing: GitHub delays or
# drops scheduled runs under load, and a post that became due on a skipped
# day must still deploy on the next run rather than wait for a push.
# Push and manual runs never consult this script.
#
# Usage: scheduled-deploy-due.sh [today-YYYY-MM-DD]   (date override for tests)
# Prints "1" (deploy) or "0" (skip). Always exits 0.
set -eu

today="${1:-$(date -u +%F)}"
due=0
for offset in 0 1 2; do
  # GNU date on the runner; BSD date fallback for local runs on macOS.
  day=$(date -u -d "$today -${offset} day" +%F 2>/dev/null || date -u -j -v "-${offset}d" -f %Y-%m-%d "$today" +%F)
  # grep -c exits 1 on zero matches, which would kill a `set -e` shell: the
  # empty-archive day is the common case, not an error.
  hits=$(grep -rh '^date:' src/content/blog/*/index.md 2>/dev/null | grep -c "$day" || true)
  due=$((due + hits))
done
[ "$due" -gt 0 ] && echo 1 || echo 0
