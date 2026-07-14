import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(3, "Họ tên tối thiểu 3 ký tự"),

    email: z.string().email("Email không hợp lệ"),

    phone: z
      .string()
      .min(8, "Số điện thoại tối thiểu 8 ký tự")
      .regex(/^\d+$/, "Số điện thoại chỉ được chứa số"),

    password: z
      .string()
      .min(8, "Mật khẩu tối thiểu 8 ký tự")
      .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa")
      .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ thường")
      .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 chữ số"),

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

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6, "OTP gồm 6 số"),

  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});
