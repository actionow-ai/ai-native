import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";
import test from "node:test";
import playwrightConfig from "../playwright.config.mjs";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

test("browser test reuses an already running local preview server outside CI", () => {
  assert.equal(playwrightConfig.webServer.reuseExistingServer, !process.env.CI);
});

test("npm start serves the prototype and formal seed data", async (t) => {
  const server = spawn("npm", ["start", "--", "--host", "127.0.0.1", "--port", "0"], {
    cwd: repoRoot,
    detached: process.platform !== "win32",
    stdio: ["ignore", "pipe", "pipe"],
  });

  t.after(() => stopServer(server));

  const serverUrl = await waitForServerUrl(server);
  const html = await readText(new URL("/", serverUrl));
  assert.match(html, /Butterfly Discovery Atlas/);

  const seed = JSON.parse(await readText(new URL("/data/species-seed.json", serverUrl)));
  assert.equal(seed.length, 10);
  assert.equal(seed.every((record) => record.curationStatus === "approved"), true);
});

test("npm start reuses an existing butterfly preview on the requested port", async (t) => {
  const firstServer = spawn("npm", ["start", "--", "--host", "127.0.0.1", "--port", "0"], {
    cwd: repoRoot,
    detached: process.platform !== "win32",
    stdio: ["ignore", "pipe", "pipe"],
  });

  t.after(() => stopServer(firstServer));

  const firstServerUrl = await waitForServerUrl(firstServer);
  const secondServer = spawn(
    "npm",
    ["start", "--", "--host", "127.0.0.1", "--port", firstServerUrl.port],
    {
      cwd: repoRoot,
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  const result = await waitForProcessExit(secondServer);
  assert.equal(result.code, 0, result.output);
  assert.match(result.output, /Reusing butterfly globe preview/);
  assert.ok(result.output.includes(firstServerUrl.href));
});

test("npm start falls back to a free port when the default preview port is busy", async (t) => {
  const blocker = await occupyPort(8173);
  if (!blocker) {
    t.skip("default preview port is already occupied in this environment");
    return;
  }
  t.after(() => blocker.close());

  const server = spawn("npm", ["start"], {
    cwd: repoRoot,
    detached: process.platform !== "win32",
    stdio: ["ignore", "pipe", "pipe"],
  });

  t.after(() => stopServer(server));

  const serverUrl = await waitForServerUrl(server);
  assert.notEqual(serverUrl.port, "8173");

  const seed = JSON.parse(await readText(new URL("/data/species-seed.json", serverUrl)));
  assert.equal(seed.length, 10);
  assert.equal(seed.every((record) => record.curationStatus === "approved"), true);
});

function waitForServerUrl(server) {
  return new Promise((resolve, reject) => {
    let output = "";
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(`Timed out waiting for startup URL.\n${output}`));
    }, 5000);

    const onData = (chunk) => {
      output += chunk.toString();
      const match = output.match(/http:\/\/127\.0\.0\.1:\d+\//);
      if (!match) return;
      cleanup();
      resolve(new URL(match[0]));
    };

    const onExit = (code, signal) => {
      cleanup();
      reject(new Error(`Server exited before startup URL. code=${code} signal=${signal}\n${output}`));
    };

    const cleanup = () => {
      clearTimeout(timer);
      server.stdout.off("data", onData);
      server.stderr.off("data", onData);
      server.off("exit", onExit);
    };

    server.stdout.on("data", onData);
    server.stderr.on("data", onData);
    server.on("exit", onExit);
  });
}

function waitForProcessExit(child) {
  return new Promise((resolve) => {
    let output = "";
    child.stdout.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.on("exit", (code, signal) => {
      resolve({ code, signal, output });
    });
  });
}

function occupyPort(port) {
  return new Promise((resolve, reject) => {
    const blocker = createServer();
    blocker.once("error", (error) => {
      if (error.code === "EADDRINUSE") {
        resolve(null);
        return;
      }
      reject(error);
    });
    blocker.listen(port, "127.0.0.1", () => resolve(blocker));
  });
}

async function readText(url) {
  const response = await fetch(url);
  assert.equal(response.status, 200, `${url} returned ${response.status}`);
  return response.text();
}

function stopServer(server) {
  if (!server.pid || server.exitCode !== null) return;
  if (process.platform === "win32") {
    server.kill("SIGTERM");
    return;
  }
  process.kill(-server.pid, "SIGTERM");
}
