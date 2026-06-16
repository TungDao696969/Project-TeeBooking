import { z } from "zod";
export declare const createPromotionSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<{
        combo: "combo";
        percentage: "percentage";
        fixed_amount: "fixed_amount";
    }>;
    discountValue: z.ZodNumber;
    minOrderValue: z.ZodOptional<z.ZodNumber>;
    maxDiscount: z.ZodOptional<z.ZodNumber>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updatePromotionSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    imageUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    type: z.ZodOptional<z.ZodEnum<{
        combo: "combo";
        percentage: "percentage";
        fixed_amount: "fixed_amount";
    }>>;
    discountValue: z.ZodOptional<z.ZodNumber>;
    minOrderValue: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    maxDiscount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export type CreatePromotionDto = z.infer<typeof createPromotionSchema>;
//# sourceMappingURL=promotion.validation.d.ts.map