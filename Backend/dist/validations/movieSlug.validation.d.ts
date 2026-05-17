import { z } from "zod";
export declare const movieSlugSchema: z.ZodObject<{
    slug: z.ZodString;
}, z.core.$strip>;
export type moviesSlugInput = z.infer<typeof movieSlugSchema>;
//# sourceMappingURL=movieSlug.validation.d.ts.map