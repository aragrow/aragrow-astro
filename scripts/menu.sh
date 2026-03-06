#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  AraGrow WordPress Import & Deploy
#  Imports posts from posts.xml, commits, and pushes to trigger
#  a GitHub Actions rebuild and deploy.
#
#  Run: npm run import  OR  bash scripts/menu.sh
# ─────────────────────────────────────────────────────────────

set -euo pipefail

GREEN="\033[0;32m"
RED="\033[0;31m"
BOLD="\033[1m"
RESET="\033[0m"

echo ""
echo -e "${BOLD}AraGrow — WordPress Import & Deploy${RESET}"
echo "────────────────────────────────────"

# 1. Check posts.xml exists
if [[ ! -f "posts.xml" ]]; then
  echo -e "${RED}✗  posts.xml not found in project root.${RESET}"
  echo "   Export from WordPress Admin → Tools → Export → All content"
  echo "   and save as: $(pwd)/posts.xml"
  exit 1
fi
echo -e "${GREEN}✓  posts.xml found${RESET}"

# 2. Run the XML import
echo ""
echo -e "${BOLD}Importing posts …${RESET}"
npx tsx scripts/import-wp.ts

# 3. Stage blog content
echo ""
echo -e "${BOLD}Staging changes …${RESET}"
git add src/content/blog/ public/images/blog/ 2>/dev/null || true

if git diff --staged --quiet; then
  echo "  No new or updated posts — nothing to commit."
  exit 0
fi

count=$(git diff --staged --name-only | grep "src/content/blog/" | wc -l | tr -d ' ')
echo -e "${GREEN}  ${count} post file(s) staged${RESET}"

# 4. Commit and push
git commit -m "Import ${count} post(s) from WordPress [auto]"
git push

echo ""
echo -e "${GREEN}${BOLD}✓  Done — GitHub Actions will rebuild and deploy the site.${RESET}"
