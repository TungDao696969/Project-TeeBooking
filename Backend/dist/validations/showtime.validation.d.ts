import { z } from "zod";
export declare const createShowtimeSchema: z.ZodObject<{
    movieId: z.ZodString;
    roomId: z.ZodString;
    showDate: z.ZodString;
    startTime: z.ZodString;
    endTime: z.ZodString;
    basePrice: z.ZodNumber;
    format: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    subtitle: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateShowtimeSchema: z.ZodObject<{
    movieId: z.ZodOptional<z.ZodString>;
    roomId: z.ZodOptional<z.ZodString>;
    showDate: z.ZodOptional<z.ZodString>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    basePrice: z.ZodOptional<z.ZodNumber>;
    format: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    language: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    subtitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export type CreateShowtimeInput = z.infer<typeof createShowtimeSchema>;
export type UpdateShowtimeInput = z.infer<typeof updateShowtimeSchema>;
//# sourceMappingURL=showtime.validation.d.ts.map