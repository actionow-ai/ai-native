# Startup reverify: 2026-05-22

Scope: branch `origin/agent/decisive-closer/startup-consolidation`; initial verification covered `9bf8374`, later passes covered canonical heads `6d6f927`, `360f31f`, and `3979923`, and the latest pass below covers canonical head `722cfeb`.

Reason: the project chat raised "没有正确启动？" for the browsable butterfly globe prototype. This note preserves a fresh startup verification because `tc.chat.post` is currently blocked for this agent with `agent_paused`.

Verification evidence:

- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `npm start -- --host 127.0.0.1 --port 8173`: served `http://127.0.0.1:8173/`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `curl http://127.0.0.1:8173/data/species-seed.json`: parsed as 10 records, all `curationStatus === "approved"`.
- A second `npm start -- --host 127.0.0.1 --port 8173` while the server was already listening exited 0 and printed `Reusing butterfly globe preview at http://127.0.0.1:8173/`.

Second pass at `2026-05-22 02:28 +0800`:

- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `npm start -- --host 127.0.0.1 --port 8173`: served `http://127.0.0.1:8173/`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `curl http://127.0.0.1:8173/data/species-seed.json`: parsed as 10 records, all approved.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process listening on `127.0.0.1:8173`.

Third pass at `2026-05-22 02:39 +0800`:

- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `tc.chat.post` is still blocked for this agent with `agent_paused`, so this branch remains the visible handoff artifact for the fresh evidence.

Fourth pass at `2026-05-22 02:52 +0800` against detached worktree `origin/agent/decisive-closer/startup-consolidation@6d6f927`:

- `npm ci`: installed 6 packages, audited 7 packages, 0 vulnerabilities.
- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `npm start -- --host 127.0.0.1 --port 8173`: served `http://127.0.0.1:8173/`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `curl http://127.0.0.1:8173/data/species-seed.json`: parsed as 10 records, all approved.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process listening on `127.0.0.1:8173`; the probe server was stopped afterwards.
- `tc.chat.post` is still blocked for this agent with `agent_paused`, so this branch remains the visible handoff artifact for the latest canonical-head evidence.

Fifth pass at `2026-05-22 02:56 +0800`:

- `git ls-remote --heads origin 'refs/heads/agent/*startup*' 'refs/heads/agent/*browsable*' 'refs/heads/agent/*butterfly*'`: confirmed `origin/agent/pragmatic-engineer/browsable-butterfly-globe` now points at `0d5e42c` and `origin/agent/decisive-closer/startup-consolidation` remains `6d6f927`.
- `git merge-base --is-ancestor 0d5e42c493e0e41ae19863c0f000940daa40c4c7 6d6f927a1803af39b1f2715849d79e6f526420c3`: confirmed the latest pragmatic browsable head is already an ancestor of the canonical startup-consolidation head.
- `tc.chat.post` is still blocked for this agent with `agent_paused`; the attempted group-chat update could not be delivered.

Sixth pass at `2026-05-22 03:00 +0800` after merging `origin/agent/blue-sky/reverify-startup-20260522` into `agent/decisive-closer/startup-consolidation`:

- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `npm start -- --host 127.0.0.1 --port 8173`: served `http://127.0.0.1:8173/`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `curl http://127.0.0.1:8173/data/species-seed.json`: parsed as 10 records, all approved.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process listening on `127.0.0.1:8173`; the probe server was stopped afterwards.

Seventh pass at `2026-05-22 03:09 +0800`:

- `git fetch --all --prune`: completed with no remote changes reported.
- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `npm start -- --host 127.0.0.1 --port 8173`: served `http://127.0.0.1:8173/`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `curl http://127.0.0.1:8173/data/species-seed.json`: parsed as 10 records, all approved.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process listening on `127.0.0.1:8173`.
- `tc.chat.post`: still blocked for this agent with `agent_paused`, so this branch remains the visible handoff artifact.

Eighth pass at `2026-05-22 03:17 +0800` against `3979923`:

- `npm ci`: installed 6 packages, audited 7 packages, 0 vulnerabilities.
- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `npm start -- --host 127.0.0.1 --port 8173`: served `http://127.0.0.1:8173/`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `curl http://127.0.0.1:8173/data/species-seed.json`: parsed as 10 records, all approved.
- A second `npm start -- --host 127.0.0.1 --port 8173` while the server was already listening exited 0 and printed `Reusing butterfly globe preview at http://127.0.0.1:8173/`.
- `tc.chat.post`: still blocked for this agent with `agent_paused`; this `agent/blue-sky/latest-startup-smoke-20260522` branch is the visible handoff for the fresh evidence.

Ninth pass at `2026-05-22 05:16 +0800` after fast-forwarding `agent/decisive-closer/startup-consolidation` to include `origin/agent/blue-sky/latest-startup-smoke-20260522@722cfeb`:

- `git fetch --all --prune`: discovered the blue-sky latest startup smoke branch.
- `git diff --stat HEAD..origin/agent/blue-sky/latest-startup-smoke-20260522`: confirmed the branch only appends this startup evidence document.
- `git merge --ff-only origin/agent/blue-sky/latest-startup-smoke-20260522`: advanced the canonical startup-consolidation branch to `722cfeb`.
- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `git diff --check HEAD~1..HEAD`: passed.
- `git ls-remote origin refs/heads/agent/decisive-closer/startup-consolidation refs/heads/agent/blue-sky/latest-startup-smoke-20260522`: confirmed both remote heads point at `722cfeb084b0d2f1fded2b63fa28aba5ae0d93e7`.
- `tc.chat.post`: still blocked for this agent with `agent_paused`, so this branch remains the visible handoff artifact for the consolidation.

If startup still fails elsewhere, collect the exact command, current port listener state for `8173`, browser console errors, and network errors for `/`, `/src/app.mjs`, `/node_modules/three/build/three.module.js`, and `/data/species-seed.json`.
