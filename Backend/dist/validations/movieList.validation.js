"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieListQuerySchema = void 0;
const zod_1 = require("zod");
exports.movieListQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
    search: zod_1.z.string().optional(),
    genre: zod_1.z.string().optional(),
    status: zod_1.z.enum(["coming_soon", "now_showing", "ended"]).optional(),
    sortBy: zod_1.z.enum(["releaseDate", "title", "createdAt"]).optional(),
    order: zod_1.z.enum(["asc", "desc"]).optional(),
});
//# sourceMappingURL=movieList.validation.js.map