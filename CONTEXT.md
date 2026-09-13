# Repository context

## Purpose

This is a personal collection of reusable instructions for AI coding agents. A skill is a portable directory containing a canonical `SKILL.md` and, when useful, supporting material or agent-specific metadata.

## Vocabulary

- **Skill**: A reusable set of instructions that an AI coding agent can invoke or load.
- **Canonical skill**: The `SKILL.md` file that defines the skill's behavior independently of a specific agent.
- **Adapter**: Optional metadata or installation guidance for a particular agent, such as `agents/openai.yaml`.
- **Collection**: This repository and its set of skill directories.
- **Portable**: Usable after copying the skill directory or pasting its Markdown into another supported agent.

## Decisions

- The canonical layout is `skills/<skill-name>/SKILL.md`.
- Codex metadata belongs in `skills/<skill-name>/agents/openai.yaml` when needed.
- Canonical skill front matter must remain portable; Claude-only front matter belongs in Claude adapters.
- The repository does not check in installed dependencies or local agent state.
- Skills should be agent-neutral by default; compatibility instructions belong in adapters or documentation.

## Open questions

- Whether this collection will eventually be published as an npm package in addition to GitHub-based installation.
- Which additional agents should receive first-class adapters as the collection grows.

## Deferred audit items

Compared with the local Matt Pocock reference repository, the following are intentionally deferred until they solve a demonstrated need:

- Bucket folders and bucket-level indexes for a larger collection.
- Human-facing docs pages for public presentation.
- Release automation, changelog/version management, and npm publication.
- A router/setup skill and broader issue-tracker workflow skills.
