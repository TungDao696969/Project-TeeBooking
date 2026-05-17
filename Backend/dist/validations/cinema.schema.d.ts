import { z } from "zod";
export declare const createCinemaSchema: z.ZodObject<{
    name: z.ZodString;
    hotline: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    cityId: z.ZodString;
    province: z.ZodString;
    district: z.ZodString;
    ward: z.ZodString;
    address: z.ZodString;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    openingHours: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateCinemaSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    hotline: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    cityId: z.ZodOptional<z.ZodString>;
    province: z.ZodOptional<z.ZodString>;
    district: z.ZodOptional<z.ZodString>;
    ward: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    openingHours: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type CreateCinemaInput = z.infer<typeof createCinemaSchema>;
export type UpdateCinemaInput = z.infer<typeof updateCinemaSchema>;
//# sourceMappingURL=cinema.schema.d.ts.map