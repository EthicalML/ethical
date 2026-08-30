#!/usr/bin/env bash
# Mechanical voice checks for blog posts and newsletter issues: a short list of
# words and phrases that essentially never appear in legitimate prose, plus the
# non-ASCII punctuation the site-wide rule bans. Everything requiring judgement
# lives in .github/instructions/voice.instructions.md and is applied by the
# agent writing the article, not here.
#
# Work written before the voice guide existed is skipped rather than
# retro-edited: blog posts dated before 2026-08-29, and newsletter issues
# below 402.
set -euo pipefail

root="$(cd "$(dirname "$0")/../.." && pwd)"
blog_cutoff='2026-08-29'
issue_cutoff=402

words='testament|tapestry|delv(e|es|ed|ing)|epitome|cornerstone|unwavering|heartfelt|groundbreaking|revolutionary|pivotal|moreover|furthermore|diverse array|game-changing'
phrases='is quietly|at its core|it rarely survives'

# Written as an alternation of literal characters rather than a bracket
# expression so it matches the exact UTF-8 byte sequences whatever locale the
# runner has: en dash, em dash, curly quotes, ellipsis.
punctuation='–|—|‘|’|“|”|…'

status=0

report() {
  echo "$1 in $2:"
  echo "$3"
  status=1
}

# $1 is the file, $2 the pattern for the non-ASCII check.
check() {
  local file="$1" ascii_pattern="$2" relative matches
  relative="${file#"$root/"}"
  if matches="$(grep -inEw "$words" "$file")"; then
    report 'BANNED WORD' "$relative" "$matches"
  fi
  if matches="$(grep -inE "$phrases" "$file")"; then
    report 'BANNED PHRASE' "$relative" "$matches"
  fi
  if matches="$(LC_ALL=C grep -nE "$ascii_pattern" "$file")"; then
    report 'NON-ASCII' "$relative" "$matches"
  fi
}

# A blog post has no legitimate use for any non-ASCII character, so its arm keeps
# the blanket check.
for file in "$root"/src/content/blog/*/index.md; do
  date="$(awk '/^---$/{f++} f==1 && sub(/^date: */, ""){print; exit}' "$file")"
  if [ -z "$date" ] || [[ "$date" < "$blog_cutoff" ]]; then
    continue
  fi
  check "$file" '[^	 -~]'
done

# The newsletter cannot use the blanket check: emoji are content there. The
# boilerplate alone carries 🚀 ⭐ 🤖 ✉️ 🐦 💼 📕, and headings and summaries add
# more. So this arm checks only the characters the ASCII punctuation rule exists
# to catch.
for file in "$root"/src/content/newsletter/*.md; do
  issue="$(basename "$file" .md)"
  if [ "$issue" -lt "$issue_cutoff" ]; then
    continue
  fi
  check "$file" "$punctuation"
done

[ "$status" -eq 0 ] && echo "OK: voice checks passed"
exit "$status"
