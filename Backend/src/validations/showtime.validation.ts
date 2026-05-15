import { z } from "zod";

export const createShowtimeSchema = z.object({
  movieId: z.string().uuid(),
  roomId: z.string().uuid(),
  showDate: z.string().datetime(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  basePrice: z.number().positive(),
  format: z.string().optional(),
  language: z.string().optional(),
  subtitle: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateShowtimeSchema = createShowtimeSchema.partial();

export type CreateShowtimeInput = z.infer<typeof createShowtimeSchema>;

export type UpdateShowtimeInput = z.infer<typeof updateShowtimeSchema>;
