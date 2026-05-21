import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: "list",
  use: {
    headless: true,
  },
  webServer: {
    command: "npm start -- --host 127.0.0.1 --port 8173",
    url: "http://127.0.0.1:8173/",
    reuseExistingServer: false,
    timeout: 15000,
  },
});
