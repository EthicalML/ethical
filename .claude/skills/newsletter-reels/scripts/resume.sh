#!/bin/bash
set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

if [ "${1:-}" = "--worker" ]; then
  shift
  issue=$1
  slug=$2
  delta=$3
  rebuild=$4
  round=$5
  root=$(git rev-parse --show-toplevel)
  reels_base=${REEL_ROOT:-$root/tmp/reels}
  reels_dir=$reels_base/$issue
  lock=$reels_dir/logs/.$slug.resume.lock
  trap 'rmdir "$lock"' EXIT INT TERM
  session=$(grep -Eo '"session_id"[[:space:]]*:[[:space:]]*"[^"]+' "$reels_dir/logs/$slug.log" | head -1 | sed 's/.*"//')
  if [ -z "$session" ]; then
    echo "no session_id in $reels_dir/logs/$slug.log" >&2
    exit 1
  fi
  claude_bin=${CLAUDE_BIN:-claude}
  echo "$(date +%H:%M:%S) r$round start $slug" >> "$reels_dir/logs/launcher.log"
  set +e
  (
    cd "$script_dir/../engine"
    REEL_HOME="$reels_dir/work" REEL_OUT="$reels_dir/out" \
      "$claude_bin" --resume "$session" -p "$(cat "$delta")" --model claude-opus-5-5 --permission-mode auto --output-format json \
      > "$reels_dir/logs/$slug.r$round.log" 2>&1 < /dev/null
  )
  rc=$?
  set -e
  echo "$(date +%H:%M:%S) r$round end $slug rc=$rc" >> "$reels_dir/logs/launcher.log"
  if [ "$rc" -eq 0 ] && [ "$rebuild" = "yes" ] && [ -f "$reels_dir/music-variants.txt" ]; then
    while read -r listed tag track; do
      [ "$listed" = "$slug" ] || continue
      case "$track" in
        /*) track_path=$track ;;
        *) track_path=${REEL_MUSIC:-$(git rev-parse --git-common-dir)/../.music/pixabay}/$track ;;
      esac
      python3 "$script_dir/swap_music.py" "$issue" "$slug" "$tag" "$track_path" \
        >> "$reels_dir/logs/music.log" 2>&1 < /dev/null
    done < "$reels_dir/music-variants.txt"
  fi
  exit "$rc"
fi

if [ "$#" -lt 3 ] || [ "$#" -gt 4 ]; then
  echo "usage: resume.sh <N> <slug> <delta.md> [--music]" >&2
  exit 2
fi
issue=$1
slug=$2
delta=$3
rebuild=no
[ "${4:-}" != "--music" ] || rebuild=yes
root=$(git rev-parse --show-toplevel)
reels_base=${REEL_ROOT:-$root/tmp/reels}
reels_dir=$reels_base/$issue
delta=$(cd "$(dirname "$delta")" && pwd)/$(basename "$delta")
[ -f "$delta" ] || { echo "missing delta: $delta" >&2; exit 1; }
mkdir -p "$reels_dir/logs"
lock=$reels_dir/logs/.$slug.resume.lock
if ! mkdir "$lock" 2>/dev/null; then
  echo "resume already running for $slug" >&2
  exit 1
fi
round=1
while [ -e "$reels_dir/logs/$slug.r$round.log" ]; do round=$((round + 1)); done
nohup "$0" --worker "$issue" "$slug" "$delta" "$rebuild" "$round" \
  >> "$reels_dir/logs/resume.out" 2>&1 < /dev/null &
echo "resuming $slug as r$round pid=$!"
