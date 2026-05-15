import { z } from "zod";

export const createCitySchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100),
});

export const updateCitySchema = z.object({
  name: z.string().min(2).max(100).optional(),
  slug: z.string().min(2).max(100).optional(),
  isActive: z.boolean().optional(),
});
