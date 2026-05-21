import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, relative, resolve, sep } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const args = parseArgs(process.argv.slice(2));
const host = args.host ?? process.env.BUTTERFLY_GLOBE_HOST ?? "127.0.0.1";
const port = Number(args.port ?? process.env.BUTTERFLY_GLOBE_PORT ?? 8173);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error(`Invalid port: ${args.port}`);
  process.exit(1);
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method Not Allowed");
    return;
  }

  const filePath = resolveRequestPath(request.url ?? "/");
  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      response.writeHead(404);
      response.end("Not Found");
      return;
    }

    response.writeHead(200, {
      "Content-Length": fileStat.size,
      "Content-Type": contentType(filePath),
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
  } catch (error) {
    if (error?.code !== "ENOENT") console.error(error);
    response.writeHead(404);
    response.end("Not Found");
  }
});

server.listen(port, host, () => {
  console.log(`Butterfly Discovery Atlas: http://${host}:${port}/`);
});

function parseArgs(rawArgs) {
  const parsed = {};

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === "--port" || arg === "-p") {
      parsed.port = rawArgs[index + 1];
      index += 1;
    } else if (arg.startsWith("--port=")) {
      parsed.port = arg.slice("--port=".length);
    } else if (arg === "--host") {
      parsed.host = rawArgs[index + 1];
      index += 1;
    } else if (arg.startsWith("--host=")) {
      parsed.host = arg.slice("--host=".length);
    }
  }

  return parsed;
}

function resolveRequestPath(rawUrl) {
  const url = new URL(rawUrl, "http://127.0.0.1");
  const pathname = decodeURIComponent(url.pathname);
  const normalized = normalize(pathname === "/" ? "/index.html" : pathname);
  const filePath = join(root, normalized);
  const rel = relative(root, filePath);

  if (rel.startsWith(`..${sep}`) || rel === ".." || rel.startsWith("/") || rel === "") {
    return null;
  }

  return filePath;
}

function contentType(filePath) {
  const types = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
  };

  return types[extname(filePath).toLowerCase()] ?? "application/octet-stream";
}
