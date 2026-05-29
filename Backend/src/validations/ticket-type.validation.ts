import { z } from "zod";

export const createTicketTypeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  code: z.string().min(2).toLowerCase(),

  description: z.string().optional(),

  isActive: z.boolean().optional(),
});

export const updateTicketTypeSchema = createTicketTypeSchema.partial();
