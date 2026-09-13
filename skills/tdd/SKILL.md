---
name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration or contract tests.
---

# Test-Driven Development

TDD is the red → green → refactor loop. This skill defines how to select
observable test boundaries, write maintainable tests, and implement behavior in
small vertical slices.

Every cycle must follow the repository's documented architecture, terminology,
test commands, and external-service policies.

## Repository discovery

Determine from repository configuration:

- Whether the codebase uses JavaScript, TypeScript, or both.
- Whether it uses CommonJS or ES modules.
- The configured test runner, assertion library, and mocking library.
- Whether TypeScript tests require compilation, transformation, or runtime transpilation.

Match existing repository conventions. Do not introduce TypeScript, change the
module system, or replace the test framework solely to implement a test.

Before planning or writing tests:

1. Locate the repository root.
2. Read `CONTEXT.md`, if present.
3. Read relevant ADRs and feature specifications.
4. Read the approved change-level `test-spec.md`, if present.
5. Inspect the test configuration and representative tests near the code being changed.

Use repository documentation for:

- Domain terminology.
- Stable interfaces and test seams.
- Test locations and commands.
- Contract and fixture sources.
- External-service and sandbox policies.
- Required verification suites.

Do not invent missing repository conventions. If missing information materially
changes the testing approach, identify the gap before implementation.

## What a good test is

A good test verifies observable behavior through a stable interface. It reads
like a specification and remains valid when internal implementation changes.

Expected values must come from an independent source of truth, such as:

- An approved requirement.
- An API, event, or provider contract.
- A known worked example.
- A reviewed fixture.
- A literal expected result.

See [tests.md](tests.md) for examples and [mocking.md](mocking.md) for test-double
and external-boundary guidance.

## Seams — where tests go

A seam is a stable boundary through which behavior can be exercised and
observed. Depending on the repository, seams may include:

- Public APIs, webhooks, CLIs, or SDK interfaces.
- Message producers and consumers.
- Outbound provider adapters.
- Stable module interfaces containing domain logic.
- Persistence and migration contracts.
- Scheduled jobs or event handlers.

Prefer the highest practical seam that produces fast, deterministic feedback.
Do not test private functions merely because they are easier to invoke.

Before the first cycle, record the intended seams in the working plan. If an
approved `test-spec.md` exists, its seam and coverage decisions are
authoritative.

Ask the user for confirmation only when a seam is materially ambiguous, costly,
destructive, or requires a live external system. Do not pause before every
individual test.

## Integration boundaries

For outbound integrations, the emitted request is observable behavior. Tests
may verify relevant parts of:

- HTTP method and endpoint.
- Headers and authentication placement.
- Request payload and serialization.
- Correlation and idempotency metadata.
- Timeout and retry configuration.

For inbound integrations, tests may verify:

- Authentication or webhook signatures.
- Payload validation.
- Provider-to-domain transformation.
- Duplicate and out-of-order delivery.
- Error mapping and acknowledgements.
- Correlation identifiers.

Use contract-faithful stubs, fakes, sandbox services, or recorded fixtures for external systems. Test doubles must preserve relevant success and failure shapes from the real provider contract.

## Anti-patterns

- **Implementation-coupled** — tests private functions, mocks internal
  collaborators, or asserts internal call order when the behavior can be
  observed through a stable interface.
- **Loose boundary mock** — returns an invented provider response that does not
  conform to the real provider contract.
- **Tautological** — calculates the expected result using the same logic as the
  implementation.
- **Horizontal slicing** — writes all tests before any implementation. Work in
  vertical slices so each cycle incorporates what the previous cycle revealed.
- **Unverified red** — assumes a new test fails without running it.
- **False green** — treats a test as passing without execution evidence.
- **Live-only test** — requires an external production system when a
  deterministic lower-level contract test could provide the required feedback.

## Rules of the loop

### Red

- Add one test for one observable behavior.
- Run it and verify that it fails for the expected reason.
- A compilation, setup, or unrelated environment failure is not a valid red.

### Green

- Implement only enough behavior to pass the test.
- Run the test and capture passing evidence.
- Do not add speculative behavior for future tests.

### Refactor

- Improve test or production structure while keeping behavior unchanged.
- Keep the relevant tests green throughout refactoring.
- Do not combine refactoring with new behavior.

Repeat in vertical slices.

Run the smallest relevant test during each cycle. Before completion, run the broader suites required by `CONTEXT.md`, the approved test specification, and the repository's CI contract.

## Integration failure coverage

Cover these behaviors when applicable:

- Timeout, retry, and backoff.
- Rate limiting.
- Duplicate delivery and idempotency.
- Ordering and eventual consistency.
- Partial, empty, or malformed responses.
- Provider authentication failures.
- Contract and schema version changes.
- Credential and sensitive-data redaction.
- Correlation across asynchronous requests and callbacks.
