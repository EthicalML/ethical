#!/usr/bin/env bash
# Serves a built site on $port, photographs every route in routes.json at both
# viewports, and moves the captures to $2.
#
#   capture-shots.sh <dist-dir> <destination>
#
# Both sides of the visual job are captured by this script, from the head's
# checkout, after both builds have been produced. That ordering is deliberate:
# the merge base predates the harness that photographs it, so checking it out
# and running its own `scripts/verify` would either fail outright or compare two
# captures taken by two different procedures. Only the built output should
# differ between the two sides.
#
# Reusing :$port across two builds is the one reliable way to produce a
# confident, meaningless green: if the first server survives, the second sweep
# photographs the first build and parity passes because it compared a build to
# itself. That is not hypothetical — it happened on the first CI run of this
# job. `npx` spawns http-server as a child, so killing the npx wrapper left the
# real server holding the port, the second `npx http-server` died of
# EADDRINUSE in the background where nothing was watching, and the sweep
# cheerfully re-photographed the merge base and called it identical.
#
# Two guards, because teardown is a thing that can fail in ways nobody
# anticipated:
#
#   1. The whole process group is killed and the port is confirmed free, both
#      before starting and after finishing.
#   2. The served bytes are checked against the bytes on disk before a single
#      screenshot is taken. Whatever else goes wrong, this sweep cannot
#      photograph a build other than the one it was handed.
set -euo pipefail

dist="$1"
destination="$2"
theme="${3:-dark}"
port="${4:-4126}"
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$root"

test -d "$dist" || {
  echo "no build at $dist" >&2
  exit 1
}

port_free() { ! curl -fsS -o /dev/null --max-time 2 "http://127.0.0.1:$port/" 2>/dev/null; }

await_port_free() {
  for _ in $(seq 1 20); do
    port_free && return 0
    sleep 0.5
  done
  return 1
}

if ! port_free; then
  echo "something is already serving :$port; refusing to photograph it" >&2
  exit 1
fi

rm -rf scripts/verify/out

# `setsid` puts the server and every child npx spawns into one process group, so
# teardown can take the group down rather than only the wrapper.
setsid npx --yes http-server "$dist" -p "$port" --silent &
server=$!
cleanup() {
  kill -TERM "-$server" 2>/dev/null || kill -TERM "$server" 2>/dev/null || true
  wait "$server" 2>/dev/null || true
  await_port_free || {
    echo ":$port is still held after teardown; the next sweep would photograph this build" >&2
    exit 1
  }
}
trap cleanup EXIT

for _ in $(seq 1 60); do
  curl -fsS -o /dev/null "http://127.0.0.1:$port/" && break
  sleep 1
done

# The identity check. If this passes, the sweep is photographing $dist and
# nothing else — no surviving server, no stale build, no silent green.
served=$(curl -fsS "http://127.0.0.1:$port/" | shasum | cut -d' ' -f1)
ondisk=$(shasum < "$dist/index.html" | cut -d' ' -f1)
if [ "$served" != "$ondisk" ]; then
  echo "‽ :$port is not serving $dist (served $served, on disk $ondisk)" >&2
  exit 1
fi

# The sweep must photograph THIS server. It defaults to :4126, so without
# being told the port the light leg (which serves :4127) photographs whatever
# else happens to hold :4126 — the dark leg's build when both land on one
# runner, and nothing at all when they do not. The first is a silently wrong
# pass, the second an honest connection refusal; both were observed.
VERIFY_BASE_URL="http://127.0.0.1:$port" npm run verify:shots:all -- --theme "$theme" > /dev/null

# Dark is the default theme and writes out/<viewport>; every other theme gets
# its own tree, out/<theme>/<viewport>, so it can never overwrite the dark
# baseline. The comparison step addresses <destination>/<viewport> either way,
# so the theme level is unwrapped here rather than taught to every caller.
captured="scripts/verify/out"
if [ -d "$captured/$theme" ]; then
  captured="$captured/$theme"
fi

mkdir -p "$(dirname "$destination")"
rm -rf "$destination"
mv "$captured" "$destination"
rm -rf scripts/verify/out
