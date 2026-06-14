import { z } from "zod";

export const createBannerSchema = z.object({
  title: z.string().min(2, "Title is required"),
  redirectUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  image: z.string().min(1, "Banner image is required"),
  isActive: z.boolean(),
});

export type CreateBannerFormData = z.infer<typeof createBannerSchema>;

export const updateBannerSchema = z.object({
  title: z.string().min(2, "Title is required").optional(),
  redirectUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isActive: z.boolean().optional(),
  image: z.string().optional(),
});

export type UpdateBannerFormData = z.infer<typeof updateBannerSchema>;
