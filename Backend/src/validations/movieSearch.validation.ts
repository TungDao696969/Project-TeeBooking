import { z } from "zod";

export const movieSearchSchema = z.object({
  q: z.string().optional(),
  genre: z.string().optional(),
  status: z.string().optional(),
  minRating: z.coerce.number().min(1).max(5).optional(),
  year: z.coerce.number().optional(),
  sort: z
    .enum([
      "latest",
      "oldest",
      "rating_desc",
      "rating_asc",
      "title_asc",
      "title_desc",
    ])
    .optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
});
