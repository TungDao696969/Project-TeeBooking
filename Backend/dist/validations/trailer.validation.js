"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTrailerSchema = exports.createTrailerSchema = void 0;
const zod_1 = require("zod");
exports.createTrailerSchema = zod_1.z.object({
    movieId: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(2).max(255),
    videoUrl: zod_1.z.string().url(),
    thumbnailUrl: zod_1.z.string().url().optional(),
    type: zod_1.z.enum(["teaser", "official", "final", "clip", "behind_the_scenes"]),
    sortOrder: zod_1.z.number().optional(),
});
exports.updateTrailerSchema = zod_1.z.object({
    title: zod_1.z.string().min(2).max(255).optional(),
    videoUrl: zod_1.z.string().url().optional(),
    thumbnailUrl: zod_1.z.string().url().optional(),
    type: zod_1.z
        .enum(["teaser", "official", "final", "clip", "behind_the_scenes"])
        .optional(),
    isActive: zod_1.z.boolean().optional(),
    sortOrder: zod_1.z.number().optional(),
});
//# sourceMappingURL=trailer.validation.js.map