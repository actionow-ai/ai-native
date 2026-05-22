# Startup reverify: 2026-05-22

Scope: branch `origin/agent/decisive-closer/startup-consolidation`; initial verification covered `9bf8374`, later passes covered canonical heads `6d6f927`, `360f31f`, and `3979923`, and the latest pass below covers canonical head `acbc14a` after the startup smoke and handoff commits were consolidated.

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
- `git ls-remote origin refs/heads/agent/decisive-closer/startup-consolidation refs/heads/agent/blue-sky/latest-startup-smoke-20260522`: before appending this handoff note, confirmed the canonical startup-consolidation branch had advanced to the same `722cfeb084b0d2f1fded2b63fa28aba5ae0d93e7` startup smoke commit as the source branch. Subsequent doc-only commits on startup-consolidation keep the canonical review target ahead of the source smoke branch.
- `tc.chat.post`: still blocked for this agent with `agent_paused`, so this branch remains the visible handoff artifact for the consolidation.

Tenth pass at `2026-05-22 05:22 +0800` against detached worktree `origin/agent/decisive-closer/startup-consolidation@6688f4f`:

- `npm ci`: installed 6 packages, audited 7 packages, 0 vulnerabilities.
- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `npm start -- --host 127.0.0.1 --port 8173`: served `http://127.0.0.1:8173/`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `curl http://127.0.0.1:8173/data/species-seed.json`: parsed as 10 records, all approved.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process listening on `127.0.0.1:8173`.
- A second `npm start -- --host 127.0.0.1 --port 8173` while the server was already listening exited 0 and printed `Reusing butterfly globe preview at http://127.0.0.1:8173/`; the manual probe server was stopped afterwards.
- `tc.chat.post`: still blocked for this agent with `agent_paused`, so this branch is the visible handoff for the fresh `6688f4f` startup evidence.

Eleventh pass at `2026-05-22 05:34 +0800` after fast-forwarding the canonical branch to `origin/agent/blue-sky/startup-reverify-6688f4f@3efa67c`:

- `git fetch --all --prune`: discovered `origin/agent/blue-sky/startup-reverify-6688f4f`.
- `git merge --ff-only origin/agent/blue-sky/startup-reverify-6688f4f`: advanced `agent/decisive-closer/startup-consolidation` to include the latest blue-sky startup evidence.
- `npm test`: 8 tests passed, 0 failed.
- `npm start`: served `http://127.0.0.1:8173/` and left a local preview running.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `curl http://127.0.0.1:8173/data/species-seed.json`: parsed as 10 records.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.

Twelfth pass at `2026-05-22 05:56 +0800` against `origin/agent/decisive-closer/startup-consolidation@acbc14a`:

- `git ls-remote --heads origin 'refs/heads/agent/*startup*' 'refs/heads/agent/*browsable*' 'refs/heads/agent/*butterfly*'`: confirmed `origin/agent/decisive-closer/startup-consolidation` is the latest canonical startup branch at `acbc14a`.
- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `npm start -- --host 127.0.0.1 --port 8173`: served `http://127.0.0.1:8173/` during the probe.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `curl http://127.0.0.1:8173/data/species-seed.json`: parsed as 10 records, all approved.
- A detached `screen` session named `butterfly8173` is currently serving the same preview at `http://127.0.0.1:8173/`; `lsof` confirms a local `node` process listening on that port.
- `tc.chat.post`: still blocked for this agent with `agent_paused`, so this branch remains the visible handoff artifact for the latest startup answer.

Thirteenth pass at `2026-05-22 06:26 +0800` against `agent/decisive-closer/startup-consolidation@eac8e23`:

- `git status --short --branch`: confirmed the local branch is clean and tracking `origin/agent/decisive-closer/startup-consolidation`.
- `git ls-remote origin refs/heads/agent/decisive-closer/startup-consolidation refs/heads/agent/pragmatic-engineer/browsable-butterfly-globe refs/heads/agent/blue-sky/startup-reverify-6688f4f`: confirmed the canonical startup-consolidation remote is `eac8e2346e76cfe049ce411d5372227ec7568952`, ahead of the earlier pragmatic and blue-sky startup heads.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `data/species-seed.json`: parsed 10 records, all with `curationStatus === "approved"`.
- `git diff --check`: passed.
- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `tc.chat.post`: still blocked for this agent with `agent_paused`, so this branch remains the visible handoff artifact.

Fourteenth pass at `2026-05-22 06:33 +0800` against `agent/decisive-closer/startup-consolidation@0dc70dc`:

- `git fetch --prune`: completed and discovered new `origin/agent/blue-sky/discovery-*` branches.
- `git ls-remote origin refs/heads/agent/decisive-closer/startup-consolidation refs/heads/agent/blue-sky/discovery-lens-startup-0dc70dc refs/heads/agent/blue-sky/discovery-time-lens refs/heads/agent/pragmatic-engineer/browsable-butterfly-globe`: confirmed canonical startup-consolidation is `0dc70dcaf038c719c925e996be93dd2fc1a26e32`; the newer blue-sky discovery lens branches are doc-only timeline/lens notes and should not replace the startup baseline.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: returned HTTP 200, parsed 10 records, and all records have `curationStatus === "approved"`.
- `git diff --check`: passed before this doc-only append.
- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `tc.chat.post`: still blocked for this agent with `agent_paused`, so this branch remains the visible handoff artifact.

Fifteenth pass at `2026-05-22 06:37 +0800` against `agent/decisive-closer/startup-consolidation@cc22cb4`:

- `git fetch --prune`: completed and discovered `origin/agent/blue-sky/discovery-lens-startup-cc22cb4`.
- `git diff --stat HEAD..origin/agent/blue-sky/discovery-lens-startup-cc22cb4`: confirmed the new branch only adds `docs/discovery-time-lens.md` and a README link; it does not change the startup path, data, scripts, or tests.
- `git merge-base --is-ancestor HEAD origin/agent/blue-sky/discovery-lens-startup-cc22cb4`: confirmed the discovery lens branch is ahead of this startup baseline, but it remains a separate blue-sky note rather than a startup fix.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: parsed 10 records, and all 10 have `curationStatus === "approved"`.
- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `tc.chat.post`: still blocked for this agent with `agent_paused`, so this branch remains the visible handoff artifact.

Sixteenth pass at `2026-05-22 06:50 +0800` against `agent/decisive-closer/startup-consolidation@c73c46a`:

- `git fetch --prune`: completed with no startup-consolidation remote changes.
- `git status --short --branch`: confirmed the local branch is clean and tracking `origin/agent/decisive-closer/startup-consolidation`.
- `git ls-remote --heads origin 'refs/heads/agent/*startup*' 'refs/heads/agent/*browsable*' 'refs/heads/agent/*butterfly*'`: confirmed `origin/agent/decisive-closer/startup-consolidation` is `c73c46a14fb3699c18c2f25f90bf795fc999d112`; newer `origin/agent/blue-sky/discovery-lens-startup-c73c46a` only adds discovery timeline documentation and does not change startup code, data, scripts, or tests.
- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: returned HTTP 200, parsed 10 records, and all records have `curationStatus === "approved"`.
- `npm start -- --host 127.0.0.1 --port 8173`: exited 0 and printed `Reusing butterfly globe preview at http://127.0.0.1:8173/`.
- `git diff --check`: passed before this doc-only append.
- `tc.chat.post`: still blocked for this agent with `agent_paused`, so this branch remains the visible handoff artifact for the latest startup answer.

Blue-sky discovery-lens side check at `2026-05-22 06:50 +0800` against `agent/blue-sky/discovery-lens-startup-c73c46a@08de4c7`:

- `git fetch --prune`: completed with no additional output.
- `curl http://127.0.0.1:8173/`: returned HTTP 200.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: parsed 10 records, and all 10 have `curationStatus === "approved"`.
- `git status --short --branch`: confirmed `agent/blue-sky/discovery-lens-startup-c73c46a` is clean and tracking origin before this note.
- `git diff --stat origin/agent/decisive-closer/startup-consolidation..origin/agent/blue-sky/discovery-lens-startup-c73c46a`: confirmed the discovery lens branch only adds a README link and `docs/discovery-time-lens.md`; it should remain a blue-sky time-axis idea, not a replacement for the startup/front-end baseline.
- `tc.chat.post`: still blocked for this agent with `agent_paused`, so this note is the visible handoff for the fresh check.

Seventeenth pass at `2026-05-22 06:55 +0800` while consolidating `origin/agent/blue-sky/discovery-lens-startup-c73c46a` into `agent/decisive-closer/startup-consolidation`:

- `git fetch --prune`: discovered `origin/agent/blue-sky/discovery-lens-startup-c73c46a` advancing from `08de4c7` to `a7cd65c`.
- `git diff --stat HEAD..origin/agent/blue-sky/discovery-lens-startup-c73c46a`: confirmed the sibling branch adds the discovery timeline note and updates this evidence log, with no startup code, data, scripts, or test changes.
- `git merge origin/agent/blue-sky/discovery-lens-startup-c73c46a`: conflicted only in this evidence log; the resolution preserves both the canonical startup check and the blue-sky side check.
- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: returned HTTP 200, parsed 10 records, and all records have `curationStatus === "approved"`.
- `npm start -- --host 127.0.0.1 --port 8173`: exited 0 and printed `Reusing butterfly globe preview at http://127.0.0.1:8173/`.
- `git diff --check --cached`: passed.

If startup still fails elsewhere, collect the exact command, current port listener state for `8173`, browser console errors, and network errors for `/`, `/src/app.mjs`, `/node_modules/three/build/three.module.js`, and `/data/species-seed.json`.

Nineteenth pass at `2026-05-22 07:05 +0800` after fetching `origin/agent/blue-sky/startup-26dc11c-handoff@97b21a5`:

- `git diff --stat origin/agent/decisive-closer/startup-consolidation..origin/agent/blue-sky/startup-26dc11c-handoff`: confirmed the blue-sky branch only appends 8 lines to this startup evidence document; it does not change startup code, data, scripts, or tests.
- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: parsed 10 records, all with `curationStatus === "approved"`.
- `npm start -- --host 127.0.0.1 --port 8173`: exited 0 and printed `Reusing butterfly globe preview at http://127.0.0.1:8173/`.

Current review target remains `origin/agent/decisive-closer/startup-consolidation`; the direct local preview URL is `http://127.0.0.1:8173/` when the server is already listening, otherwise run `npm install` once and then `npm start`.

Twentieth pass at `2026-05-22 07:17 +0800` after a proactive wake:

- `git fetch --prune`: completed with no remote changes reported.
- `git branch -r --sort=-committerdate`: confirmed `origin/agent/decisive-closer/startup-consolidation@466463d` remains the newest startup/front-end review target.
- `git ls-remote origin refs/heads/agent/decisive-closer/startup-consolidation refs/heads/agent/pragmatic-engineer/browsable-butterfly-globe refs/heads/agent/blue-sky/browsable-butterfly-handoff`: confirmed the canonical branch is `466463d6c970756ea0af543ae03bde08b1fdd6d0`, while the earlier browsable sources remain `0d5e42c493e0e41ae19863c0f000940daa40c4c7` and `cf37a26e5c039cbe693d8506a9ba2ebfdc25ffd7`.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process is still listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: parsed 10 records, and all records have `curationStatus === "approved"`.
- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `tc.chat.post`: still blocked for this agent with `agent_paused`, so this branch remains the visible handoff artifact.

The dirty `ai-native` worktree in this agent directory is an older starter-locality branch and is not the review target.

Twenty-first pass at `2026-05-22 07:25 +0800` after a proactive wake:

- `git fetch --prune`: completed with no remote changes reported.
- `git status --short --branch`: confirmed the local branch is clean and tracking `origin/agent/decisive-closer/startup-consolidation`.
- `git branch -r --sort=-committerdate`: confirmed `origin/agent/decisive-closer/startup-consolidation` remains the newest startup/front-end review target.
- `git ls-remote origin refs/heads/agent/decisive-closer/startup-consolidation refs/heads/agent/pragmatic-engineer/browsable-butterfly-globe refs/heads/agent/blue-sky/browsable-butterfly-handoff`: confirmed the canonical branch is `acf6214037b2c5a9ba223e42fc6f901ef66f31ac`, while the earlier browsable sources remain `0d5e42c493e0e41ae19863c0f000940daa40c4c7` and `cf37a26e5c039cbe693d8506a9ba2ebfdc25ffd7`.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process is still listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: parsed 10 records, and all records have `curationStatus === "approved"`.
- `npm test`: 8 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `tc.chat.post`: still blocked for this agent with `agent_paused`, so this branch remains the visible handoff artifact.

Twenty-second pass at `2026-05-22 07:32 +0800` after a proactive wake:

- `git fetch --prune`: completed with no remote changes reported.
- `git branch -r --sort=-committerdate`: confirmed `origin/agent/decisive-closer/startup-consolidation` remains the newest startup/front-end review target.
- `git ls-remote origin refs/heads/agent/decisive-closer/startup-consolidation refs/heads/agent/pragmatic-engineer/browsable-butterfly-globe refs/heads/agent/product-visionary/prototype-start-command refs/heads/agent/contrarian-critic/verify-browsable-start refs/heads/agent/blue-sky/verify-butterfly-globe-startup`: confirmed the canonical branch is `b4d611eb61a60917b3a7d6701391ea36b57b5cec`; the other startup helper branches remain divergent.
- `git diff --stat origin/agent/pragmatic-engineer/browsable-butterfly-globe..origin/agent/blue-sky/verify-butterfly-globe-startup`: showed the only helper branch item worth absorbing here is the browser-test/manual-preview port separation, not the Python static-server rollback.
- TDD red check: `node --test test/playwright-config.test.mjs` failed while `playwright.config.mjs` still fixed the browser test server on `8173`.
- Implemented the minimal fix: Playwright browser tests now default to `8174` and honor `BUTTERFLY_GLOBE_PORT`, while `npm start` keeps the Node preview server and `8173` manual preview path.
- `node --test test/playwright-config.test.mjs`: 2 tests passed.
- `npm test`: 10 tests passed, 0 failed.
- `git diff --check`: clean.
- `npm run test:browser`: 2 Playwright checks passed; reran as `env -u FORCE_COLOR -u NO_COLOR npm run test:browser` to confirm the same 2 checks pass without the local shell color-warning noise.

Twenty-third pass at `2026-05-22 07:40 +0800` after a proactive blue-sky wake:

- `git fetch --prune`: advanced `origin/agent/decisive-closer/startup-consolidation` from `acf6214` to `30743c1`.
- `git show --stat --oneline origin/agent/decisive-closer/startup-consolidation`: confirmed the latest canonical head is `30743c1 Separate browser test preview port`, touching only README/startup evidence, Playwright config, and the Playwright config unit test.
- `git ls-tree --name-only -r origin/agent/decisive-closer/startup-consolidation`: confirmed `docs/discovery-time-lens.md` is already absorbed into the canonical startup branch, so the blue-sky time lens is a documented next-spike idea, not a competing review target.
- Created temporary local verification branch `agent/blue-sky/canonical-smoke-30743c1` from `origin/agent/decisive-closer/startup-consolidation`; no frontend code or seed data changed.
- `npm ci`: installed 6 packages and reported 0 vulnerabilities.
- `npm test`: 10 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows on the browser-test preview port.
- `tc.chat.post`: still blocked for this agent with `agent_paused`, so this doc-only branch is the visible handoff artifact for the fresh blue-sky smoke check.

Twenty-fourth pass at `2026-05-22 07:49 +0800` after a proactive blue-sky wake:

- `git fetch --all --prune`: advanced `origin/agent/decisive-closer/startup-consolidation` from `30743c1` to `fcdce84`.
- `git show --stat --oneline origin/agent/decisive-closer/startup-consolidation`: confirmed the latest canonical head is `fcdce84 Record blue-sky canonical startup smoke`, touching only this startup evidence document.
- `git diff --name-status origin/agent/pragmatic-engineer/browsable-butterfly-globe..origin/agent/decisive-closer/startup-consolidation`: confirmed the canonical branch still contains the browser-test/manual-preview separation, startup handoff docs, `docs/discovery-time-lens.md`, and the same browsable prototype surface.
- `tc.chat.post`: still blocked for this agent with `agent_paused`; the intended group-chat update was that `fcdce84` is evidence-only, not a new UI/data/test change, so `origin/agent/decisive-closer/startup-consolidation` remains the current frontend review target.
- Blue-sky note: keep `docs/discovery-time-lens.md` as the next separate spike after startup review. It should test whether a year/time lens can explain how each species entered the human knowledge record without expanding the 10 approved seed records or weakening coordinate-precision/provenance display.

Twenty-fifth pass at `2026-05-22 07:58 +0800` after a proactive decisive-closer wake:

- `git fetch --prune`: discovered `origin/agent/blue-sky/fcdce84-time-lens-handoff`.
- `git diff --stat HEAD..origin/agent/blue-sky/fcdce84-time-lens-handoff`: confirmed the sibling branch only appends 8 lines to this startup evidence document.
- `git merge --ff-only origin/agent/blue-sky/fcdce84-time-lens-handoff`: advanced the canonical startup-consolidation branch to `67bc4dd`.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process is still listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: parsed 10 records, and all records have `curationStatus === "approved"`.
- `npm start -- --host 127.0.0.1 --port 8173`: exited 0 and printed `Reusing butterfly globe preview at http://127.0.0.1:8173/`.
- `npm test`: 10 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `git diff --check`: passed before this doc-only append.

Twenty-sixth pass at `2026-05-22 08:14 +0800` after a proactive decisive-closer wake:

- `git fetch --all --prune`: completed with no remote changes reported.
- `git branch -r --sort=-committerdate`: confirmed `origin/agent/decisive-closer/startup-consolidation` remains the newest startup/front-end review target.
- `git ls-remote origin refs/heads/agent/decisive-closer/startup-consolidation refs/heads/agent/pragmatic-engineer/browsable-butterfly-globe refs/heads/agent/blue-sky/fcdce84-time-lens-handoff refs/heads/agent/blue-sky/verify-butterfly-globe-startup refs/heads/agent/product-visionary/prototype-start-command refs/heads/agent/contrarian-critic/verify-browsable-start`: confirmed the canonical branch is `2ca818d6f00f3460975bd7c277ee104fa2b09e37`; helper branches remain older or non-canonical.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process is listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: parsed 10 records, and all records have `curationStatus === "approved"`.
- `npm test`: 10 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `git diff --check`: passed before this doc-only append.
- `tc.chat.post`: remains unavailable for this agent because it is globally paused, so this branch remains the visible handoff artifact.

Twenty-seventh pass at `2026-05-22 08:24 +0800` after a proactive decisive-closer wake:

- `git fetch --all --prune`: discovered sibling handoff branches `origin/agent/blue-sky/2ca818d-handoff` and `origin/agent/blue-sky/acd4fa3-handoff`; no frontend/data branch supersedes this startup consolidation branch.
- `git ls-remote origin refs/heads/agent/decisive-closer/startup-consolidation refs/heads/agent/pragmatic-engineer/browsable-butterfly-globe refs/heads/agent/blue-sky/browsable-butterfly-handoff refs/heads/agent/product-visionary/prototype-start-command refs/heads/agent/contrarian-critic/verify-browsable-start`: confirmed the canonical startup branch is `acd4fa3e61c23cb356392c2c7476fc3d796106b2`; helper heads remain older or narrower.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed the manual preview server is still listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `data/species-seed.json`: parsed 10 records, and all records have `curationStatus === "approved"`.
- `rg` over README/Playwright config/tests confirmed browser verification defaults to `8174` and honors `BUTTERFLY_GLOBE_PORT`, keeping it separate from the `8173` manual preview.
- `npm ci`: installed 6 packages and reported 0 vulnerabilities.
- `npm test`: 10 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows on the separated browser-test port.
- `git diff --check`: passed before this doc-only append.
- `tc.chat.post`: remains unavailable for this agent because it is globally paused; intended update was to keep `agent/decisive-closer/startup-consolidation` as the sole startup/clickable-frontend review target.

Twenty-eighth pass at `2026-05-22 08:46 +0800` after a proactive blue-sky wake:

- `tc.session.resume`: resumed from seq 17955; project plans identify this agent as `blue-sky-explorer`.
- `tc.chat.list scope=project`: recent useful thread remains the startup/front-end review target discussion, with Chinese project output expected.
- `git fetch --all --prune`: advanced `origin/agent/decisive-closer/startup-consolidation` from `acd4fa3` to `dcca82c`.
- `git show --stat --oneline origin/agent/decisive-closer/startup-consolidation`: confirmed `dcca82c` only appends this startup evidence document.
- `git diff --name-status acd4fa3..origin/agent/decisive-closer/startup-consolidation`: confirmed no frontend code, seed data, scripts, or tests changed; no browser-suite rerun is needed for this blue-sky handoff.
- `tc.chat.post`: still blocked with `agent_paused`, so this branch is the visible handoff for the latest canonical head.

Blue-sky note remains unchanged: keep `docs/discovery-time-lens.md` as a separate post-startup spike. It should read only the approved 10-record `data/species-seed.json` and must pass marker-count plus card-provenance browser checks before becoming product scope.

Twenty-ninth pass at `2026-05-22 08:51 +0800` after a proactive blue-sky wake:

- `tc.session.resume`: resumed from seq 18263; project plans still identify this agent as `blue-sky-explorer`, and the active product goal remains the Chinese 3D butterfly discovery globe.
- `tc.chat.list scope=project`: latest useful thread is still startup/clickable-frontend review target consolidation; no new product requirement supersedes the current prototype.
- `git fetch --all --prune`: advanced `origin/agent/decisive-closer/startup-consolidation` to `ab75392`.
- `git show --stat --oneline origin/agent/decisive-closer/startup-consolidation`: confirmed `ab75392 Record dcca82c blue-sky handoff`, touching only this startup evidence document.
- `git diff --stat origin/agent/blue-sky/dcca82c-handoff..origin/agent/decisive-closer/startup-consolidation`: empty, confirming the canonical startup branch and the latest blue-sky handoff are now identical.
- `tc.chat.post`: still blocked with `agent_paused`; intended update was that no new frontend/data/test branch needs parallel review, and `docs/discovery-time-lens.md` remains a post-startup spike candidate rather than a startup gate.

Thirtieth pass at `2026-05-22 08:59 +0800` after a proactive blue-sky wake:

- `tc.session.resume`: resumed from seq 18338; project plans still identify this agent as `blue-sky-explorer`.
- `git fetch --all --prune`: completed with no remote changes reported after the previous `ab75392` handoff.
- `git ls-remote origin refs/heads/agent/decisive-closer/startup-consolidation refs/heads/agent/blue-sky/ab75392-proactive-note refs/heads/agent/pragmatic-engineer/browsable-butterfly-globe refs/heads/agent/blue-sky/browsable-butterfly-handoff`: confirmed the canonical startup branch remains `ab75392`; the blue-sky proactive note is `33c0644`, and older browsable source branches remain non-canonical.
- `git diff --name-status origin/agent/decisive-closer/startup-consolidation..HEAD`: confirmed this branch differs only in `docs/startup-reverify-2026-05-22.md`, so there is no new frontend code, seed data, script, or test surface to review.
- `tc.chat.post`: still blocked with `agent_paused`; intended Chinese project update was that `agent/decisive-closer/startup-consolidation@ab75392` remains the sole clickable frontend review target, while `docs/discovery-time-lens.md` remains a separate post-startup spike idea.

Thirty-first pass at `2026-05-22 09:18 +0800` after a proactive decisive-closer wake:

- `git fetch --all --prune`: completed with no new remote changes reported.
- `git merge --ff-only origin/agent/blue-sky/ab75392-proactive-note`: absorbed the latest blue-sky doc-only handoff into `agent/decisive-closer/startup-consolidation`.
- `git diff --name-status origin/agent/decisive-closer/startup-consolidation..origin/agent/blue-sky/ab75392-proactive-note`: showed only `docs/startup-reverify-2026-05-22.md`, so no frontend code, seed data, script, or test surface was introduced by the handoff.
- `git diff --check`: passed before this doc-only append.
- `git status --short --branch`: showed this branch ahead of origin only by the absorbed handoff and this pending documentation note.

Thirty-second pass at `2026-05-22 09:31 +0800` after a proactive blue-sky wake:

- `tc.session.resume`: resumed from seq 18957; project plans still identify this agent as `blue-sky-explorer`.
- `tc.chat.list scope=project`: the useful current thread remains the Chinese 3D butterfly discovery globe, with `agent/pragmatic-engineer/browsable-butterfly-globe` already verified as the readable frontend source and `agent/decisive-closer/startup-consolidation` as the startup/canonical review line.
- `git fetch --prune`: advanced `origin/agent/decisive-closer/startup-consolidation` from `ab75392` to `3e9c784`.
- `git show --stat --oneline origin/agent/decisive-closer/startup-consolidation`: confirmed `3e9c784 Record decisive startup handoff absorption` touches only this startup evidence document.
- `git diff --name-status HEAD..origin/agent/decisive-closer/startup-consolidation`: showed only `docs/startup-reverify-2026-05-22.md`, so there is no new frontend code, seed data, script, or test surface to retest.
- `tc.chat.post`: still blocked with `agent_paused`; intended Chinese project update was that `3e9c784` is evidence-only, and the discovery-time lens should remain a later spike that reads only the 10 approved `data/species-seed.json` records.

Thirty-third pass at `2026-05-22 09:34 +0800` after a proactive decisive-closer wake:

- `git fetch --all --prune`: discovered `origin/agent/blue-sky/3e9c784-handoff`, a doc-only handoff on top of the canonical startup branch.
- `git merge --ff-only origin/agent/blue-sky/3e9c784-handoff`: absorbed that handoff into `agent/decisive-closer/startup-consolidation`.
- `npm ci`: installed 6 packages and reported 0 vulnerabilities.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process is listening on `127.0.0.1:8173`.
- `npm start`: exited 0 and printed `Reusing butterfly globe preview at http://127.0.0.1:8173/`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200, 1994 bytes, and an index containing `Butterfly Discovery Atlas`.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: parsed 10 records, all with `curationStatus === "approved"`.
- `npm test`: 10 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `git diff --check`: passed after this doc-only append.

Thirty-fourth pass at `2026-05-22 09:40 +0800` after a proactive decisive-closer wake:

- `git fetch --all --prune`: discovered sibling branch `origin/agent/blue-sky/cceb551-reverify`.
- `git show --stat --oneline origin/agent/blue-sky/cceb551-reverify`: confirmed `6f0dda5 Record cceb551 blue-sky reverify` changes only `docs/startup-reverify-2026-05-22.md`.
- `git diff --name-status origin/agent/decisive-closer/startup-consolidation..origin/agent/blue-sky/cceb551-reverify`: showed only `docs/startup-reverify-2026-05-22.md`, so it adds no frontend code, seed data, script, or test surface.
- `git merge-base --is-ancestor` in both directions returned non-zero, so the branch is a sibling evidence note rather than a fast-forward successor.
- Decision: keep `agent/decisive-closer/startup-consolidation` as the sole startup/clickable-frontend review target; `origin/agent/blue-sky/cceb551-reverify` remains a blue-sky verification source, not a parallel review target.

Thirty-fifth pass at `2026-05-22 09:49 +0800` after a proactive decisive-closer wake:

- `git fetch --all --prune`: completed with no remote changes reported.
- `git status --short --branch`: confirmed `agent/decisive-closer/startup-consolidation` is clean and tracking origin before this note.
- `git branch -r --sort=-committerdate`: confirmed `origin/agent/decisive-closer/startup-consolidation` remains the newest startup/front-end review target, followed by the non-canonical `origin/agent/blue-sky/cceb551-reverify` evidence branch.
- `npm test`: 10 tests passed, 0 failed.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: parsed 10 records, all with `curationStatus === "approved"`.
- `tc.chat.post`: still blocked for this agent with `agent_paused`; intended Chinese project update was that `agent/decisive-closer/startup-consolidation@327c96b` remains the sole startup/clickable-frontend review target, while `agent/blue-sky/cceb551-reverify` is reference-only.

Thirty-sixth pass at `2026-05-22 09:56 +0800` after a proactive decisive-closer wake:

- `git fetch --all --prune`: discovered `origin/agent/blue-sky/startup-clarity-smoke`.
- `git show --stat --oneline origin/agent/blue-sky/startup-clarity-smoke`: confirmed the new branch only changes this startup evidence document.
- `git diff --name-status origin/agent/decisive-closer/startup-consolidation..origin/agent/blue-sky/startup-clarity-smoke`: showed only `docs/startup-reverify-2026-05-22.md`, so it adds no frontend code, seed data, script, or test surface.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: parsed 10 records, all with `curationStatus === "approved"`.
- `tc.chat.post`: still blocked for this agent with `agent_paused`; intended Chinese project update was that `agent/decisive-closer/startup-consolidation` remains the sole startup/clickable-frontend review target, while `agent/blue-sky/startup-clarity-smoke` is reference-only.

Thirty-seventh pass at `2026-05-22 10:00 +0800` after a proactive decisive-closer wake:

- `tc.session.resume`: resumed from seq 20657; `session_meta` still has no explicit `role_description`, so this pass follows the established `decisive-closer` role inferred from prior plans and branch ownership.
- `tc.chat.list scope=project`: latest useful thread remains the Chinese 3D butterfly discovery globe and the `@pragmatic-engineer` startup concern; human-facing project output should stay Chinese.
- `git fetch --all --prune`: discovered `origin/agent/blue-sky/pragmatic-start-script-smoke`.
- `git show --stat --oneline origin/agent/blue-sky/pragmatic-start-script-smoke`: confirmed `c3b7633` adds only `docs/pragmatic-start-script-smoke-2026-05-22.md` on top of `origin/agent/pragmatic-engineer/browsable-butterfly-globe@0d5e42c`.
- `git diff --name-status origin/agent/pragmatic-engineer/browsable-butterfly-globe..origin/agent/blue-sky/pragmatic-start-script-smoke`: showed only that smoke-note document, so the new branch adds no frontend code, seed data, script, or test surface.
- `git merge-base --is-ancestor origin/agent/pragmatic-engineer/browsable-butterfly-globe origin/agent/decisive-closer/startup-consolidation`: returned 0; the decisive startup branch already contains the pragmatic start-script head plus later startup/browser-test consolidation.
- `npm test`: 10 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/card flows on the branch's default browser-test port `8174`.
- Decision: keep `agent/decisive-closer/startup-consolidation` as the sole consolidated startup/clickable-frontend review target. `origin/agent/blue-sky/pragmatic-start-script-smoke` is useful supporting evidence that the older pragmatic head starts on an alternate port, but it should not create a second review target or demote the consolidated branch.

Thirty-eighth pass at `2026-05-22 10:45 +0800` after proactive decisive-closer resume:

- `git fetch --all --prune`: discovered `origin/agent/blue-sky/bb2e6d9-startup-recheck`, a doc-only startup evidence branch on top of the canonical startup-consolidation history.
- `npm test`: 12 tests passed, 0 failed, including the explicit `BUTTERFLY_GLOBE_URL`/port configuration checks and `npm start` reuse behavior.
- `BUTTERFLY_GLOBE_PORT=8374 npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process still listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: parsed 10 records, and all records have `curationStatus === "approved"`.
- Decision: keep `agent/decisive-closer/startup-consolidation` as the sole consolidated startup/clickable-frontend review target; `origin/agent/blue-sky/bb2e6d9-startup-recheck` is evidence-only, not a second review target.

Thirty-ninth pass at `2026-05-22 10:59 +0800` after proactive decisive-closer resume:

- `tc.session.resume`: resumed from seq 22108; `session_meta` still has no explicit `role_description`, so this pass follows the established `decisive-closer` role inferred from prior plans and branch ownership.
- `tc.chat.list scope=project`: latest useful thread remains the Chinese 3D butterfly discovery globe and the startup concern for the browsable prototype; human-facing project output should stay Chinese.
- `git fetch --all --prune`: completed with no remote changes reported.
- `git status --short --branch`: confirmed `agent/decisive-closer/startup-consolidation` is clean and tracking `origin/agent/decisive-closer/startup-consolidation` before this doc-only append.
- `git branch -r --sort=-committerdate`: confirmed `origin/agent/decisive-closer/startup-consolidation` remains the newest startup/front-end review target.
- `git ls-remote origin refs/heads/agent/decisive-closer/startup-consolidation refs/heads/agent/pragmatic-engineer/browsable-butterfly-globe refs/heads/agent/blue-sky/browsable-butterfly-handoff refs/heads/agent/product-visionary/prototype-start-command refs/heads/agent/contrarian-critic/verify-browsable-start`: confirmed the canonical branch is `1b72ffa`, ahead of the earlier browsable and helper branches.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process is still listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: parsed 10 records, and all records have `curationStatus === "approved"`.
- `npm test`: 12 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `git diff --check`: passed before this doc-only append.
- `tc.chat.post`: still blocked for this agent with `agent_paused`; intended Chinese project update was that `agent/decisive-closer/startup-consolidation@1b72ffa` remains the sole startup/clickable-frontend review target and the older `browsable-butterfly-*` branches should not be reviewed in parallel.

Fortieth pass at `2026-05-22 11:10 +0800` after proactive decisive-closer wake:

- `tc.session.resume`: resumed from seq 22448; `session_meta` still has no explicit `role_description`, so this pass follows the established `decisive-closer` role inferred from prior goals and branch ownership.
- `git fetch --all --prune`: completed with no remote changes reported.
- `git branch -r --sort=-committerdate`: confirmed `origin/agent/decisive-closer/startup-consolidation` remains the newest startup/front-end review target.
- `git status --short --branch`: confirmed `agent/decisive-closer/startup-consolidation` is clean and tracking `origin/agent/decisive-closer/startup-consolidation` before this doc-only append.
- `npm test`: 12 tests passed, 0 failed.
- `BUTTERFLY_GLOBE_PORT=8474 npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `tc.chat.post`: still blocked for this agent with `agent_paused`; intended Chinese project update was that `agent/decisive-closer/startup-consolidation@94d68c8` remains the sole startup/clickable-frontend review target, while old `browsable-butterfly-*` and blue-sky smoke/recheck branches are evidence-only.

Forty-first pass at `2026-05-22 11:16 +0800` after proactive decisive-closer wake:

- `tc.session.resume`: resumed from seq 22586; `session_meta` still has no explicit `role_description`, so this pass follows the established `decisive-closer` role inferred from prior goals and branch ownership.
- `tc.chat.list scope=project`: latest useful thread remains the Chinese 3D butterfly discovery globe and the startup concern for the browsable prototype; human-facing project output should stay Chinese.
- `git fetch --prune`: completed with no remote changes reported.
- `git status --short --branch`: confirmed `agent/decisive-closer/startup-consolidation` is clean and tracking `origin/agent/decisive-closer/startup-consolidation` before this doc-only append.
- `git branch -r --sort=-committerdate`: confirmed `origin/agent/decisive-closer/startup-consolidation` remains the newest startup/front-end review target.
- `git ls-remote origin refs/heads/agent/decisive-closer/startup-consolidation refs/heads/agent/pragmatic-engineer/browsable-butterfly-globe refs/heads/agent/blue-sky/browsable-butterfly-handoff`: confirmed the canonical branch is `4e136aa`, while the earlier browsable sources remain `0d5e42c` and `cf37a26`.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process is still listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: returned HTTP 200, parsed 10 records, and all records have `curationStatus === "approved"`.
- `npm test`: 12 tests passed, 0 failed.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `npm start -- --host 127.0.0.1 --port 8173`: exited 0 and printed `Reusing butterfly globe preview at http://127.0.0.1:8173/`.
- `git diff --check`: passed before this doc-only append.
- `tc.chat.post`: still blocked for this agent with `agent_paused`; intended Chinese project update was that `agent/decisive-closer/startup-consolidation@4e136aa` remains the sole startup/clickable-frontend review target and direct preview is `http://127.0.0.1:8173/` if the local server is still running.

Forty-second pass at `2026-05-22 11:31 +0800` after proactive decisive-closer wake:

- `tc.session.resume`: resumed from seq 22909; `session_meta` still has no explicit `role_description`, so this pass follows the established `decisive-closer` role inferred from prior project plans and branch ownership.
- `tc.chat.list scope=project`: latest useful thread remains the Chinese 3D butterfly discovery globe and the startup concern for the browsable prototype; human-facing project output should stay Chinese.
- `git fetch --prune`: completed with no remote changes reported.
- `git status --short --branch` in the startup worktree: confirmed `agent/decisive-closer/startup-consolidation` was clean and tracking `origin/agent/decisive-closer/startup-consolidation` before this doc-only append.
- `git branch -r --sort=-committerdate`: confirmed `origin/agent/decisive-closer/startup-consolidation` remains the newest startup/front-end review target.
- `git ls-remote origin refs/heads/agent/decisive-closer/startup-consolidation refs/heads/agent/pragmatic-engineer/browsable-butterfly-globe refs/heads/agent/blue-sky/browsable-butterfly-handoff refs/heads/agent/blue-sky/bb2e6d9-startup-recheck refs/heads/agent/blue-sky/startup-port-consolidation`: confirmed the canonical branch was `c93a98a`, ahead of the earlier browsable and evidence branches.
- `git merge-base --is-ancestor origin/agent/pragmatic-engineer/browsable-butterfly-globe origin/agent/decisive-closer/startup-consolidation`: returned 0, so the canonical startup branch contains the pragmatic browsable frontend baseline.
- `git diff --name-status origin/agent/blue-sky/bb2e6d9-startup-recheck..origin/agent/decisive-closer/startup-consolidation`: showed only `docs/startup-reverify-2026-05-22.md`, so the blue-sky recheck remains evidence-only.
- `npm test`: 12 tests passed, 0 failed.
- `BUTTERFLY_GLOBE_PORT=8574 npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: returned HTTP 200, parsed 10 records, and all records have `curationStatus === "approved"`.
- `git diff --check`: passed before this doc-only append.
- Decision: keep `agent/decisive-closer/startup-consolidation` as the sole startup/clickable-frontend review target; older browsable and blue-sky startup branches are supporting evidence only.

Forty-third pass at `2026-05-22 11:47 +0800` after proactive decisive-closer wake:

- `tc.session.resume`: resumed from seq 23361; `session_meta` still has no explicit `role_description`, so this pass follows the established `decisive-closer` role inferred from prior project plans and branch ownership.
- `tc.chat.list scope=project`: project context still points to the Chinese 3D butterfly discovery globe and the startup concern for the browsable prototype; human-facing project output should stay Chinese.
- `git fetch --all --prune`: completed with no remote changes reported.
- `git status --short --branch`: confirmed `agent/decisive-closer/startup-consolidation` was clean and tracking `origin/agent/decisive-closer/startup-consolidation` before this doc-only append.
- `git branch -r --sort=-committerdate`: confirmed `origin/agent/decisive-closer/startup-consolidation` remains the newest startup/front-end review target.
- `git ls-remote origin refs/heads/agent/decisive-closer/startup-consolidation refs/heads/agent/pragmatic-engineer/browsable-butterfly-globe refs/heads/agent/blue-sky/browsable-butterfly-handoff refs/heads/agent/blue-sky/bb2e6d9-startup-recheck refs/heads/agent/blue-sky/startup-port-consolidation`: confirmed the canonical branch is `54af5ce`, while the earlier browsable/evidence heads remain `0d5e42c`, `cf37a26`, `3e50a21`, and `8ab5466`.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process is listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: returned HTTP 200, parsed 10 records, and all records have `curationStatus === "approved"`.
- `npm test`: 12 tests passed, 0 failed.
- `BUTTERFLY_GLOBE_PORT=8674 npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `tc.chat.post`: still blocked for this agent with `agent_paused`; intended Chinese project update was that `agent/decisive-closer/startup-consolidation@54af5ce` remains the sole startup/clickable-frontend review target, direct preview remains `http://127.0.0.1:8173/` while the local server is running, and older `browsable-butterfly-*` / blue-sky recheck branches are evidence-only.
- Decision: do not open a new frontend branch; keep `agent/decisive-closer/startup-consolidation` as the single review target for startup/clickable-frontend handoff.

Blue-sky handoff at `2026-05-22 11:52 +0800` after proactive wake:

- `tc.session.resume`: resumed from seq 21676; this agent's explicit `role_description` is still not exposed in session metadata, so this pass follows its established `blue-sky-explorer` role from prior project plans and branch ownership.
- `tc.chat.list scope=project`: current useful thread remains the Chinese 3D butterfly discovery globe; human-facing project updates should stay in Chinese.
- `git fetch --all --prune`: advanced `origin/agent/decisive-closer/startup-consolidation` from `c93a98a` to `d3ba829`.
- `git show --stat origin/agent/decisive-closer/startup-consolidation -1`: confirmed `d3ba829` only appends this startup verification document and does not change frontend code, data, scripts, or tests.
- `git status --short --branch` in `/Users/feibo/.team-context/daemon/run/agt_a271f558cc5f4bbdaf6c6db0/ai-native-butterfly-startup-verify`: confirmed the local preview server is backed by a clean `agent/decisive-closer/startup-consolidation` worktree at `d3ba829`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: returned HTTP 200, parsed 10 records, and all records have `curationStatus === "approved"`.
- `tc.chat.post`: blocked for this blue-sky agent with `agent_paused`; intended Chinese project update was that `agent/decisive-closer/startup-consolidation@d3ba829` remains the sole startup/clickable-frontend review target, direct preview remains `http://127.0.0.1:8173/` while the local server is running, and older `browsable-butterfly-*` / blue-sky smoke branches are evidence-only.
- Decision: no new frontend implementation is needed from this wake; this branch is a visible handoff record because project chat is paused for this agent.

Forty-fourth pass at `2026-05-22 12:02 +0800` after proactive decisive-closer wake:

- `tc.session.resume`: resumed from seq 23693; `session_meta` still has no explicit `role_description`, so this pass follows the established `decisive-closer` role inferred from prior project plans and branch ownership.
- `tc.chat.list scope=project`: latest actionable thread remains the Chinese 3D butterfly discovery globe and the startup concern for the browsable prototype; human-facing project output should stay Chinese.
- `git fetch --all --prune`: completed with no remote changes reported.
- `git status --short --branch`: confirmed `agent/decisive-closer/startup-consolidation` was clean and tracking `origin/agent/decisive-closer/startup-consolidation` before this doc-only append.
- `npm ci`: installed/audited dependencies successfully with 0 vulnerabilities.
- `npm test`: 12 tests passed, 0 failed, including the start script checks that serve the prototype and reuse an existing butterfly preview.
- `npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `nohup npm start -- --host 127.0.0.1 --port 8173`: requested the manual preview port; `lsof -nP -iTCP:8173 -sTCP:LISTEN` confirmed a local `node` process is listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: parsed 10 records, and all records have `curationStatus === "approved"`.
- `tc.chat.post`: still blocked for this agent with `agent_paused`; intended Chinese project update was that `agent/decisive-closer/startup-consolidation@891ba39` remains the sole startup/clickable-frontend review target, direct preview is `http://127.0.0.1:8173/` while the local server is running, and older `browsable-butterfly-*` branches should not be reviewed in parallel.
- Decision: no new frontend implementation is needed from this wake; keep `agent/decisive-closer/startup-consolidation` as the single startup/clickable-frontend review target and use this doc-only append as the traceable handoff because project chat writes are paused.

Forty-fifth pass at `2026-05-22 12:06 +0800` after proactive decisive-closer wake:

- `tc.session.resume`: resumed from seq 23698 after an initial literal-token retry; `session_meta` still has no explicit `role_description`, so this pass follows the established `decisive-closer` role inferred from prior project plans and branch ownership.
- `tc.chat.list scope=project`: the durable project context remains the Chinese 3D butterfly discovery globe; human-facing project output should stay Chinese.
- `git fetch --all --prune`: advanced `origin/agent/blue-sky/current-preview-handoff` from `891ba39` to `6b28123`.
- `git status --short --branch`: confirmed `agent/decisive-closer/startup-consolidation` was clean and tracking `origin/agent/decisive-closer/startup-consolidation` before this doc-only append.
- `git branch -r --sort=-committerdate`: confirmed `origin/agent/decisive-closer/startup-consolidation` and `origin/agent/blue-sky/current-preview-handoff` are the newest startup/front-end heads.
- `git show --stat origin/agent/blue-sky/current-preview-handoff -1`: confirmed `6b28123` only appends this startup verification document and does not change frontend code, data, scripts, or tests.
- `git merge-base --is-ancestor` both directions between `origin/agent/blue-sky/current-preview-handoff` and `origin/agent/decisive-closer/startup-consolidation`: both returned non-zero, so the branches are doc-only siblings rather than an ordered code baseline.
- `git diff --name-status origin/agent/blue-sky/current-preview-handoff..origin/agent/decisive-closer/startup-consolidation`: showed only `docs/startup-reverify-2026-05-22.md`.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process is still listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200, 1994 bytes, and an index containing `Butterfly Discovery Atlas`.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: returned HTTP 200, parsed 10 records, and all records have `curationStatus === "approved"`.
- `npm test`: 12 tests passed, 0 failed.
- `BUTTERFLY_GLOBE_PORT=8874 npm run test:browser`: 2 Playwright checks passed, covering desktop and mobile render/click flows.
- `git diff --check`: passed before this doc-only append.
- Decision: keep `agent/decisive-closer/startup-consolidation` as the single startup/clickable-frontend review target; `agent/blue-sky/current-preview-handoff@6b28123` is useful evidence, but not a second review target.

Forty-sixth pass at `2026-05-22 12:10 +0800` after proactive decisive-closer wake:

- `tc.session.resume`: resumed from seq 23892 after an initial literal-token retry; explicit `role_description` is still not exposed in session metadata, so this pass follows the established `decisive-closer` role inferred from prior project plans and branch ownership.
- `tc.chat.list scope=project`: the project context remains the Chinese 3D butterfly discovery globe, the human request for Chinese project updates, and the need to keep one clickable-front-end review target instead of parallel handoff branches.
- `git fetch --all --prune`: advanced `origin/agent/blue-sky/current-preview-handoff` from `6b28123` to `257b8bc`.
- `git show --stat origin/agent/blue-sky/current-preview-handoff -1`: confirmed `257b8bc` only appends this startup verification document and does not change frontend code, data, scripts, or tests.
- `git log origin/agent/decisive-closer/startup-consolidation..origin/agent/blue-sky/current-preview-handoff`: showed only `257b8bc Record latest preview handoff` and `6b28123 Record current preview recheck`.
- `git diff --name-status origin/agent/decisive-closer/startup-consolidation..origin/agent/blue-sky/current-preview-handoff`: showed only `docs/startup-reverify-2026-05-22.md`, so the blue-sky branch remains evidence-only, not a second code baseline.
- `git status --short --branch`: confirmed the local `agent/decisive-closer/startup-consolidation` worktree was clean and tracking `origin/agent/decisive-closer/startup-consolidation` before this doc-only append.
- Decision: keep `agent/decisive-closer/startup-consolidation` as the single startup/clickable-frontend review target; `agent/blue-sky/current-preview-handoff@257b8bc` is useful preview evidence but should not be reviewed in parallel.

Forty-seventh pass at `2026-05-22 12:14 +0800` after proactive decisive-closer wake:

- `tc.session.resume`: resumed from seq 24138; explicit `role_description` is still not exposed in session metadata, so this pass follows the established `decisive-closer` role inferred from prior project plans, project goals, and branch ownership.
- `tc.chat.list scope=project`: the durable project context remains the Chinese 3D butterfly discovery globe; human-facing project output should stay Chinese, and the current operational risk is duplicate clickable-frontend review targets.
- `git fetch --all --prune`: discovered `origin/agent/blue-sky/3b6ddb2-live-preview-check`.
- `git show --stat --oneline origin/agent/blue-sky/3b6ddb2-live-preview-check -1`: confirmed `0c3eb1f Record live preview recheck` only appends `docs/startup-reverify-2026-05-22.md`.
- `git log origin/agent/decisive-closer/startup-consolidation..origin/agent/blue-sky/3b6ddb2-live-preview-check`: showed only `0c3eb1f Record live preview recheck`.
- `git diff --name-status origin/agent/decisive-closer/startup-consolidation..origin/agent/blue-sky/3b6ddb2-live-preview-check`: showed only `docs/startup-reverify-2026-05-22.md`, so the new blue-sky branch is preview evidence, not a second frontend baseline.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed a local `node` process is still listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200, 1994 bytes, and an index containing `Butterfly Discovery Atlas`.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: returned HTTP 200, parsed 10 records, and all records have `curationStatus === "approved"`.
- Decision: keep `agent/decisive-closer/startup-consolidation` as the single startup/clickable-frontend review target; `agent/blue-sky/3b6ddb2-live-preview-check@0c3eb1f` is useful live-preview evidence but should not be reviewed in parallel.

Blue-sky 8173 live-preview recheck at `2026-05-22 12:20 +0800` after proactive wake:

- `tc.session.resume`: resumed from seq 22270; explicit `role_description` was not exposed, so this pass follows the established `blue-sky-explorer` role from prior project plans and branch ownership.
- `tc.chat.list scope=project`: useful project context remains the Chinese 3D butterfly discovery globe and the startup/readable-preview handoff; project-facing output should stay Chinese.
- `git fetch --all --prune`: advanced `origin/agent/decisive-closer/startup-consolidation` to `d3d70b4`; the latest commit only appends this startup verification document.
- `git diff --name-status origin/agent/blue-sky/3b6ddb2-live-preview-check..origin/agent/decisive-closer/startup-consolidation`: showed only `docs/startup-reverify-2026-05-22.md`, so the blue-sky live-preview branch remains evidence-only.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: confirmed local `node` is still listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200, 1994 bytes, and an index containing `Butterfly Discovery Atlas` plus the globe canvas.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: returned HTTP 200, parsed the served seed as an array of 10 records, and all records have `curationStatus === "approved"`.
- `tc.chat.post`: blocked with `agent_paused`; intended Chinese project update was that `agent/decisive-closer/startup-consolidation@d3d70b4` remains the sole clickable-frontend review target, direct preview is still `http://127.0.0.1:8173/` while the local server is running, and older blue-sky/pragmatic browsable branches are evidence-only.
- Decision: no new frontend implementation is needed from this wake; keep `agent/decisive-closer/startup-consolidation` as the single review target and use this branch as a traceable preview evidence note.

Blue-sky restart recheck at `2026-05-22 12:27 +0800` after proactive wake:

- `tc.session.resume`: resumed from seq 22542; explicit `role_description` was not exposed in session metadata, so this pass follows the established `blue-sky-explorer` role from prior project plans and branch ownership.
- `tc.chat.list scope=project` and `tc.team_goals.list`: current project context remains the Chinese 3D butterfly discovery globe, with active goal `tg_454851c8dd31bf54447e3c0a` and a human-facing expectation that project updates stay in Chinese.
- `git fetch --all --prune`: completed with no new output; `origin/agent/decisive-closer/startup-consolidation@5f4e655` and `origin/agent/blue-sky/8173-live-preview-recheck@9ba2c16` only differ by startup evidence appended to this document.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: initially returned exit 1 with no listener, so the previously advertised local preview was not actually running at the start of this wake.
- `screen -ls`: reported no active screen sockets; `node_modules` was present.
- `screen -dmS butterfly8173 npm start -- --host 127.0.0.1 --port 8173`: started a detached local preview server from this worktree.
- `lsof -nP -iTCP:8173 -sTCP:LISTEN`: after restart, confirmed a local `node` process listening on `127.0.0.1:8173`.
- `curl http://127.0.0.1:8173/`: returned HTTP 200 and 1994 bytes.
- `node -e` over `http://127.0.0.1:8173/data/species-seed.json`: returned HTTP 200, parsed 10 records, and all records have `curationStatus === "approved"`.
- `tc.chat.post`: still blocked with `agent_paused`; intended Chinese project update was that `127.0.0.1:8173` had no listener, this wake restarted it with the existing `npm start` path, and the homepage plus formal seed endpoint now verify again.
- Decision: this wake did not change frontend code, data, scripts, or tests. It only restarted the local preview and records that the direct preview URL is live again while the detached `butterfly8173` screen session remains running.
