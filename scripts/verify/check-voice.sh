#!/usr/bin/env bash
# Check blog posts against the mechanical rules of the voice guide
# (.github/instructions/blog.instructions.md): banned words, banned phrases,
# and ASCII-only punctuation. Structural rules (sentence shape, personification)
# are enforced by the instructions file itself, not here.
#
# Posts dated before the guide existed (2026-08-29) are skipped rather than
# retro-edited; the rules apply to everything written from the guide onward.
set -euo pipefail

root="$(cd "$(dirname "$0")/../.." && pwd)"
cutoff='2026-08-29'

words='testament|underscor(e|es|ed|ing)|propel(s|led|ling)?|unwavering|heartfelt|embrac(e|es|ed|ing)|foster(s|ed|ing)?|ignit(e|es|ed|ing)|empower(s|ed|ing)?|amplif(y|ies|ied|ying)|catalyst|leverag(e|es|ed|ing)|epitome|cornerstone|noteworthy|unprecedented|profound(ly)?|pivotal|delv(e|es|ed|ing)|tapestry|showcas(e|es|ed|ing)|vibrant|groundbreaking|diverse array|crucial(ly)?|ship(s|ped|ping)?|failure modes?'
phrases='not just|is quietly|at its core|delving into|serves as|stands as|functions as|it rarely survives|rather than the exception'

status=0
for file in "$root"/src/content/blog/*/index.md; do
  date="$(awk '/^---$/{f++} f==1 && sub(/^date: */, ""){print; exit}' "$file")"
  if [ -z "$date" ] || [[ "$date" < "$cutoff" ]]; then
    continue
  fi
  relative="${file#"$root/"}"
  if matches="$(grep -inEw "$words" "$file")"; then
    echo "BANNED WORD in $relative:"
    echo "$matches"
    status=1
  fi
  if matches="$(grep -inE "$phrases" "$file")"; then
    echo "BANNED PHRASE in $relative:"
    echo "$matches"
    status=1
  fi
  if matches="$(LC_ALL=C grep -n '[^	 -~]' "$file")"; then
    echo "NON-ASCII in $relative:"
    echo "$matches"
    status=1
  fi
done

[ "$status" -eq 0 ] && echo "OK: blog voice checks passed"
exit "$status"
