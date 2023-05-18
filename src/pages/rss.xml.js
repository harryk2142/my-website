import { SITE_DESCRIPTION_SHORT, SITE_TITLE } from "../consts";

import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function get(context) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION_SHORT,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  });
}
