import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine((value) => !value || z.string().url().safeParse(value).success, {
    message: "URL không hợp lệ",
  });

export const movieSchema = z.object({
  title: z.string().trim().min(2, "Tên phim phải có ít nhất 2 ký tự"),

  description: z.string().trim().min(10, "Mô tả phải có ít nhất 10 ký tự"),

  durationMinutes: z.number().min(1, "Thời lượng phải lớn hơn 0"),

  releaseDate: z.string().min(1, "Vui lòng chọn ngày chiếu"),

  ageRating: z.string(),

  language: z.string(),

  subtitle: z.string(),

  trailerUrl: optionalUrl,

  poster: z.instanceof(File, {
    message: "Poster is required",
  }),

  banner: z.instanceof(File, {
    message: "Banner is required",
  }),

  country: z.string(),

  producer: z.string(),

  status: z.enum(["coming_soon", "now_showing", "ended"]),
});

export type MovieFormData = z.infer<typeof movieSchema>;

export const movieUpdateSchema = movieSchema.extend({
  poster: z.any().optional(),
  banner: z.any().optional(),
});

export type MovieUpdateFormData = z.infer<typeof movieUpdateSchema>;
