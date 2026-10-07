import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guidesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.string(),
    badge: z.enum(['official', 'verified', 'draft']),
    officialSource: z.string().url().optional(),
    lastChecked: z.string().optional(),
    verified: z.boolean().default(false)
  })
});

export const collections = {
  'guides': guidesCollection,
};
