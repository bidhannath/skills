---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: true
---

Implement the work described by the user in the spec or tickets.

Use `/tdd` (`$tdd` in Codex) where possible, at pre-agreed seams.

Run typechecking regularly (if typescript repository), single test files regularly, and the full test suite once at the end.

Once done, use `/code-review` (`$code-review` in Codex) to review the work.

Do not commit your work rather give the commit command with proper commit message and rely on the user to commit it.
