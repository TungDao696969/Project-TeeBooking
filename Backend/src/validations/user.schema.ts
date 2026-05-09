import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().min(2).max(100).optional(),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/)
    .optional(),
  avatarUrl: z.string().url().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  dateOfBirth: z.string().datetime().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
