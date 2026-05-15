import { z } from "zod";
export declare const updateMembershipSchema: z.ZodObject<{
    level: z.ZodOptional<z.ZodEnum<{
        BRONZE: "BRONZE";
        SILVER: "SILVER";
        GOLD: "GOLD";
        PLATINUM: "PLATINUM";
    }>>;
    points: z.ZodOptional<z.ZodNumber>;
    lifetimePoints: z.ZodOptional<z.ZodNumber>;
    expiredAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=membership.schema.d.ts.map