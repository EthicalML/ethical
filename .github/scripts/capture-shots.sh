#!/usr/bin/env bash
# Serves a built site on :4126, photographs every route in routes.json at both
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
# The server is torn down before returning. Reusing the port across two builds
# is the one reliable way to produce a confident, meaningless green: if the
# first server survives, the second sweep photographs the first build and parity
# passes because it compared a build to itself.
set -euo pipefail

dist="$1"
destination="$2"
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$root"

test -d "$dist" || { echo "no build at $dist" >&2; exit 1; }
rm -rf scripts/verify/out

npx --yes http-server "$dist" -p 4126 --silent &
server=$!
trap 'kill "$server" 2>/dev/null || true; wait "$server" 2>/dev/null || true' EXIT

for _ in $(seq 1 60); do
  if curl -fsS -o /dev/null http://127.0.0.1:4126/; then break; fi
  sleep 1
done
curl -fsS -o /dev/null http://127.0.0.1:4126/

npm run verify:shots:all > /dev/null

mkdir -p "$(dirname "$destination")"
rm -rf "$destination"
mv scripts/verify/out "$destination"
