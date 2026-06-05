import { z } from "zod";

export const createUserSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),

  email: z.string().email("Invalid email"),

  phone: z.string().min(10, "Invalid phone"),

  password: z.string().min(6, "Password too short"),

  role: z.enum(["customer", "admin", "staff"]).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
