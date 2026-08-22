#!/bin/bash
#
# Local preview for sujith.design.
#
# Double-click this file in Finder. It pulls the latest from GitHub, installs
# anything new, and starts the dev server at localhost:3000 with hot reload —
# edit a file, save, and the browser updates on its own.
#
# Press Control-C in the terminal window to stop.
#
# Requires: the folder to be a git clone (not an unzipped copy), and Node 22 or
# newer. If you do not have Node, install it from https://nodejs.org (take the
# LTS build) and then double-click this again.

cd "$(dirname "$0")" || exit 1

BRANCH=master

if [ ! -d .git ]; then
  echo "This folder isn't a git clone, so there's nothing to pull from."
  echo "Clone it instead:"
  echo
  echo "  git clone https://github.com/suj009/sujith.github.io.git"
  echo
  read -r -p "Press return to close."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "Node isn't installed — the site needs it to build now that it's a"
  echo "Next.js app rather than plain HTML files."
  echo
  echo "Install the LTS build from https://nodejs.org, then run this again."
  echo
  read -r -p "Press return to close."
  exit 1
fi

echo "Pulling the latest from origin/$BRANCH…"
git pull --ff-only origin "$BRANCH"

# Only reinstall when the lockfile actually changed — a full install on every
# launch would add half a minute to something you double-click many times a day.
if [ ! -d node_modules ] || [ package-lock.json -nt node_modules ]; then
  echo "Installing dependencies…"
  npm install
fi

echo
echo "  Serving  http://localhost:3000"
echo "  Edits reload automatically — no need to restart"
echo "  Control-C to stop"
echo

(sleep 3 && open "http://localhost:3000" 2>/dev/null) &

npm run dev
