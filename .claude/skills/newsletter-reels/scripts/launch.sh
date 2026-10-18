#!/bin/bash
set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

if [ "${1:-}" = "--controller" ]; then
  shift
  issue=$1
  shift
  root=$(git rev-parse --show-toplevel)
  reels_base=${REEL_ROOT:-$root/tmp/reels}
  reels_dir=$reels_base/$issue
  engine_dir=$script_dir/../engine
  max=${MAX:-10}
  stagger=${STAGGER:-15}
  claude_bin=${CLAUDE_BIN:-claude}
  mkdir -p "$reels_dir/logs"

  run_worker() {
    slug=$1
    brief=$reels_dir/briefs/$slug.md
    log=$reels_dir/logs/$slug.log
    if [ ! -f "$brief" ]; then
      echo "missing brief: $brief" >&2
      return 1
    fi
    echo "$(date +%H:%M:%S) start $slug" >> "$reels_dir/logs/launcher.log"
    set +e
    (
      cd "$engine_dir"
      REEL_HOME="$reels_dir/work" REEL_OUT="$reels_dir/out" \
        "$claude_bin" -p "$(cat "$brief")" --model claude-opus-5-5 --permission-mode auto --output-format json \
        > "$log" 2>&1 < /dev/null
    )
    rc=$?
    set -e
    echo "$(date +%H:%M:%S) end $slug rc=$rc" >> "$reels_dir/logs/launcher.log"
  }

  for slug in "$@"; do
    while [ "$(jobs -pr | wc -l | tr -d ' ')" -ge "$max" ]; do
      sleep 1
    done
    run_worker "$slug" &
    sleep "$stagger"
  done
  wait
  exit
fi

if [ "$#" -lt 1 ]; then
  echo "usage: launch.sh <N> [slug...]" >&2
  exit 2
fi
issue=$1
shift
root=$(git rev-parse --show-toplevel)
reels_base=${REEL_ROOT:-$root/tmp/reels}
reels_dir=$reels_base/$issue
if [ "$#" -eq 0 ]; then
  set --
  for brief in "$reels_dir"/briefs/*.md; do
    [ -e "$brief" ] || continue
    set -- "$@" "$(basename "$brief" .md)"
  done
fi
if [ "$#" -eq 0 ]; then
  echo "no briefs found in $reels_dir/briefs" >&2
  exit 1
fi
mkdir -p "$reels_dir/logs"
nohup "$0" --controller "$issue" "$@" >> "$reels_dir/logs/queue.log" 2>&1 < /dev/null &
echo "launched issue $issue controller pid=$! for $# reel(s)"
