# ai-native

`ai-native` is an agent coordination runtime for agent operators. Its first
job is to make asynchronous agent work legible: resume context, choose one
bounded next action, and publish a traceable artifact that peers and humans can
review.

## First User

The first user is an agent operator stewarding a project with multiple agents
that wake, read shared context, and contribute without constant human prompting.
The operator needs to know what changed, where the team is converging, which
blockers remain, and whether the next agent action is narrow enough to trust.

## Product Wedge

Default the project to coordination infrastructure, not an app scaffold,
customer-facing product, or eval workspace. The smallest useful proof is a
manual or scheduled wake that:

1. reads project context,
2. selects one bounded next action,
3. leaves a reviewable artifact/status trail.

## Core Workflows

1. **Resume and triage**: an agent reads recent chat, goals, plans, and repo
   state, then decides whether to stay silent, post a decision, update a plan,
   or create a small branch artifact.
2. **Coordinate bounded work**: an agent claims or advances one narrow plan
   step, checks nearby work to avoid duplication, works on a branch, and keeps
   plan status current.
3. **Publish traceable artifacts**: an agent posts the branch, commit, or
   decision it produced, with the source goal, acceptance criteria, and
   remaining risk visible.

## First Milestone Acceptance

The first milestone is successful when a scheduled or manual wake can produce a
complete coordination trace that matches `docs/golden-trace.fixture.json`.
That fixture is the acceptance contract for milestone 1: implementation can be
a CLI command or a library function, but it must emit the same required sections
before the product surface is chosen.

- source context: the chat, goals, plans, and repo state read before action
- decision record: explicit reason for acting or staying silent
- bounded action: one chat post, one plan update, or one branch commit
- artifact pointer: reviewable output linked back to the source goal or plan
- status output: project-visible note that says what changed and what remains

The milestone should not require a UI, generic app scaffold, multi-agent task
planner, or evaluation suite. Those only become useful after the coordination
trace is reliable.

## Technical Direction

Start with the contract before the product surface:

- **Runtime core**: TypeScript/Node.js library for context snapshots, decision
  traces, and artifact records.
- **Provider adapter**: first adapter targets team-context chat/goals/plans and
  git branch state.
- **Operator surface**: begin with CLI/readable markdown output; add a web
  console only after the trace shape is stable.
- **Persistence**: file-backed JSON or SQLite for local prototypes; defer hosted
  storage until the first trace format holds up.

Suggested repository layout once implementation starts:

```text
docs/
  golden-trace.fixture.json
  decisions/
packages/
  runtime/
  adapters/team-context/
apps/
  operator-cli/
examples/
  wake-trace/
```

## Constraints

- Work must happen on branches; main should stay protected until there is an
  accepted brief and first implementation slice.
- Every agent action needs provenance: what context was read, why this action
  was chosen, and where the artifact landed.
- Human override stays explicit. The runtime can recommend and execute bounded
  actions, but it must make veto points visible.
- Team-context is the first integration boundary; avoid premature provider
  abstraction until one adapter works end to end.

## Non-goals

- Generic AI app generator.
- Customer-facing SaaS application.
- Broad eval framework or benchmark suite.
- Autonomous long-running implementation without bounded plan steps.
- Polished web dashboard before the trace contract is proven.

## Open Decisions

- Is the first executable slice a CLI command that prints a wake trace, or a
  library function with fixture-based tests?
- Should the first persisted trace live in repo-local files, team-context memory,
  or both?
