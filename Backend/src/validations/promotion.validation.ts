import { z } from "zod";

const promotionBaseSchema = z.object({
  title: z.string().min(3),

  description: z.string().optional(),

  imageUrl: z.string().url().optional(),

  type: z.enum(["percentage", "fixed_amount", "combo"]),

  discountValue: z.number().positive(),

  minOrderValue: z.number().positive().optional(),

  maxDiscount: z.number().positive().optional(),

  startDate: z.string(),

  endDate: z.string(),

  isActive: z.boolean().optional(),
});

export const createPromotionSchema = promotionBaseSchema.superRefine(
  (data, ctx) => {
    if (new Date(data.endDate) <= new Date(data.startDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date must be greater than start date",
        path: ["endDate"],
      });
    }

    if (data.type === "percentage" && data.discountValue > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Percentage discount cannot exceed 100%",
        path: ["discountValue"],
      });
    }
  },
);

export const updatePromotionSchema = promotionBaseSchema
  .partial()
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate) {
      if (new Date(data.endDate) <= new Date(data.startDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End date must be greater than start date",
          path: ["endDate"],
        });
      }
    }

    if (
      data.type === "percentage" &&
      data.discountValue !== undefined &&
      data.discountValue > 100
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Percentage discount cannot exceed 100%",
        path: ["discountValue"],
      });
    }
  });

export type CreatePromotionDto = z.infer<typeof createPromotionSchema>;
