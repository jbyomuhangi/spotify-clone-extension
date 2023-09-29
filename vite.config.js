import { crx } from "@crxjs/vite-plugin";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";

import manifest from "./manifest.json" assert { type: "json" }; // Node >=17

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [vue(), crx({ manifest })],
});
