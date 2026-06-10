import { z } from "zod";

export const createBookingSchema = z.object({
  showtimeId: z.string().uuid(),

  seatIds: z.array(z.string().uuid()),

  comboIds: z
    .array(
      z.object({
        comboId: z.string().uuid(),
        quantity: z.number().min(1),
      }),
    )
    .optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
