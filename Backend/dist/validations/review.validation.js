"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewSchema = exports.createReviewSchema = void 0;
const zod_1 = require("zod");
exports.createReviewSchema = zod_1.z.object({
    movieId: zod_1.z.string().uuid("Invalid movie ID"),
    rating: zod_1.z
        .number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5"),
    comment: zod_1.z.string().max(1000, "Comment too long").optional(),
});
exports.updateReviewSchema = zod_1.z.object({
    rating: zod_1.z.number().min(1).max(5).optional(),
    comment: zod_1.z.string().max(1000).optional(),
});
//# sourceMappingURL=review.validation.js.map