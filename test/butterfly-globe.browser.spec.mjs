import { expect, test } from "@playwright/test";
import pngjs from "pngjs";

const { PNG } = pngjs;

const url = process.env.BUTTERFLY_GLOBE_URL ?? "http://127.0.0.1:8173/";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

for (const viewport of viewports) {
  test(`butterfly globe renders and opens specimen card on ${viewport.name}`, async ({ page }) => {
    const consoleErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("body[data-app-stage='dataset-ready']", { timeout: 20000 });

    await expect(page.locator("#dataset-status")).toContainText("data/species-seed.json");
    await expect(page.locator("body")).toHaveAttribute("data-seed-kind", "formal");
    await expect(page.locator("body")).toHaveAttribute("data-record-count", "10");
    await expect(page.locator("#globe-canvas")).toBeVisible();

    const canvasHealth = getPngPixelStats(await page.locator("#globe-canvas").screenshot());

    expect(canvasHealth.litSamples).toBeGreaterThan(24);
    expect(canvasHealth.variedSamples).toBeGreaterThan(8);

    const regionalButton = page.locator("button[data-species-id='heliconius-erato']");
    await expect(regionalButton).toBeVisible();
    await regionalButton.click();
    await expect(page.locator("#specimen-panel")).toContainText("红邮差蝶");
    await expect(page.locator("#specimen-panel")).toContainText("CC BY");
    await expect(page.locator("#specimen-panel")).toContainText("precision");
    await expect(page.locator("#specimen-panel img")).toBeVisible();
    await page.waitForFunction(() => {
      const image = document.querySelector("#specimen-panel img");
      return image?.complete && image.naturalWidth > 32 && image.naturalHeight > 32;
    });

    await page.screenshot({
      fullPage: true,
      path: `test-results/butterfly-globe/${viewport.name}.png`,
    });

    expect(consoleErrors).toEqual([]);
  });
}

function getPngPixelStats(buffer) {
  const png = PNG.sync.read(buffer);
  const colors = new Set();
  let litSamples = 0;
  let totalSamples = 0;
  const stepX = Math.max(1, Math.floor(png.width / 32));
  const stepY = Math.max(1, Math.floor(png.height / 32));

  for (let y = 0; y < png.height; y += stepY) {
    for (let x = 0; x < png.width; x += stepX) {
      const index = (png.width * y + x) * 4;
      const r = png.data[index];
      const g = png.data[index + 1];
      const b = png.data[index + 2];
      const a = png.data[index + 3];
      if (a > 0 && r + g + b > 44) litSamples += 1;
      colors.add(`${Math.floor(r / 16)},${Math.floor(g / 16)},${Math.floor(b / 16)},${Math.floor(a / 16)}`);
      totalSamples += 1;
    }
  }

  return { litSamples, totalSamples, variedSamples: colors.size };
}
