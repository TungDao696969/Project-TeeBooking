import { z } from "zod";
export declare const createReviewSchema: z.ZodObject<{
    movieId: z.ZodString;
    rating: z.ZodNumber;
    comment: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateReviewSchema: z.ZodObject<{
    rating: z.ZodOptional<z.ZodNumber>;
    comment: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type createReviewInput = z.infer<typeof createReviewSchema>;
export type updateReviewInput = z.infer<typeof updateReviewSchema>;
//# sourceMappingURL=review.validation.d.ts.map