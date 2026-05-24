import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Họ tên tối thiểu 2 ký tự"),

    email: z.email("Email không hợp lệ"),

    phone: z.string().min(10),

    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),

    confirmPassword: z.string(),

    gender: z.enum(["male", "female"]),

    dateOfBirth: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const otpSchema = z.object({
  email: z.email(),

  otp: z.string().length(6),
});

export type OtpSchemaType = z.infer<typeof otpSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),

  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),

  remember: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
