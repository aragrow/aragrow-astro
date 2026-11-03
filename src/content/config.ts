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
      featuredImageAlt: z.string().max(200).optional(),
      featuredImageCaption: z.string().max(100).optional(),
      order: z.number().optional(),
      // Sticky posts are pinned to the top of the homepage and the blog listing, ahead of
      // newer posts. Among themselves they stay in date order. Same idea as WordPress.
      sticky: z.boolean().default(false),
    }),
  }),
};
