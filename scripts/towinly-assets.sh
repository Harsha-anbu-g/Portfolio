#!/usr/bin/env bash
# Converts the Towinly screenshots and Instagram artworks this page uses into small WebP
# files, and records the commit counts. Reads only; never writes into the Towinly projects.
set -euo pipefail
SRC="/Users/aghar/Documents/Projects/ToWin App"
WEB="/Users/aghar/Documents/Projects/ToWin"
SHOTS="$SRC/docs/user-guide/screenshots/ios-framed"
POSTS="$SRC/marketing/instagram/posts"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/towinly"
GEN="$ROOT/src/data/towinly/generated"
mkdir -p "$OUT/shots" "$OUT/social" "$GEN"

SHOT_LIST="elder-home elder-ask-help elder-posted-help elder-trust elder-trust-people elder-home-building-trust \
elder-friends elder-friends-invites elder-messages elder-chat-ethan elder-checkin elder-emergency-contacts \
elder-family elder-family-sharing elder-pass-on elder-story-detail elder-sealed-items elder-pass-on-sheet \
elder-ask-ai game-menu-elder elder-profile elder-updates guide \
helper-home helper-job-open helper-offer-help helper-my-jobs helper-ladder-open helper-reviews-card helper-passed-on \
family-home family-parent family-parent-today family-parent-cando \
landing-01 login register-role"

ART_LIST="towinly-ig-02-trust-ladder towinly-ig-33-stranger-at-the-door towinly-ig-34-all-fine-here \
towinly-ig-35-a-quiet-week towinly-ig-36-she-pays-online-now towinly-ig-37-first-digital-elders \
towinly-ig-38-the-mix towinly-ig-39-how-i-found-the-trust-ladder towinly-ig-42-how-i-built-trust-2 \
towinly-ig-40-where-the-boxes-came-from towinly-ig-41-team-of-one towinly-ig-47-five-people-one-switch"

for n in $SHOT_LIST; do
  cwebp -quiet -q 80 -resize 480 0 "$SHOTS/$n.png" -o "$OUT/shots/$n.webp"
done
for n in $ART_LIST; do
  cwebp -quiet -q 82 -resize 540 0 "$POSTS/$n.png" -o "$OUT/social/$n.webp"
done

node "$ROOT/scripts/towinly-manifest.mjs"

WEB_COMMITS=$(git -C "$WEB" rev-list --count origin/main)
APP_COMMITS=$(git -C "$SRC/App" rev-list --count origin/main)
printf '{ "webCommits": %s, "appCommits": %s, "countedOn": "%s" }\n' \
  "$WEB_COMMITS" "$APP_COMMITS" "$(date +%Y-%m-%d)" > "$GEN/facts.json"

du -sh "$OUT/shots" "$OUT/social"
cat "$GEN/facts.json"
