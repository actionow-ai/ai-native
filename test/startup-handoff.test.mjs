import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("prototype handoff exposes a single npm start command", async () => {
  const packageJson = JSON.parse(await readFile("package.json", "utf8"));
  const readme = await readFile("README.md", "utf8");
  const playwrightConfig = await readFile("playwright.config.mjs", "utf8");

  assert.equal(packageJson.scripts.start, "python3 -m http.server 8173 --bind 127.0.0.1");
  assert.match(playwrightConfig, /command: "npm start"/);
  assert.match(playwrightConfig, /reuseExistingServer: !process\.env\.CI/);
  assert.match(readme, /npm start/);
  assert.match(readme, /http:\/\/localhost:8173\//);
});
