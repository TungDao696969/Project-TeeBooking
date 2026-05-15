"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogPostSchema = exports.createBlogPostSchema = void 0;
const zod_1 = require("zod");
exports.createBlogPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    thumbnailUrl: zod_1.z.string().url().optional(),
    content: zod_1.z.string().min(20),
    authorId: zod_1.z.string().uuid(),
    publishedAt: zod_1.z.string().datetime().optional(),
});
exports.updateBlogPostSchema = exports.createBlogPostSchema.partial();
//# sourceMappingURL=blogPost.validation.js.map