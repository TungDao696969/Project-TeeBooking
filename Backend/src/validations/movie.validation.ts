import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(2).max(255),
  originalTitle: z.string().optional(),
  description: z.string().min(10),

  durationMinutes: z.number().min(1),

  releaseDate: z.string(),
  endDate: z.string().optional(),

  ageRating: z.string().optional(),
  language: z.string().optional(),
  subtitle: z.string().optional(),

  trailerUrl: z.string().url().optional(),
  posterUrl: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),

  status: z.enum(["coming_soon", "now_showing", "ended"]),

  country: z.string().optional(),
  producer: z.string().optional(),
});
export type CreateMoviesInput = z.infer<typeof createMovieSchema>;

export const updateMovieSchema = z.object({
  title: z.string().min(2).max(255).optional(),
  originalTitle: z.string().optional(),
  description: z.string().min(10).optional(),

  durationMinutes: z.number().min(1).optional(),

  releaseDate: z.string().optional(),
  endDate: z.string().optional(),

  ageRating: z.string().optional(),
  language: z.string().optional(),
  subtitle: z.string().optional(),

  trailerUrl: z.string().url().optional(),
  posterUrl: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),

  status: z.enum(["coming_soon", "now_showing", "ended"]).optional(),

  country: z.string().optional(),
  producer: z.string().optional(),
});

export type UpdateMoviesInput = z.infer<typeof updateMovieSchema>;

export const getMovieShowtimesSchema = z.object({
  params: z.object({
    slug: z.string().min(1),
  }),
});
