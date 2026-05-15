import { z } from "zod";
export const movieSlugSchema = z.object({ slug: z.string().min(1) });

export type moviesSlugInput = z.infer<typeof movieSlugSchema>;
