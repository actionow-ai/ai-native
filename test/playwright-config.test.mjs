import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("browser test startup and page navigation share the configured preview URL", async () => {
  const previousPort = process.env.BUTTERFLY_GLOBE_PORT;
  process.env.BUTTERFLY_GLOBE_PORT = "8199";

  try {
    const { default: config } = await import(`../playwright.config.mjs?case=${Date.now()}`);
    const spec = await readFile(new URL("butterfly-globe.browser.spec.mjs", import.meta.url), "utf8");

    assert.equal(config.webServer.url, "http://127.0.0.1:8199/");
    assert.match(config.webServer.command, /--port 8199\b/);
    assert.match(spec, /BUTTERFLY_GLOBE_PORT/);
    assert.doesNotMatch(spec, /http:\/\/127\.0\.0\.1:8173\//);
  } finally {
    if (previousPort === undefined) {
      delete process.env.BUTTERFLY_GLOBE_PORT;
    } else {
      process.env.BUTTERFLY_GLOBE_PORT = previousPort;
    }
  }
});
