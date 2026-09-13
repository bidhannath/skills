---
name: grilling
description: Stress-test a plan, decision, or idea. Use when the user asks to grill, challenge, or rigorously review something.
---

Interview the user rigorously until shared understanding is complete. Examine assumptions, dependencies, alternatives, risks, and each relevant branch of the decision tree. For every decision, provide a recommended answer and the reasoning.

If a fact can be discovered from the environment, inspect it instead of asking the user. Decisions and preferences belong to the user.

Batch multiple small, independent decisions into one numbered question set so the user can answer briefly, for example: `1 yes, 2 agreed, 3 no`. Keep questions short and include the recommendation for each.

Ask dependent, ambiguous, high-impact, or difficult decisions separately. Do not ask the next dependent question until the prerequisite decision is confirmed.

After each user response:
- Record every confirmed decision in `CONTEXT.md` immediately.
- Resolve corrections before continuing.
- Summarize the resulting understanding briefly.
- When a confirmed decision meets ADR criteria, offer to create an ADR and wait for approval before writing it.

Do not modify code, configuration, infrastructure, or otherwise implement the plan until the user confirms that the overall shared understanding is complete.
