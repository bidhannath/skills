# Personal AI agent skills

Portable, personal skills for Codex, Claude, and other AI coding agents.

This repository is inspired by [Matt Pocock's skills repository](https://github.com/mattpocock/skills). The skills are adapted for my own workflow and may be copied into any agent that supports Markdown-based instructions.

## Repository layout

```text
skills/
  <skill-name>/
    SKILL.md                 # canonical instructions
    agents/openai.yaml       # optional Codex display metadata
    ...                      # optional references, examples, or tests
AGENTS.md                    # maintenance instructions for AI agents
CONTEXT.md                   # repository vocabulary and decisions
```

`SKILL.md` is the portable source of truth. Agent-specific metadata is optional and must not contain the only copy of a skill's behavior.

## Use a skill

Copy a skill directory into the agent's supported skills directory, or paste the contents of its `SKILL.md` into that agent's custom instruction field.

The repository installer handles target-specific metadata. Claude is the default target:

```bash
npm run install
npm run install:claude
npm run install:codex
npm run install:opencode
```

Use `--dest` to choose a different destination:

```bash
npm run install -- --target=codex --dest=/path/to/project/.codex/skills
```

The source files are never modified. Claude receives `SKILL.md` without
`agents/openai.yaml`; Codex receives `agents/openai.yaml` and a copy of
`SKILL.md` with Claude-only front matter removed; OpenCode receives portable
Markdown without either agent's metadata.

For Codex, copy to one of these locations depending on scope:

```bash
cp -R skills/<skill-name> ~/.codex/skills/
```

For Claude Code, copy the skill directory into the project's `.claude/skills/` directory or your user-level Claude skills directory:

```bash
mkdir -p .claude/skills
cp -R skills/<skill-name> .claude/skills/
```

To load the whole collection as a local Claude Code plugin during development:

```bash
claude --plugin-dir .
```

For agents supporting the Vercel Skills CLI, install directly from GitHub:

```bash
npx skills add bidhannath/skills --skill <skill-name>
```

Use `-g` for a user-level installation when supported:

```bash
npx skills add bidhannath/skills --skill <skill-name> -g
```

The Skills CLI does not run this repository's compatibility transformation. Use the repository installer when target-specific metadata matters.

## Available skills

The current collection includes:

- `code-review` — review a diff against repository standards and its originating specification.
- `domain-modeling` — build a precise domain glossary and record meaningful architectural decisions.
- `grill-me` — start a concise grilling session.
- `grill-with-docs` — grill a design while maintaining domain documentation.
- `grilling` — stress-test plans and decisions through a structured interview.
- `handoff` — write a compact handoff for another agent.
- `implement` — implement work from a specification or tickets.
- `tdd` — guide red-green-refactor development.

Some skills reference other skills with `/skill-name` or `$skill-name`; install the referenced skills too when using those workflows.

## Agent compatibility

Canonical `SKILL.md` files use Claude-compatible front matter. The installer
removes `disable-model-invocation` for Codex and omits `agents/openai.yaml` for
Claude. This keeps one maintained skill body while producing compatible copies.

To create or update local symlinks in supported user-level skill directories:

```bash
npm run link
```

## Validate the collection

No runtime dependency is required. With Node.js installed:

```bash
npm run validate
npm run list
```

## Add or modify a skill

1. Create or update `skills/<skill-name>/SKILL.md`.
2. Keep instructions agent-neutral unless they are specifically about an agent integration.
3. Add `agents/openai.yaml` only when Codex needs display metadata or invocation policy.
4. Link supporting files with relative paths and keep them inside the skill directory.
5. Add the skill to this README and run `npm run validate`.
6. Review the diff before committing.

## Future backlog

Compared with the reference repository, these are intentionally deferred:

- Add engineering/productivity bucket folders and bucket-level indexes if the collection becomes large.
- Add human-facing docs pages if skills need public presentation beyond their `SKILL.md` files.
- Add release automation, changelog/version management, and a non-private npm package only when publishing becomes a real requirement.
- Add a router skill and setup skill only when this personal collection needs them; the current set remains deliberately small.

## License and attribution

These are personal workflow materials. Individual skills may retain attribution or licensing requirements from their sources; check each skill before redistributing it.
