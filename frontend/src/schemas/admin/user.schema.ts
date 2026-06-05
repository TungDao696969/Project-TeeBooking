import { z } from "zod";

export const createUserSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),

  email: z.string().email("Invalid email"),

  phone: z.string().min(10, "Phone is invalid"),

  password: z.string().min(6, "Password minimum 6 characters"),

  role: z.enum(["admin", "customer"]),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  fullName: z.string().min(2),

  email: z.string().email(),

  phone: z.string(),

  role: z.enum(["admin", "customer"]),

  isActive: z.boolean(),

  isVerified: z.boolean(),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
