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

  tickets: z
    .array(
      z.object({
        ticketTypeId: z.string().uuid(),
        quantity: z.number().min(1),
        price: z.number().min(0),
      })
    )
    .optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
