import { z } from "zod";
export declare const updateProfileSchema: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodEnum<{
        male: "male";
        female: "female";
        other: "other";
    }>>;
    dateOfBirth: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
//# sourceMappingURL=user.schema.d.ts.map