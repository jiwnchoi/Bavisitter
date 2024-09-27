import tspathConfig from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tspathConfig()],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
