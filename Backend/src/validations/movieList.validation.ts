import { z } from "zod";
export const movieListQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  genre: z.string().optional(),
  status: z.enum(["coming_soon", "now_showing", "ended"]).optional(),
  sortBy: z.enum(["releaseDate", "title", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export type moviesListInput = z.infer<typeof movieListQuerySchema>;
