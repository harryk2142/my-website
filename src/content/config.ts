import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    headline: z.string(),
    draft: z.boolean().optional(),
    heroImage: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    shareImage: z.string().optional(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    place: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { blog };
