import { z } from "zod";
export declare const createBlogPostSchema: z.ZodObject<{
    title: z.ZodString;
    thumbnailUrl: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
    authorId: z.ZodString;
    publishedAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateBlogPostSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    thumbnailUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    content: z.ZodOptional<z.ZodString>;
    authorId: z.ZodOptional<z.ZodString>;
    publishedAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type CreateBlogInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogPostSchema>;
//# sourceMappingURL=blogPost.validation.d.ts.map