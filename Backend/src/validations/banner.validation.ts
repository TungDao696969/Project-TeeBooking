import { z } from "zod";

export const createBannerSchema = z.object({
  title: z.string().min(3),
  redirectUrl: z.string().url().optional().or(z.literal("")),
  startDate: z.string(),
  endDate: z.string(),
  isActive: z.preprocess(
    (val) => {
      if (val === "true") return true;
      if (val === "false") return false;
      return val;
    },
    z.boolean().optional().default(true)
  ),
});

export const updateBannerSchema = z.object({
  title: z.string().min(3).optional(),
  redirectUrl: z.string().url().optional().or(z.literal("")),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isActive: z.preprocess(
    (val) => {
      if (val === "true") return true;
      if (val === "false") return false;
      return val;
    },
    z.boolean().optional()
  ),
});

export type CreateBannerDto = z.infer<typeof createBannerSchema>;
export type UpdateBannerDto = z.infer<typeof updateBannerSchema>;
