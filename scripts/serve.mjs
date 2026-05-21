import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const { host, port } = parseArgs(process.argv.slice(2));

const server = createServer(async (request, response) => {
  try {
    const filePath = resolveRequestPath(request.url);
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      writePlain(response, 404, "Not found");
      return;
    }

    response.writeHead(200, {
      "content-length": fileStat.size,
      "content-type": contentType(filePath),
    });
    createReadStream(filePath).pipe(response);
  } catch (error) {
    if (error?.code === "ENOENT") {
      writePlain(response, 404, "Not found");
      return;
    }
    if (error?.code === "FORBIDDEN") {
      writePlain(response, 403, "Forbidden");
      return;
    }
    writePlain(response, 500, "Server error");
  }
});

server.on("error", (error) => {
  if (error?.code === "EADDRINUSE") {
    void handleAddressInUse();
    return;
  }
  console.error(`Failed to start preview server: ${error.message}`);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  const address = server.address();
  const actualHost = address.address === "0.0.0.0" ? "127.0.0.1" : address.address;
  console.log(`Serving butterfly globe at http://${actualHost}:${address.port}/`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}

function parseArgs(args) {
  const options = { host: "127.0.0.1", port: 8173 };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--host") {
      options.host = args[index + 1];
      index += 1;
      continue;
    }
    if (arg.startsWith("--host=")) {
      options.host = arg.slice("--host=".length);
      continue;
    }
    if (arg === "--port") {
      options.port = Number(args[index + 1]);
      index += 1;
      continue;
    }
    if (arg.startsWith("--port=")) {
      options.port = Number(arg.slice("--port=".length));
    }
  }

  if (!Number.isInteger(options.port) || options.port < 0 || options.port > 65535) {
    throw new Error(`Invalid port: ${options.port}`);
  }
  if (!options.host) throw new Error("Host is required.");

  return options;
}

function resolveRequestPath(requestUrl = "/") {
  const url = new URL(requestUrl, "http://127.0.0.1");
  const pathname = decodeURIComponent(url.pathname);
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = resolve(root, relativePath);
  const rootPrefix = root.endsWith(sep) ? root : `${root}${sep}`;

  if (filePath !== root && !filePath.startsWith(rootPrefix)) {
    const error = new Error("Path escapes preview root.");
    error.code = "FORBIDDEN";
    throw error;
  }
  return filePath;
}

function contentType(filePath) {
  const types = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
  };
  return types[extname(filePath)] ?? "application/octet-stream";
}

async function handleAddressInUse() {
  const url = localPreviewUrl(host, port);
  if (await isButterflyPreview(url)) {
    console.log(`Reusing butterfly globe preview at ${url}`);
    return;
  }

  console.error(`Failed to start preview server: address already in use ${host}:${port}`);
  process.exitCode = 1;
}

function localPreviewUrl(hostValue, portValue) {
  const displayHost = hostValue === "0.0.0.0" || hostValue === "::" ? "127.0.0.1" : hostValue;
  const bracketedHost = displayHost.includes(":") ? `[${displayHost}]` : displayHost;
  return `http://${bracketedHost}:${portValue}/`;
}

async function isButterflyPreview(url) {
  try {
    const [html, seed] = await Promise.all([
      fetchText(url),
      fetchJson(new URL("/data/species-seed.json", url)),
    ]);
    return (
      html.includes("Butterfly Discovery Atlas") &&
      Array.isArray(seed) &&
      seed.length > 0 &&
      seed.every((record) => record?.curationStatus === "approved")
    );
  } catch {
    return false;
  }
}

async function fetchText(url) {
  const response = await fetchWithTimeout(url);
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

async function fetchJson(url) {
  const response = await fetchWithTimeout(url);
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.json();
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1000);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function writePlain(response, statusCode, body) {
  response.writeHead(statusCode, {
    "content-length": Buffer.byteLength(body),
    "content-type": "text/plain; charset=utf-8",
  });
  response.end(body);
}
