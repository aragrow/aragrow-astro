#!/usr/bin/env bash
# ═════════════════════════════════════════════════════════════
#  AraGrow — Deploy to Firebase Hosting
# ═════════════════════════════════════════════════════════════
#
#  Four deploy paths are supported:
#
#  A) CI deploy (via GitHub Actions)
#     Pushes the current branch to GitHub. The workflow at
#     .github/workflows/firebase-deploy.yml runs on `main`:
#       - installs deps
#       - builds the Astro site
#       - deploys to Firebase using the FIREBASE_SERVICE_ACCOUNT
#         secret stored in the repo
#     Use this for the normal release flow — every push to main
#     becomes a production deploy.
#
#  B) Local deploy (direct from your machine)
#     Builds locally and deploys with firebase-tools using your
#     own `firebase login` session (not the service account).
#     Use this for quick sanity checks, hotfixes, or when the
#     GitHub Action is unavailable.
#
#  C) Import + local deploy
#     Runs the WordPress XML importer (scripts/import-wp.ts) to
#     regenerate src/content/blog/ from posts.xml, then builds
#     and deploys locally. Use this after exporting a fresh
#     posts.xml from WordPress and wanting to publish immediately
#     without going through git.
#
#  D) Build only
#     Runs `npm run build` and stops — no deploy. Useful for
#     inspecting the generated dist/ folder or testing the build
#     without publishing.
#
#  Usage:
#     ./deploy.sh ci       # option A — git push, let CI deploy
#     ./deploy.sh local    # option B — build + deploy from here
#     ./deploy.sh import   # option C — import posts.xml + local deploy
#     ./deploy.sh build    # option D — npm run build only, no deploy
#     ./deploy.sh          # prompts to choose
# ═════════════════════════════════════════════════════════════


# ─────────────────────────────────────────────────────────────
#  Shell options
# ─────────────────────────────────────────────────────────────
set -euo pipefail


# ─────────────────────────────────────────────────────────────
#  Colors
# ─────────────────────────────────────────────────────────────
GREEN="\033[0;32m"
RED="\033[0;31m"
BOLD="\033[1m"
RESET="\033[0m"


# ─────────────────────────────────────────────────────────────
#  Parse mode (CLI arg or interactive menu)
# ─────────────────────────────────────────────────────────────
mode="${1:-}"

if [[ -z "$mode" ]]; then
  echo ""
  echo -e "${BOLD}AraGrow — Deploy to Firebase Hosting${RESET}"
  echo "────────────────────────────────────"
  echo "  1) ci      — push to GitHub, let Actions build & deploy"
  echo "  2) local   — build & deploy directly from this machine"
  echo "  3) import  — import posts.xml, then build & deploy locally"
  echo "  4) build   — npm run build only, no deploy"
  echo "  0) exit    — quit without doing anything"
  echo ""
  read -rp "Choose [0/1/2/3/4]: " choice
  case "$choice" in
    0) echo "Bye."; exit 0 ;;
    1) mode="ci" ;;
    2) mode="local" ;;
    3) mode="import" ;;
    4) mode="build" ;;
    *) echo -e "${RED}✗  Invalid choice${RESET}"; exit 1 ;;
  esac
fi


# ─────────────────────────────────────────────────────────────
#  Dispatch
# ─────────────────────────────────────────────────────────────
case "$mode" in

  # ───── A) CI deploy — push to GitHub ──────────────────────
  ci)
    echo ""
    echo -e "${BOLD}Deploying via GitHub Actions …${RESET}"
    if [[ -n "$(git status --porcelain)" ]]; then
      echo -e "${RED}✗  You have uncommitted changes — commit or stash first.${RESET}"
      git status --short
      exit 1
    fi
    git push
    echo ""
    echo -e "${GREEN}✓  Pushed. Watch the build at:${RESET}"
    echo "   https://github.com/aragrow/aragrow-astro/actions"
    ;;

  # ───── B) Local deploy — build + firebase deploy ──────────
  local)
    echo ""
    echo -e "${BOLD}Building Astro site …${RESET}"
    npm run build

    echo ""
    echo -e "${BOLD}Deploying to Firebase Hosting …${RESET}"
    npx firebase-tools deploy --only hosting

    echo ""
    echo -e "${GREEN}✓  Deployed.${RESET}"
    ;;

  # ───── C) Import posts.xml + build + local deploy ─────────
  import)
    if [[ ! -f "posts.xml" ]]; then
      echo -e "${RED}✗  posts.xml not found in project root.${RESET}"
      echo "   Export from WordPress Admin → Tools → Export → All content"
      echo "   and save as: $(pwd)/posts.xml"
      exit 1
    fi

    echo ""
    echo -e "${BOLD}Importing posts from posts.xml …${RESET}"
    npx tsx scripts/import-wp.ts

    echo ""
    echo -e "${BOLD}Building Astro site …${RESET}"
    npm run build

    echo ""
    echo -e "${BOLD}Deploying to Firebase Hosting …${RESET}"
    npx firebase-tools deploy --only hosting

    echo ""
    echo -e "${GREEN}✓  Imported, built, and deployed.${RESET}"
    ;;

  # ───── D) Build only — no deploy ──────────────────────────
  build)
    echo ""
    echo -e "${BOLD}Building Astro site …${RESET}"
    npm run build
    echo ""
    echo -e "${GREEN}✓  Build complete — output in dist/${RESET}"
    ;;

  # ───── Unknown mode ───────────────────────────────────────
  *)
    echo -e "${RED}✗  Unknown mode: $mode${RESET}"
    echo "   Usage: ./deploy.sh [ci|local|import|build]"
    exit 1
    ;;

esac
