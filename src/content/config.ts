import { defineCollection, z } from 'astro:content';

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      date: z.string(),
      modified: z.string().optional(),
      author: z.string().default('David Arago'),
      categories: z.array(z.string()).default([]),
      excerpt: z.string().default(''),
      featuredImage: z.string().nullable().default(null),
    }),
  }),
};
