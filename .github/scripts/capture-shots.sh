#!/usr/bin/env bash
# Serves the current `dist` on :4126, photographs every route in routes.json at
# both viewports, and moves the captures to $1. Used twice by the visual job —
# once on the merge base, once on the head — so the two sides are produced by
# the identical procedure and only the source tree differs.
#
# The server is torn down before returning. Reusing the port across two builds
# is the one way to produce a confident, meaningless green: if the first server
# survives, the second sweep photographs the first build and parity passes
# because it compared a build to itself.
set -euo pipefail

destination="$1"
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$root"

rm -rf scripts/verify/out
npx --yes http-server dist -p 4126 --silent &
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
