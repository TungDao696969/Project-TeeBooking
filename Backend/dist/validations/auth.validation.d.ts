import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodString;
    gender: z.ZodOptional<z.ZodEnum<{
        male: "male";
        female: "female";
        other: "other";
    }>>;
    dateOfBirth: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type RegisterInput = z.infer<typeof registerSchema>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginInput = z.infer<typeof loginSchema>;
//# sourceMappingURL=auth.validation.d.ts.map