import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guidesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.string(),
    badge: z.enum(['official', 'verified', 'draft']),
    officialSource: z.union([z.string().url(), z.array(z.string().url())]).optional(),
    lastChecked: z.string().optional(),
    verified: z.boolean().default(false),
    reviewIntervalMonths: z.number().optional(),
    audience: z.enum(['student', 'worker', 'tourist', 'nomad', 'family', 'all']).optional(),
    relatedGuides: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional()
  })
});

export const collections = {
  'guides': guidesCollection,
};
