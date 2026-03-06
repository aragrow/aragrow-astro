#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  AraGrow WordPress Import Menu
#  Run: bash scripts/menu.sh
# ─────────────────────────────────────────────────────────────

set -euo pipefail

BOLD="\033[1m"
TEAL="\033[0;36m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
GREEN="\033[0;32m"
RESET="\033[0m"

# ── helpers ──────────────────────────────────────────────────
header() {
  echo ""
  echo -e "${TEAL}${BOLD}╔══════════════════════════════════════╗${RESET}"
  echo -e "${TEAL}${BOLD}║   AraGrow WordPress Import Menu      ║${RESET}"
  echo -e "${TEAL}${BOLD}╚══════════════════════════════════════╝${RESET}"
  echo ""
}

run_xml_import() {
  echo ""
  echo -e "${BOLD}Checking for posts.xml …${RESET}"
  if [[ ! -f "posts.xml" ]]; then
    echo -e "${RED}✗  posts.xml not found in project root.${RESET}"
    echo "   Export it from WordPress Admin → Tools → Export → All content"
    echo "   and place it at: $(pwd)/posts.xml"
    return 1
  fi
  echo -e "${GREEN}✓  posts.xml found.${RESET}"
  echo ""
  echo -e "${BOLD}Running XML import …${RESET}"
  npx tsx scripts/import-wp.ts
}

run_api_import() {
  echo ""

  # Check env vars
  local user="${WP_USER:-}"
  local pass="${WP_APP_PASSWORD:-}"

  if [[ -z "$user" || -z "$pass" ]]; then
    echo -e "${YELLOW}WP_USER and/or WP_APP_PASSWORD not set in environment.${RESET}"
    echo ""
    read -rp "  WordPress username: " user
    read -rsp "  Application Password: " pass
    echo ""
    export WP_USER="$user"
    export WP_APP_PASSWORD="$pass"
  else
    echo -e "${GREEN}✓  Using WP_USER=${user}${RESET}"
  fi

  echo ""
  echo -e "${BOLD}Running REST API import …${RESET}"
  npx tsx scripts/fetch-wp-api.ts
}

commit_and_push() {
  echo ""
  echo -e "${BOLD}Staging new/updated blog files …${RESET}"

  if git diff --quiet && git diff --staged --quiet; then
    echo "  No changes to commit."
    return 0
  fi

  git add src/content/blog/ public/images/blog/ 2>/dev/null || true

  if git diff --staged --quiet; then
    echo "  Nothing staged — no new posts imported."
    return 0
  fi

  local count
  count=$(git diff --staged --name-only | grep "src/content/blog/" | wc -l | tr -d ' ')
  echo -e "${GREEN}  ${count} post file(s) staged.${RESET}"

  git commit -m "Import ${count} post(s) from WordPress [auto]"
  git push
  echo -e "${GREEN}✓  Pushed — GitHub Actions will rebuild the site.${RESET}"
}

# ── main menu ─────────────────────────────────────────────────
header

echo -e "  ${BOLD}1)${RESET} Import from posts.xml    ${YELLOW}(full import, no internet required)${RESET}"
echo -e "  ${BOLD}2)${RESET} Fetch from REST API      ${YELLOW}(incremental, requires WP API access)${RESET}"
echo -e "  ${BOLD}3)${RESET} Import + commit & push   ${YELLOW}(XML import then auto-deploy)${RESET}"
echo -e "  ${BOLD}4)${RESET} API fetch + commit & push ${YELLOW}(REST import then auto-deploy)${RESET}"
echo -e "  ${BOLD}q)${RESET} Quit"
echo ""

read -rp "Select option: " choice

case "$choice" in
  1)
    run_xml_import
    ;;
  2)
    run_api_import
    ;;
  3)
    run_xml_import && commit_and_push
    ;;
  4)
    run_api_import && commit_and_push
    ;;
  q|Q)
    echo "Bye."
    exit 0
    ;;
  *)
    echo -e "${RED}Invalid option.${RESET}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}${BOLD}Done.${RESET}"
