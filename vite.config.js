import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";
import react from "@vitejs/plugin-react";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import { VERTICALS } from "./src/screens/Landing/verticals";

const SITE_URL = "https://www.itakecare.be";

const escapeHtml = (text) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Facebook ne lit pas le JavaScript : chaque LP reçoit sa propre copie d'index.html
// (dist/lp/<slug>/index.html) avec son titre, sa description et son image d'aperçu.
const landingSharePages = () => ({
  name: "landing-share-pages",
  apply: "build",
  closeBundle() {
    const html = readFileSync("dist/index.html", "utf-8");
    Object.values(VERTICALS).forEach(({ slug, meta }) => {
      const url = `${SITE_URL}/lp/${slug}`;
      const title = escapeHtml(meta.title);
      const description = escapeHtml(meta.description);
      const tags = [
        `<meta name="description" content="${description}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="iTakecare" />`,
        `<meta property="og:locale" content="fr_BE" />`,
        `<meta property="og:url" content="${url}" />`,
        `<meta property="og:title" content="${title}" />`,
        `<meta property="og:description" content="${description}" />`,
        `<meta property="og:image" content="${SITE_URL}/lp/og/${slug}.jpg" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
      ].join("\n    ");
      const page = html.replace("<title>iTakecare</title>", `<title>${title}</title>\n    ${tags}`);
      mkdirSync(`dist/lp/${slug}`, { recursive: true });
      writeFileSync(`dist/lp/${slug}/index.html`, page);
    });
  },
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === "development" && screenGraphPlugin(), landingSharePages()],
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
