// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import path from "path";
import { fileURLToPath } from "url";
import remarkMermaid from "remark-mermaidjs";
import react from "@astrojs/react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: "https://blog.luckytime1996.dev",
  integrations: [mdx(), sitemap(), icon(), react()],
  markdown: {
    remarkPlugins: [
      remarkMermaid
    ],
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
