import { z } from "zod";
export declare const createBannerSchema: z.ZodObject<{
    title: z.ZodString;
    redirectUrl: z.ZodOptional<z.ZodString>;
    startDate: z.ZodString;
    endDate: z.ZodString;
}, z.core.$strip>;
export type CreateBannerDto = z.infer<typeof createBannerSchema>;
//# sourceMappingURL=banner.validation.d.ts.map