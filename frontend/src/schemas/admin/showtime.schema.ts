import { z } from "zod";

export const showtimeSchema = z.object({
  movieId: z.string().min(1),
  roomId: z.string().min(1),

  showDate: z.string(),

  startTime: z.string(),

  endTime: z.string(),

  basePrice: z.coerce.number(),

  format: z.string(),

  language: z.string(),

  subtitle: z.string(),
});

export type ShowtimeFormData = z.infer<typeof showtimeSchema>;
