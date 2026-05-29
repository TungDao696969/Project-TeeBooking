import { z } from "zod";

export const comboBookingSchema = z.object({
  combos: z.array(
    z.object({
      comboId: z.string(),
      quantity: z.number().min(1),
    }),
  ),
});
