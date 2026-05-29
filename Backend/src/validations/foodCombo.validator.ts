import { z } from "zod";

export const createFoodComboSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  stockQuantity: z.number().int().min(0),
  isActive: z.boolean().optional(),
});

export const updateFoodComboSchema = createFoodComboSchema.partial();
