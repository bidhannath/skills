#!/usr/bin/env bash
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
DESTS=("$HOME/.codex/skills" "$HOME/.claude/skills" "$HOME/.agents/skills")

while IFS= read -r -d '' skill_md; do
  name="$(basename "$(dirname "$skill_md")")"
  src="$(dirname "$skill_md")"
  for dest in "${DESTS[@]}"; do
    mkdir -p "$dest"
    target="$dest/$name"
    if [ -e "$target" ] && [ ! -L "$target" ]; then
      echo "skip $target: existing directory; remove it or link manually" >&2
      continue
    fi
    ln -sfn "$src" "$target"
    echo "linked $name -> $target"
  done
done < <(find "$REPO/skills" -mindepth 2 -maxdepth 2 -type f -name SKILL.md -print0 | sort -z)
