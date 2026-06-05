import { z } from "zod";

export const seatSchema = z.object({
  roomId: z.string().min(1, "Room is required"),

  seatRow: z
    .string()
    .min(1)
    .max(1)
    .transform((v) => v.toUpperCase()),

  seatNumber: z.number().min(1, "Seat number must be greater than 0"),

  seatType: z.enum(["standard", "vip", "couple"]),

  extraPrice: z.number().min(0),
});

export type SeatFormData = z.infer<typeof seatSchema>;

export const updateSeatSchema = z.object({
  seatCode: z.string().min(1, "Seat code is required"),

  seatRow: z.string().min(1, "Row label is required"),

  seatNumber: z.number().min(1, "Seat number must be greater than 0"),

  seatType: z.enum(["standard", "vip", "couple"]),

  extraPrice: z.number().min(0, "Extra price cannot be negative").optional(),
});
export type UpdateSeatFormData = z.infer<typeof updateSeatSchema>;
