import { defineCollection, z } from 'astro:content';

/**
 * 博客内容集合
 * 目录：src/content/blog/ai | mingli | life（子目录仅用于组织）
 * category 字段决定栏目归属
 */
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    category: z.enum(['ai', 'mingli', 'life']),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    num: z.string(),
    cat: z.string(),
    summary: z.string(),
    tech: z.array(z.string()).default([]),
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .default([]),
    images: z
      .object({ a: z.string(), b: z.string(), c: z.string() })
      .optional(),
    links: z
      .object({
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
      })
      .optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog, projects };
