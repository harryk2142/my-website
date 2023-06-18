import { defineConfig } from "astro/config";
import dotenv from "dotenv";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
dotenv.config(); // load env vars from .env

// https://astro.build/config
export default defineConfig({
  site: "https://harry-kramer.net",
  integrations: [mdx(), sitemap()],
  vite: {
    define: {
      FB_API_KEY: JSON.stringify(process.env.FIREBASE_COMMENTS_API_KEY),
      FB_PROJECT_ID: JSON.stringify(process.env.FIREBASE_COMMENTS_PROJECT_ID),
    },
    plugins: [],
    build: {
      modulePreload: false,
    },
  },
});
