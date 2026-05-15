import { z } from "zod";
export declare const createMovieSchema: z.ZodObject<{
    title: z.ZodString;
    originalTitle: z.ZodOptional<z.ZodString>;
    description: z.ZodString;
    durationMinutes: z.ZodNumber;
    releaseDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodString>;
    ageRating: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    subtitle: z.ZodOptional<z.ZodString>;
    trailerUrl: z.ZodOptional<z.ZodString>;
    posterUrl: z.ZodOptional<z.ZodString>;
    bannerUrl: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<{
        ended: "ended";
        coming_soon: "coming_soon";
        now_showing: "now_showing";
    }>;
    country: z.ZodOptional<z.ZodString>;
    producer: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateMoviesInput = z.infer<typeof createMovieSchema>;
export declare const updateMovieSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    originalTitle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    durationMinutes: z.ZodOptional<z.ZodNumber>;
    releaseDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    ageRating: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    subtitle: z.ZodOptional<z.ZodString>;
    trailerUrl: z.ZodOptional<z.ZodString>;
    posterUrl: z.ZodOptional<z.ZodString>;
    bannerUrl: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        ended: "ended";
        coming_soon: "coming_soon";
        now_showing: "now_showing";
    }>>;
    country: z.ZodOptional<z.ZodString>;
    producer: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UpdateMoviesInput = z.infer<typeof updateMovieSchema>;
//# sourceMappingURL=movie.validation.d.ts.map