#!/bin/bash
# Build the m1/m2 stock-track variants for every reel as soon as its page lands,
# so no reel ever reaches the gallery with only its generated score.
# Usage: stock_music.sh <N>   (reads $R/music-variants.txt: "<slug> <m1|m2> <track file>")
set -u
issue=$1
script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
root=$(git rev-parse --show-toplevel)
main=$(cd "$(git rev-parse --git-common-dir)/.." && pwd)
reels=${REEL_ROOT:-$root/tmp/reels}/$issue
music=$main/.music/pixabay
while true; do
  while read -r slug tag track; do
    [ -n "$slug" ] && [ -f "$reels/out/$slug.html" ] || continue
    [ -f "$reels/out/$slug-$tag.html" ] && continue
    if python3 "$script_dir/swap_music.py" "$issue" "$slug" "$tag" "$music/$track" < /dev/null > "$reels/logs/swap-$slug-$tag.log" 2>&1; then
      echo "music ok $slug $tag"
    else
      echo "music FAIL $slug $tag (see logs/swap-$slug-$tag.log)"
    fi
  done < "$reels/music-variants.txt"
  pgrep -f "launch.sh --controller $issue" > /dev/null || { echo "launcher done; $(ls "$reels"/out/*-m[12].html 2>/dev/null | wc -l | tr -d ' ') stock variants built"; exit 0; }
  sleep 30
done
