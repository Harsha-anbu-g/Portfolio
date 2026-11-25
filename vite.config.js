import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { deepWorkDevApi } from "./server/deepwork/devPlugin.js";

// Three pages: the portfolio at /, the Why Towinly page at /towinly/, and the private
// Deep Work planner at /deep-work/ (its API is served on localhost by deepWorkDevApi).
export default defineConfig({
  plugins: [react(), tailwindcss(), deepWorkDevApi()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        towinly: fileURLToPath(new URL("./towinly/index.html", import.meta.url)),
        deepwork: fileURLToPath(new URL("./deep-work/index.html", import.meta.url)),
      },
    },
  },
});
