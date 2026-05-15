import { z } from "zod";

export const createBlogPostSchema = z.object({
  title: z.string().min(3),
  thumbnailUrl: z.string().url().optional(),
  content: z.string().min(20),
  authorId: z.string().uuid(),
  publishedAt: z.string().datetime().optional(),
});

export const updateBlogPostSchema = createBlogPostSchema.partial();

export type CreateBlogInput = z.infer<typeof createBlogPostSchema>;

export type UpdateBlogInput = z.infer<typeof updateBlogPostSchema>;
