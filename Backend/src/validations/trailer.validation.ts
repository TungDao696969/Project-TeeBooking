import { z } from "zod";

export const createTrailerSchema = z.object({
  movieId: z.string().uuid(),
  title: z.string().min(2).max(255),
  videoUrl: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  type: z.enum(["teaser", "official", "final", "clip", "behind_the_scenes"]),
  sortOrder: z.number().optional(),
});

export const updateTrailerSchema = z.object({
  title: z.string().min(2).max(255).optional(),
  videoUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
  type: z
    .enum(["teaser", "official", "final", "clip", "behind_the_scenes"])
    .optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
});
