import assert from "node:assert/strict";
import { test } from "node:test";

test("browser test server defaults away from the manual preview port", async () => {
  const config = await loadConfig({ BUTTERFLY_GLOBE_PORT: undefined });

  assert.equal(config.webServer.url, "http://127.0.0.1:8174/");
  assert.match(config.webServer.command, /8174/);
});

test("browser test server honors BUTTERFLY_GLOBE_PORT", async () => {
  const config = await loadConfig({ BUTTERFLY_GLOBE_PORT: "8199" });

  assert.equal(config.webServer.url, "http://127.0.0.1:8199/");
  assert.match(config.webServer.command, /8199/);
});

async function loadConfig(env) {
  const previousPort = process.env.BUTTERFLY_GLOBE_PORT;

  if (env.BUTTERFLY_GLOBE_PORT === undefined) {
    delete process.env.BUTTERFLY_GLOBE_PORT;
  } else {
    process.env.BUTTERFLY_GLOBE_PORT = env.BUTTERFLY_GLOBE_PORT;
  }

  const config = await import(`../playwright.config.mjs?cacheBust=${crypto.randomUUID()}`);

  if (previousPort === undefined) {
    delete process.env.BUTTERFLY_GLOBE_PORT;
  } else {
    process.env.BUTTERFLY_GLOBE_PORT = previousPort;
  }

  return config.default;
}
