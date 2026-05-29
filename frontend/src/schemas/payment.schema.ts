import { z } from "zod";

export const paymentSchema = z.object({
  paymentMethod: z.enum(["vnpay", "momo"]),
  voucherCode: z.string().optional(),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;
