import { z } from "zod";

export const createBannerSchema = z.object({
  title: z.string().min(3),
  redirectUrl: z.string().url().optional(),
  startDate: z.string(),
  endDate: z.string(),
});

export type CreateBannerDto = z.infer<typeof createBannerSchema>;
