"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePromotionSchema = exports.createPromotionSchema = void 0;
const zod_1 = require("zod");
const promotionBaseSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().url().optional(),
    type: zod_1.z.enum(["percentage", "fixed_amount", "combo"]),
    discountValue: zod_1.z.number().positive(),
    minOrderValue: zod_1.z.number().positive().optional(),
    maxDiscount: zod_1.z.number().positive().optional(),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    isActive: zod_1.z.boolean().optional(),
});
exports.createPromotionSchema = promotionBaseSchema.superRefine((data, ctx) => {
    if (new Date(data.endDate) <= new Date(data.startDate)) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "End date must be greater than start date",
            path: ["endDate"],
        });
    }
    if (data.type === "percentage" && data.discountValue > 100) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Percentage discount cannot exceed 100%",
            path: ["discountValue"],
        });
    }
});
exports.updatePromotionSchema = promotionBaseSchema
    .partial()
    .superRefine((data, ctx) => {
    if (data.startDate && data.endDate) {
        if (new Date(data.endDate) <= new Date(data.startDate)) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "End date must be greater than start date",
                path: ["endDate"],
            });
        }
    }
    if (data.type === "percentage" &&
        data.discountValue !== undefined &&
        data.discountValue > 100) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "Percentage discount cannot exceed 100%",
            path: ["discountValue"],
        });
    }
});
//# sourceMappingURL=promotion.validation.js.map