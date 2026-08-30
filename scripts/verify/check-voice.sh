#!/usr/bin/env bash
# Mechanical voice checks for blog posts: non-ASCII characters (em dashes,
# curly quotes, ellipses) and a short list of words and phrases that
# essentially never appear in legitimate prose. Everything requiring judgement
# lives in .github/instructions/blog.instructions.md and is applied by the
# agent writing the post, not here.
#
# Posts dated before the voice guide existed (2026-08-29) are skipped rather
# than retro-edited.
set -euo pipefail

root="$(cd "$(dirname "$0")/../.." && pwd)"
cutoff='2026-08-29'

words='testament|tapestry|delv(e|es|ed|ing)|epitome|cornerstone|unwavering|heartfelt|groundbreaking|diverse array'
phrases='is quietly|at its core|it rarely survives'

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
