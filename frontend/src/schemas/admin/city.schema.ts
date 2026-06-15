import { z } from "zod";

export const citySchema = z.object({
  name: z.string().min(2, "Tên thành phố phải có ít nhất 2 ký tự"),
  slug: z.string().min(2, "Slug phải có ít nhất 2 ký tự"),
  isActive: z.boolean(),
});

export type CityFormValues = z.infer<typeof citySchema>;
