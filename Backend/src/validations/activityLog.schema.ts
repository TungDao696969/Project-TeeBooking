import { z } from "zod";

export const createCinemaRoomSchema = z.object({
  cinemaId: z.string().uuid(),
  roomName: z.string().min(2),
  roomType: z.string().min(2),
  totalSeats: z.number().int().positive(),
  screenType: z.string().optional(),
  soundSystem: z.string().optional(),
});

export const updateCinemaRoomSchema = createCinemaRoomSchema.partial();

// infer type
export type CreateCinemaRoomInput = z.infer<typeof createCinemaRoomSchema>;
export type UpdateCinemaRoomInput = z.infer<typeof updateCinemaRoomSchema>;
