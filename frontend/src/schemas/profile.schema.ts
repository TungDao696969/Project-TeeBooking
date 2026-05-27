import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2, "Tên quá ngắn"),

  phone: z.string().min(10, "Số điện thoại không hợp lệ"),

  gender: z.enum(["male", "female"]),

  dateOfBirth: z.string(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;

export const avatarSchema = z.object({
  avatar: z.any().refine((file) => file instanceof File, {
    message: "Vui lòng chọn ảnh",
  }),
});

export type AvatarSchemaType = z.infer<typeof avatarSchema>;
