#!/bin/bash
#
# Local preview for sujith.design.
#
# Double-click this file in Finder. It pulls the latest from GitHub, serves the
# site at localhost:8000, and keeps pulling every 20 seconds — so when a pull
# request gets merged, the change lands in this folder on its own. You just
# refresh the browser.
#
# Press Control-C in the terminal window to stop.
#
# Requires: the folder to be a git clone (not an unzipped copy) and python3,
# which ships with macOS.

cd "$(dirname "$0")" || exit 1

PORT=8000
BRANCH=master
INTERVAL=20

if [ ! -d .git ]; then
  echo "This folder isn't a git clone, so there's nothing to pull from."
  echo "Clone it instead:"
  echo
  echo "  git clone https://github.com/suj009/sujith.github.io.git"
  echo
  read -r -p "Press return to close."
  exit 1
fi

# Kill the background puller when this window closes.
trap 'kill 0' EXIT

echo "Pulling the latest from origin/$BRANCH…"
git pull --ff-only origin "$BRANCH"

# Poll for merges. --ff-only means a pull can never quietly merge over local
# edits — if the branches diverge it just fails and leaves the folder alone.
(
  last=$(git rev-parse HEAD)
  while true; do
    sleep "$INTERVAL"
    git pull --ff-only -q origin "$BRANCH" 2>/dev/null
    now=$(git rev-parse HEAD)
    if [ "$now" != "$last" ]; then
      echo "  ↻ updated — $(git log --oneline -1 HEAD)"
      echo "    refresh your browser (Cmd-Shift-R to skip the cache)"
      last=$now
    fi
  done
) &

echo
echo "  Serving  http://localhost:$PORT"
echo "  Watching origin/$BRANCH every ${INTERVAL}s"
echo "  Control-C to stop"
echo

(sleep 1 && open "http://localhost:$PORT" 2>/dev/null) &

python3 -m http.server "$PORT"
