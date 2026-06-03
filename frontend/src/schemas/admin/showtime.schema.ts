import { z } from "zod";

export const createShowtimeSchema = z.object({
  movieId: z.string().min(1, "Movie là bắt buộc"),

  roomId: z.string().min(1, "Room là bắt buộc"),

  showDate: z.string().min(1, "Ngày chiếu là bắt buộc"),

  startTime: z.string().min(1, "Giờ bắt đầu là bắt buộc"),

  endTime: z.string().min(1, "Giờ kết thúc là bắt buộc"),

  basePrice: z.number().min(1, "Giá vé phải lớn hơn 0"),

  format: z.string(),

  language: z.string(),

  subtitle: z.string(),
});

export type ShowtimeFormData = z.infer<typeof createShowtimeSchema>;
