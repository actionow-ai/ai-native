import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: "list",
  use: {
    headless: true,
  },
  webServer: {
    command: "python3 -m http.server 8173 --bind 127.0.0.1",
    url: "http://127.0.0.1:8173/",
    reuseExistingServer: false,
    timeout: 15000,
  },
});
