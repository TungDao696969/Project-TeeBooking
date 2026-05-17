import { z } from "zod";
export declare const createTrailerSchema: z.ZodObject<{
    movieId: z.ZodString;
    title: z.ZodString;
    videoUrl: z.ZodString;
    thumbnailUrl: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<{
        teaser: "teaser";
        official: "official";
        final: "final";
        clip: "clip";
        behind_the_scenes: "behind_the_scenes";
    }>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateTrailerSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    videoUrl: z.ZodOptional<z.ZodString>;
    thumbnailUrl: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        teaser: "teaser";
        official: "official";
        final: "final";
        clip: "clip";
        behind_the_scenes: "behind_the_scenes";
    }>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
//# sourceMappingURL=trailer.validation.d.ts.map