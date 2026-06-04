import { z } from "zod";

export const createRoomSchema = z.object({
  cinemaId: z.string().min(1, "Cinema is required"),

  roomName: z.string().min(1, "Room name is required"),

  roomType: z.enum(["2D", "3D", "IMAX"]),

  totalSeats: z.number().min(1, "Total seats must be greater than 0"),

  screenType: z.string().min(1),

  soundSystem: z.string().min(1),
});

export type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export const updateRoomSchema = z.object({
  roomName: z.string().min(2, "Tên phòng phải có ít nhất 2 ký tự"),
  roomType: z.string().min(1, "Vui lòng nhập loại phòng"),

  screenType: z.string().min(1, "Vui lòng chọn loại màn hình"),

  soundSystem: z.string().min(1, "Vui lòng chọn hệ thống âm thanh"),

  totalSeats: z.number().min(1, "Số ghế phải lớn hơn 0"),
});

export type UpdateRoomFormData = z.infer<typeof updateRoomSchema>;
