import { z } from "zod";

export const createReviewSchema = z.object({
  movieId: z.string().uuid("Invalid movie ID"),

  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),

  comment: z.string().max(1000, "Comment too long").optional(),
});

export const updateReviewSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  comment: z.string().max(1000).optional(),
});

export type createReviewInput = z.infer<typeof createReviewSchema>;
export type updateReviewInput = z.infer<typeof updateReviewSchema>;
