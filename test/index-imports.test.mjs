import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

test("browser entry imports Three.js from local installed modules", async () => {
  const html = await readFile(new URL("index.html", `file://${repoRoot}/`), "utf8");

  assert.doesNotMatch(html, /https:\/\/unpkg\.com\/three/);
  assert.match(html, /"three": "\.\/node_modules\/three\/build\/three\.module\.js"/);
  assert.match(html, /"three\/addons\/": "\.\/node_modules\/three\/examples\/jsm\/"/);
});
