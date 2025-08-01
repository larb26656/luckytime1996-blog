import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.string().optional(),
      description: z.string().optional(),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      image: image().optional(),
      draft: z.boolean().optional(),
    }),
});

export const collections = { blog };
