import { defineConfig } from "@playwright/test";

const browserTestPort = process.env.BUTTERFLY_GLOBE_PORT ?? "8174";
const browserTestUrl = `http://127.0.0.1:${browserTestPort}/`;

export default defineConfig({
  reporter: "list",
  use: {
    headless: true,
  },
  webServer: {
    command: `npm start -- --host 127.0.0.1 --port ${browserTestPort}`,
    url: browserTestUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },
});
