import { z } from "zod";
export declare const movieListQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    genre: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        ended: "ended";
        coming_soon: "coming_soon";
        now_showing: "now_showing";
    }>>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        createdAt: "createdAt";
        title: "title";
        releaseDate: "releaseDate";
    }>>;
    order: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export type moviesListInput = z.infer<typeof movieListQuerySchema>;
//# sourceMappingURL=movieList.validation.d.ts.map