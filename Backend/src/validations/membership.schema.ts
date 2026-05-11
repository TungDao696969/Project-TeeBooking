import { z } from "zod";

export const updateMembershipSchema = z.object({
  level: z.enum(["BRONZE", "SILVER", "GOLD", "PLATINUM"]).optional(),
  points: z.number().int().min(0).optional(),
  lifetimePoints: z.number().int().min(0).optional(),
  expiredAt: z.string().datetime().optional(),
});
