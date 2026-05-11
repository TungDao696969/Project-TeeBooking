import { z } from "zod";

export const createNotificationSchema = z.object({
  title: z.string().min(3, "Title phải ít nhất 3 ký tự").max(255),

  content: z.string().min(5, "Content phải ít nhất 5 ký tự"),

  type: z.string().optional(),
});

export const updateNotificationSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  content: z.string().min(5).optional(),
  type: z.string().optional(),
  isRead: z.boolean().optional(),
});

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;

export type UpdateNotificationInput = z.infer<typeof updateNotificationSchema>;
