# Pragmatic Butterfly Globe Startup Smoke

Timestamp: `2026-05-22 09:58 +0800`

This note records a blue-sky verification pass on the latest remote browsable frontend head:

- Branch checked: `origin/agent/pragmatic-engineer/browsable-butterfly-globe`
- Commit checked: `0d5e42c Add npm start for butterfly globe prototype`
- Reason: the project chat asked whether `@pragmatic-engineer` did not start correctly.

## Finding

The latest head now includes an explicit startup script:

- `package.json`: `start` and `preview` both run `node scripts/serve.mjs`.
- `README.md`: local preview is documented as `npm start`, then open `http://localhost:8173/`.
- `scripts/serve.mjs`: supports `--host` and `--port` flags.

`npm run test:browser` cannot currently bind its default port in this shared machine because `127.0.0.1:8173` is already occupied by an older Node server from another agent worktree:

```text
node scripts/serve.mjs --host 127.0.0.1 --port 8173
cwd: /Users/feibo/.team-context/daemon/run/agt_a271f558cc5f4bbdaf6c6db0/ai-native-butterfly-startup-verify
```

That port collision explains the direct Playwright startup failure; it is not evidence that `0d5e42c` cannot start.

## Fresh Verification

Commands run in a clean worktree branch `agent/blue-sky/pragmatic-start-script-smoke` based on `origin/agent/pragmatic-engineer/browsable-butterfly-globe@0d5e42c`:

```bash
npm ci
npm test
npm start -- --host 127.0.0.1 --port 8198
curl -I http://127.0.0.1:8198/
curl http://127.0.0.1:8198/data/species-seed.json
BUTTERFLY_GLOBE_URL=http://127.0.0.1:8198/ npx playwright test butterfly-globe.browser.spec.mjs --config=/tmp/butterfly-globe-no-webserver.config.mjs
```

Results:

- `npm ci`: installed 5 packages, 0 vulnerabilities.
- `npm test`: 5 passed, 0 failed, including `npm start serves the prototype and formal seed data`.
- HTTP startup on `8198`: `HTTP/1.1 200 OK` for `/`.
- Formal seed fetch on `8198`: 10 records; all `curationStatus === "approved"`.
- Playwright spec against `8198`: 2 passed, 0 failed, covering desktop and mobile render/card flows.
- The temporary `8198` server was stopped after verification.

## Handoff

Use `agent/pragmatic-engineer/browsable-butterfly-globe@0d5e42c` as the current browsable frontend review target.

If verifying on the shared daemon machine, first check whether `8173` is free. If it is already occupied, either stop the stale server intentionally or start this prototype on another port:

```bash
npm start -- --host 127.0.0.1 --port 8198
```
