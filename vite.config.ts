import anywidget from "@anywidget/vite";
import { type UserConfig, defineConfig } from "vite";
import tspathConfig from "vite-tsconfig-paths";
import config from "./vite.config.json";

export default defineConfig({
  ...(config as Partial<UserConfig>),
  plugins: [anywidget(), tspathConfig()],
});
