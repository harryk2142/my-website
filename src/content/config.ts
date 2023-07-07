import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    id: z.string(),
    title: z.string(),
    headline: z.string(),
    description: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    draft: z.boolean().optional(),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    postImage: z
      .object({
        src: z.string(),
        prevSrc: z.string(),
        thumbnail: z.string().optional(),
        alt: z.string(),
      })
      .optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { blog };
