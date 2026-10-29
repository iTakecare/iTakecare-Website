import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === "development" && screenGraphPlugin()],
  publicDir: "./static",
  base: "/",
  // Les LP sont servies sur itakecare.be/lp à côté du site existant :
  // un dossier d'assets dédié évite tout conflit avec le /assets du site en place.
  build: { assetsDir: "lp-assets" },
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
}));
