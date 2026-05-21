import { defineConfig } from "@playwright/test";

const browserTestPort = process.env.BUTTERFLY_GLOBE_PORT ?? "8174";
const browserTestUrl = `http://127.0.0.1:${browserTestPort}/`;

export default defineConfig({
  reporter: "list",
  use: {
    headless: true,
  },
  webServer: {
    command: `python3 -m http.server ${browserTestPort} --bind 127.0.0.1`,
    url: browserTestUrl,
    reuseExistingServer: false,
    timeout: 15000,
  },
});
