import { z } from "zod";
export declare const createBannerSchema: z.ZodObject<{
    title: z.ZodString;
    redirectUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    isActive: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
}, z.core.$strip>;
export declare const updateBannerSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    redirectUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    isActive: z.ZodPreprocess<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export type CreateBannerDto = z.infer<typeof createBannerSchema>;
export type UpdateBannerDto = z.infer<typeof updateBannerSchema>;
//# sourceMappingURL=banner.validation.d.ts.map