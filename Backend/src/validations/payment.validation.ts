import { z } from "zod";

export const createMomoPaymentSchema = z.object({
  bookingId: z.string().uuid(),
  amount: z.number().positive(),
});
