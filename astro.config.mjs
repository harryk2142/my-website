import { defineConfig } from "astro/config";
import dotenv from "dotenv";
import mdx from "@astrojs/mdx";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
dotenv.config(); // load env vars from .env


// https://astro.build/config
export default defineConfig({
  site: "https://harryk2142.github.io",
  integrations: [mdx({
    remarkPlugins: [],
    rehypePlugins: [rehypeAstroRelativeMarkdownLinks]
  }), sitemap({
    filter: page => !page.includes("tags") && !page.includes("api")
  }), robotsTxt()],
  vite: {
    define: {
      FB_API_KEY: JSON.stringify(process.env.FIREBASE_COMMENTS_API_KEY),
      FB_PROJECT_ID: JSON.stringify(process.env.FIREBASE_COMMENTS_PROJECT_ID)
    },
    plugins: [],
    build: {
      modulePreload: false
      // reportCompressedSize: true,
    }
  },

  markdown: {
    remarkPlugins: [],
    rehypePlugins: [rehypeAstroRelativeMarkdownLinks]
  }
});