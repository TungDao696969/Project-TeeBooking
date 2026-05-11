import { z } from "zod";
export const createVoucherSchema = z.object({
  promotionId: z.string().uuid("Invalid promotion id"),
  code: z.string().min(3).max(50),
  usageLimit: z.number().int().min(1),
  status: z.enum(["active", "inactive", "expired"]),
});

export const updateVoucherSchema = z.object({
  code: z.string().min(3).max(50).optional(),
  usageLimit: z.number().int().min(1).optional(),
  status: z.enum(["active", "inactive", "expired"]).optional(),
});

export type CreateVoucherInput = z.infer<typeof createVoucherSchema>;
export type UpdateVoucherInput = z.infer<typeof updateVoucherSchema>;