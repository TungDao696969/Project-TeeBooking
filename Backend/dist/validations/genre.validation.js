"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreIdSchema = exports.updateGenreSchema = exports.createGenreSchema = void 0;
const zod_1 = require("zod");
exports.createGenreSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(100),
    }),
});
exports.updateGenreSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(100),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().uuid(),
    }),
});
exports.genreIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid(),
    }),
});
//# sourceMappingURL=genre.validation.js.map