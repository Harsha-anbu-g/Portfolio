#!/usr/bin/env bash
# Fetches the colour photos the Why Towinly page uses and writes them as WebP (long edge
# 1400px). Every photo is from Pexels under the free Pexels licence; provenance is in
# docs/towinly-photo-credits.md. None shows a face: the cards speak to "you", and the
# Towinly photo rules keep faces away from second-person copy.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/towinly/photos"
TMP="${TOWINLY_TMP:-$(mktemp -d)}"
TOWINLY="/Users/aghar/Documents/Projects/ToWin App/marketing/instagram/assets/photos"
mkdir -p "$OUT" "$TMP"

# name  pexels-id
PEXELS="walk-autumn-pair 34761540
walk-forest-far 10524495
walk-tunnel 19681220
teapot-two-cups 19632313
tea-table 3394113
tea-glasses-window 6775327
coffee-windowsill 11073296
coffee-flowers 12567406
bag-outdoors 8490369
bag-paper 6956906
phone-chat-hands 9898391
phone-texting 9898393
phone-blue 6669784
phone-thumbs 6669813
wheel-day 1073031
chess-pieces 20992933
chessboard-top 8438872
sprout-hands 7944396
garden-gloves 7728868
books-held 7054519
books-stack 1148399
padlock-blue-shutter 20797620
padlock-pink 157203
padlock-blue-door 164425
laptop-code 3888151
laptop-code-2 34803966
laptop-dark 6424589"

# Towinly's own licensed photos (also Pexels), used here in their original colour.
# name  file in the Towinly marketing folder
LOCAL="walk-park-two-gen p13-walking-park-two-gen
empty-armchair p15-empty-armchair-window
two-armchairs p16-two-armchairs-window
letter-writing p07-hands-writing-letter
envelope p08-opening-envelope
keys-box p10-keys-wooden-box
key-drawer p11-key-locked-drawer"

echo "$PEXELS" | while read -r name id; do
  curl -sf --max-time 60 -A "Mozilla/5.0" -o "$TMP/$name.jpg" \
    "https://images.pexels.com/photos/$id/pexels-photo-$id.jpeg?auto=compress&cs=tinysrgb&w=1600"
  magick "$TMP/$name.jpg" -resize '1400x1400>' -strip "$TMP/$name.png"
  cwebp -quiet -q 74 "$TMP/$name.png" -o "$OUT/$name.webp"
done
echo "$LOCAL" | while read -r name file; do
  magick "$TOWINLY/$file.jpg" -resize '1400x1400>' -strip "$TMP/$name.png"
  cwebp -quiet -q 74 "$TMP/$name.png" -o "$OUT/$name.webp"
done

node "$ROOT/scripts/towinly-manifest.mjs"
du -sh "$OUT"
ls "$OUT" | wc -l
