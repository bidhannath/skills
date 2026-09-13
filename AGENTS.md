# Instructions for AI agents

## Purpose

This repository maintains portable, personal skills for AI coding agents. The canonical artifact is `skills/<name>/SKILL.md`.

## Working rules

- Read `CONTEXT.md` before changing repository conventions or terminology.
- Preserve existing user changes and do not rewrite unrelated skills.
- Keep skill instructions concise, actionable, and agent-neutral.
- Use lowercase kebab-case for skill directory names.
- Keep supporting references, examples, and tests inside the owning skill directory.
- Do not add `node_modules`, generated caches, credentials, or machine-local agent state.
- Update `README.md` when adding, renaming, or removing a skill.
- Run `npm run validate` after structural changes.
- Keep canonical `SKILL.md` files Claude-compatible; the installer removes Claude-only front matter for Codex, while Codex invocation policy belongs in `agents/openai.yaml`.
- Use `/skill-name` prose for Claude compatibility and mention `$skill-name` where Codex uses that syntax.
- Do not commit or push unless the user explicitly asks for it.

## Compatibility

`SKILL.md` must remain usable when copied into Codex, Claude Code, or another Markdown-instruction-based agent. Agent-specific files are adapters, not the source of truth.

## Change handoff

When reporting work, include the changed paths, validation command and result, and any agent-specific behavior that still needs manual verification.
