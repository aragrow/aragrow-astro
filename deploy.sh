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
#  E) Archive posts.xml
#     Moves a processed posts.xml from the project root into
#     post-uploaded/posts-N.xml (next free slot). Run this
#     manually after you've verified the import looks right —
#     the import path itself no longer auto-archives.
#
#  Usage:
#     ./deploy.sh ci       # option A — git push, let CI deploy
#     ./deploy.sh local    # option B — build + deploy from here
#     ./deploy.sh import   # option C — import posts.xml + local deploy
#     ./deploy.sh build    # option D — npm run build only, no deploy
#     ./deploy.sh archive  # option E — archive posts.xml only
#     ./deploy.sh          # prompts to choose
#
# ─────────────────────────────────────────────────────────────
#  Quickstart — import, build, and deploy to the cloud
# ─────────────────────────────────────────────────────────────
#
#  One command does all three:
#
#      ./deploy.sh import
#
#  Which runs, in order:
#    1. Import — npx tsx scripts/import-wp.ts parses posts.xml,
#       writes src/content/blog/<slug>.md, and downloads images
#       to public/images/blog/.
#    2. Build  — npm run build → writes dist/.
#    3. Deploy — npx firebase-tools deploy --only hosting
#       pushes dist/ to Firebase Hosting.
#
#  Prereqs (one-time):
#    - posts.xml in the project root
#      (WP Admin → Tools → Export → All content)
#    - Logged in: npx firebase-tools login
#
#  After it succeeds:
#    - Verify the live site looks right.
#    - Archive the XML: ./deploy.sh archive
#      (moves posts.xml → post-uploaded/posts-N.xml)
#
#  If something fails mid-flow, fix and re-run — posts.xml is
#  still in place and the import is idempotent.
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
DIM="\033[2m"
RESET="\033[0m"


# ─────────────────────────────────────────────────────────────
#  Local preview info — printed at the end of every mode
# ─────────────────────────────────────────────────────────────
print_local_access() {
  echo ""
  echo -e "${BOLD}Preview locally:${RESET}"
  echo -e "  ${BOLD}npm run dev${RESET}     → http://localhost:4321/"
  echo -e "  ${DIM}(hot-reloads on file changes — best for editing)${RESET}"
  echo ""
  echo -e "  ${BOLD}npm run preview${RESET} → http://localhost:4321/"
  echo -e "  ${DIM}(serves the built dist/ — matches what gets deployed)${RESET}"
  echo ""
}


# ─────────────────────────────────────────────────────────────
#  Quickstart docs — printed before the menu and on `help`
# ─────────────────────────────────────────────────────────────
print_quickstart() {
  echo ""
  echo -e "${BOLD}AraGrow — Deploy to Firebase Hosting${RESET}"
  echo "═════════════════════════════════════════════════════════════"
  echo ""
  echo -e "${BOLD}Quickstart — import, build, and deploy to the cloud${RESET}"
  echo "  One command does all three:"
  echo ""
  echo -e "      ${BOLD}./deploy.sh import${RESET}"
  echo ""
  echo "  Which runs, in order:"
  echo "    1. Import — npx tsx scripts/import-wp.ts parses posts.xml,"
  echo "       writes src/content/blog/<slug>.md, and downloads images"
  echo "       to public/images/blog/."
  echo "    2. Build  — npm run build → writes dist/."
  echo "    3. Deploy — npx firebase-tools deploy --only hosting"
  echo "       pushes dist/ to Firebase Hosting."
  echo ""
  echo -e "${BOLD}Prereqs (one-time):${RESET}"
  echo "  - posts.xml in the project root"
  echo "    (WP Admin → Tools → Export → All content)"
  echo "  - Logged in: npx firebase-tools login"
  echo ""
  echo -e "${BOLD}After it succeeds:${RESET}"
  echo "  - Verify the live site looks right."
  echo "  - Archive the XML: ./deploy.sh archive"
  echo "    (moves posts.xml → post-uploaded/posts-N.xml)"
  echo ""
  echo -e "${DIM}  If something fails mid-flow, fix and re-run — posts.xml is${RESET}"
  echo -e "${DIM}  still in place and the import is idempotent.${RESET}"
  echo ""
}


# ─────────────────────────────────────────────────────────────
#  Parse mode (CLI arg or interactive menu)
# ─────────────────────────────────────────────────────────────
mode="${1:-}"

# Explicit help flag — print docs and exit.
if [[ "$mode" == "help" || "$mode" == "-h" || "$mode" == "--help" ]]; then
  print_quickstart
  exit 0
fi

if [[ -z "$mode" ]]; then
  print_quickstart
  echo -e "${BOLD}Menu${RESET}"
  echo "────────────────────────────────────"
  echo "  1) ci       — push to GitHub, let Actions build & deploy"
  echo "  2) local    — build & deploy directly from this machine"
  echo "  3) import   — import posts.xml, then build & deploy locally"
  echo "  4) build    — npm run build only, no deploy"
  echo "  5) archive  — move posts.xml → post-uploaded/posts-N.xml"
  echo "  0) exit     — quit without doing anything"
  echo ""
  read -rp "Choose [0/1/2/3/4/5]: " choice
  case "$choice" in
    0) echo "Bye."; exit 0 ;;
    1) mode="ci" ;;
    2) mode="local" ;;
    3) mode="import" ;;
    4) mode="build" ;;
    5) mode="archive" ;;
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
    print_local_access
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
    print_local_access
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
    echo -e "   Run ${BOLD}./deploy.sh archive${RESET} once you've verified the import."
    print_local_access
    ;;

  # ───── D) Build only — no deploy ──────────────────────────
  build)
    echo ""
    echo -e "${BOLD}Building Astro site …${RESET}"
    npm run build
    echo ""
    echo -e "${GREEN}✓  Build complete — output in dist/${RESET}"
    print_local_access
    ;;

  # ───── E) Archive posts.xml — manual step ─────────────────
  archive)
    if [[ ! -f "posts.xml" ]]; then
      echo -e "${RED}✗  posts.xml not found in project root — nothing to archive.${RESET}"
      exit 1
    fi
    mkdir -p post-uploaded
    n=1
    while [[ -e "post-uploaded/posts-$n.xml" ]]; do
      n=$((n + 1))
    done
    archive="post-uploaded/posts-$n.xml"
    mv posts.xml "$archive"
    echo ""
    echo -e "${GREEN}✓  Archived posts.xml → $archive${RESET}"
    print_local_access
    ;;

  # ───── Unknown mode ───────────────────────────────────────
  *)
    echo -e "${RED}✗  Unknown mode: $mode${RESET}"
    echo "   Usage: ./deploy.sh [ci|local|import|build|archive|help]"
    exit 1
    ;;

esac
