import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("browser test server defaults away from the manual preview port", async () => {
  const config = await loadConfig({ BUTTERFLY_GLOBE_PORT: undefined, BUTTERFLY_GLOBE_URL: undefined });

  assert.equal(config.webServer.url, "http://127.0.0.1:8174/");
  assert.match(config.webServer.command, /--port 8174/);
});

test("browser test server honors BUTTERFLY_GLOBE_PORT", async () => {
  const config = await loadConfig({ BUTTERFLY_GLOBE_PORT: "8199", BUTTERFLY_GLOBE_URL: undefined });

  assert.equal(config.webServer.url, "http://127.0.0.1:8199/");
  assert.match(config.webServer.command, /--port 8199\b/);
});

test("browser test server honors BUTTERFLY_GLOBE_URL for explicit targets", async () => {
  const config = await loadConfig({
    BUTTERFLY_GLOBE_PORT: "8199",
    BUTTERFLY_GLOBE_URL: "http://127.0.0.1:9001/custom/",
  });

  assert.equal(config.webServer.url, "http://127.0.0.1:9001/custom/");
  assert.match(config.webServer.command, /--port 8199\b/);
});

test("browser spec navigates through the shared butterfly globe test URL", async () => {
  const spec = await readFile(new URL("butterfly-globe.browser.spec.mjs", import.meta.url), "utf8");

  assert.match(spec, /BUTTERFLY_GLOBE_PORT/);
  assert.doesNotMatch(spec, /http:\/\/127\.0\.0\.1:8173\//);
});

async function loadConfig(env) {
  const previousPort = process.env.BUTTERFLY_GLOBE_PORT;
  const previousUrl = process.env.BUTTERFLY_GLOBE_URL;

  setOptionalEnv("BUTTERFLY_GLOBE_PORT", env.BUTTERFLY_GLOBE_PORT);
  setOptionalEnv("BUTTERFLY_GLOBE_URL", env.BUTTERFLY_GLOBE_URL);

  try {
    return (await import(`../playwright.config.mjs?cacheBust=${crypto.randomUUID()}`)).default;
  } finally {
    setOptionalEnv("BUTTERFLY_GLOBE_PORT", previousPort);
    setOptionalEnv("BUTTERFLY_GLOBE_URL", previousUrl);
  }
}

function setOptionalEnv(name, value) {
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }
}
