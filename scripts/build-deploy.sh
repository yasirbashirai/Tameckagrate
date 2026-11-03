#!/usr/bin/env bash
# Builds the upload-anywhere version of the site for shared hosting (Hostinger / cPanel).
# Output: deploy/tameckagrate-site/ (upload its CONTENTS to public_html) + deploy/tameckagrate-site.zip
set -euo pipefail
cd "$(dirname "$0")/.."

OUT=deploy/tameckagrate-site
API=src/app/api
PARKED=.api-parked

# Next.js route handlers can't be statically exported: park them during the build (PHP replaces them)
mv "$API" "$PARKED"
trap 'mv "$PARKED" "$API"' EXIT

rm -rf .next-export out "$OUT" "$OUT.zip"
STATIC_EXPORT=1 npx next build

mv .next-export "$OUT"
cp -R deploy/php/. "$OUT/"

# Shop prices for the PHP checkout, straight from src/lib/site.ts
node --experimental-strip-types --no-warnings -e 'import("./src/lib/site.ts").then(({ products }) => console.log(JSON.stringify(products.map(({ id, name, price }) => ({ id, name, price })), null, 2)))' > "$OUT/api/products.json"

(cd "$OUT" && zip -qr ../tameckagrate-site.zip . -x '.DS_Store')
echo "Built $OUT and $OUT.zip"
