import { z } from "zod";

export const createSeatSchema = z.object({
  seatRow: z.string().min(1, "Seat row is required"),

  seatNumber: z.number().min(1, "Seat number must be greater than 0"),

  seatCode: z.string().min(2, "Seat code is required"),

  seatType: z.enum(["standard", "vip", "couple"]),

  roomId: z.string().uuid("Room is required"),
});

export type CreateSeatFormData = z.infer<typeof createSeatSchema>;
