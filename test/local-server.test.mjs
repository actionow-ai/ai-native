import assert from "node:assert/strict";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { test } from "node:test";

test("npm start serves the butterfly globe over local HTTP", async () => {
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(packageJson.scripts.start, "node scripts/serve.mjs --port 8173");

  const port = String(8200 + process.pid % 1000);
  const server = spawn("npm", ["start", "--", "--port", port], {
    cwd: new URL("..", import.meta.url),
    env: { ...process.env, FORCE_COLOR: "0", NO_COLOR: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let output = "";
  server.stdout.on("data", (chunk) => {
    output += chunk;
  });
  server.stderr.on("data", (chunk) => {
    output += chunk;
  });

  try {
    await waitForServer(`http://127.0.0.1:${port}/`, server);

    const html = await fetchText(`http://127.0.0.1:${port}/`);
    assert.match(html, /Butterfly Discovery Atlas/);

    const seed = await fetchJson(`http://127.0.0.1:${port}/data/species-seed.json`);
    assert.equal(seed.length, 10);
  } finally {
    server.kill();
    await once(server, "exit").catch(() => {});
  }

  assert.match(output, new RegExp(`http://127\\.0\\.0\\.1:${port}/`));
});

async function fetchText(url) {
  const response = await fetch(url);
  assert.equal(response.status, 200);
  return response.text();
}

async function fetchJson(url) {
  const text = await fetchText(url);
  return JSON.parse(text);
}

async function waitForServer(url, server) {
  const deadline = Date.now() + 5000;
  let lastError;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`server exited before becoming ready: ${server.exitCode}`);
    }

    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw lastError ?? new Error("server did not become ready");
}
