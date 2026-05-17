import { z } from "zod";
export declare const movieSearchSchema: z.ZodObject<{
    q: z.ZodOptional<z.ZodString>;
    genre: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    minRating: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    year: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    sort: z.ZodOptional<z.ZodEnum<{
        latest: "latest";
        oldest: "oldest";
        rating_desc: "rating_desc";
        rating_asc: "rating_asc";
        title_asc: "title_asc";
        title_desc: "title_desc";
    }>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
//# sourceMappingURL=movieSearch.validation.d.ts.map