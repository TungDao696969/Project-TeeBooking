import { z } from "zod";

export const createSeatSchema = z.object({
  roomId: z.string().uuid(),
  seatRow: z.string().min(1).max(5),
  seatNumber: z.number().int().positive(),
  seatCode: z.string().min(2),
  seatType: z.enum(["standard", "vip", "couple", "recliner"]),
  extraPrice: z.number().min(0).optional(),
});

export const updateSeatSchema = createSeatSchema.partial();

export type CreateSeatInput = z.infer<typeof createSeatSchema>;

export type UpdateSeatInput = z.infer<typeof updateSeatSchema>;

export const generateSeatSchema = z.object({
  roomId: z.string().uuid(),

  rows: z.array(z.string()).min(1, "Rows is required"),

  seatsPerRow: z.number().min(1).max(30),
});

export const updateSeatTypeSchema = z.object({
  roomId: z.string().uuid(),
  startRow: z.string().min(1).max(5),
  endRow: z.string().min(1).max(5),
  seatType: z.enum(["standard", "vip", "couple", "recliner"]),
});
