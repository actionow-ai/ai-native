# Startup reverify: 2026-05-22

Scope: branch `origin/agent/decisive-closer/startup-consolidation` at `9bf8374`.

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

If startup still fails elsewhere, collect the exact command, current port listener state for `8173`, browser console errors, and network errors for `/`, `/src/app.mjs`, `/node_modules/three/build/three.module.js`, and `/data/species-seed.json`.
