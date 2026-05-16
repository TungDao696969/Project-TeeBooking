import { z } from "zod";

export const createCinemaSchema = z.object({
  name: z.string().min(2).max(255),
  hotline: z.string().optional(),
  email: z.string().email().optional(),
  cityId: z.string().uuid(),
  province: z.string().min(1),
  district: z.string().min(1),
  ward: z.string().min(1),
  address: z.string().min(5),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  openingHours: z.string().optional(),
});

export const updateCinemaSchema = createCinemaSchema.partial();

export type CreateCinemaInput = z.infer<typeof createCinemaSchema>;
export type UpdateCinemaInput = z.infer<typeof updateCinemaSchema>;
