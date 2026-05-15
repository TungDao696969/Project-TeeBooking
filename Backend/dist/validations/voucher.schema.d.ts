import { z } from "zod";
export declare const createVoucherSchema: z.ZodObject<{
    promotionId: z.ZodString;
    code: z.ZodString;
    usageLimit: z.ZodNumber;
    status: z.ZodEnum<{
        active: "active";
        inactive: "inactive";
        expired: "expired";
    }>;
}, z.core.$strip>;
export declare const updateVoucherSchema: z.ZodObject<{
    code: z.ZodOptional<z.ZodString>;
    usageLimit: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<{
        active: "active";
        inactive: "inactive";
        expired: "expired";
    }>>;
}, z.core.$strip>;
export type CreateVoucherInput = z.infer<typeof createVoucherSchema>;
export type UpdateVoucherInput = z.infer<typeof updateVoucherSchema>;
//# sourceMappingURL=voucher.schema.d.ts.map