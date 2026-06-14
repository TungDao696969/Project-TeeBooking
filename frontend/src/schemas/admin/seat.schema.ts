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

export const generateSeatSchema = z.object({
  roomId: z.string().uuid(),
  rowCount: z.number().min(1).max(26),
  seatsPerRow: z.number().min(1).max(30),
});

export type GenerateSeatFormData = z.infer<typeof generateSeatSchema>;

export const updateSeatTypeSchema = z.object({
  roomId: z.string().uuid(),
  startRow: z.string().min(1, "Từ hàng là bắt buộc").max(5),
  endRow: z.string().min(1, "Đến hàng là bắt buộc").max(5),
  seatType: z.enum(["standard", "vip", "couple", "recliner"]),
});

export type UpdateSeatTypeFormData = z.infer<typeof updateSeatTypeSchema>;

