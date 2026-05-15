import { z } from "zod";
export declare const createAddressSchema: z.ZodObject<{
    province: z.ZodString;
    district: z.ZodString;
    ward: z.ZodString;
    addressDetail: z.ZodString;
    isDefault: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateAddressSchema: z.ZodObject<{
    province: z.ZodOptional<z.ZodString>;
    district: z.ZodOptional<z.ZodString>;
    ward: z.ZodOptional<z.ZodString>;
    addressDetail: z.ZodOptional<z.ZodString>;
    isDefault: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;
//# sourceMappingURL=address.schema.d.ts.map