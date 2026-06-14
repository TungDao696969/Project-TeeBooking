import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    password: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<{
        customer: "customer";
        admin: "admin";
        staff: "staff";
    }>>;
}, z.core.$strip>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
//# sourceMappingURL=user.validation.d.ts.map