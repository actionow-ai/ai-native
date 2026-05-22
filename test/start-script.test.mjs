import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

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

test("npm start falls back when the default preview port is busy", async (t) => {
  const blocker = await occupyPort(8173);
  if (blocker) t.after(() => blocker.close());

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
