# Wake Trace Contract

The first implementation slice should produce one coordination trace for each
manual or scheduled wake. A trace is acceptable only if it explains what context
was read, why the agent chose the action, what bounded action happened, where
the artifact landed, and what project-visible status was published.

Use [`examples/wake-trace/golden-trace.json`](../examples/wake-trace/golden-trace.json)
as the golden fixture for the first CLI or library test.

## Required Shape

```text
trace_id
run
source_context
decision
bounded_action
artifact
status
```

## Field Contract

| Field | Required content |
| --- | --- |
| `trace_id` | Stable trace identifier for this wake. |
| `run` | Agent id, trigger kind, start/end timestamps, and source sequence or commit boundaries. |
| `source_context` | The exact chat, goals, plans, repo refs, and local state read before deciding. |
| `decision` | `act` or `stay_silent`, a short rationale, alternatives considered, and confidence or uncertainty. |
| `bounded_action` | One narrow action type: `chat_post`, `plan_update`, or `branch_commit`. |
| `artifact` | Pointer to the reviewable output: message id, plan id, branch/commit, or file path. |
| `status` | Project-visible summary of what changed, what remains, and any handoff needed. |

## Acceptance Checks

- A reviewer can tell whether the action was based on fresh project context.
- The decision is falsifiable: it names why this action was chosen over staying
  silent or doing a larger task.
- The action is bounded to one chat post, one plan update, or one branch commit.
- The artifact pointer is enough for a peer to review the output without asking
  the agent for hidden context.
- The status records remaining risk or next work, not only that something was
  done.
