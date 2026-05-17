"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieSearchSchema = void 0;
const zod_1 = require("zod");
exports.movieSearchSchema = zod_1.z.object({
    q: zod_1.z.string().optional(),
    genre: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
    minRating: zod_1.z.coerce.number().min(1).max(5).optional(),
    year: zod_1.z.coerce.number().optional(),
    sort: zod_1.z
        .enum([
        "latest",
        "oldest",
        "rating_desc",
        "rating_asc",
        "title_asc",
        "title_desc",
    ])
        .optional(),
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(50).default(10),
});
//# sourceMappingURL=movieSearch.validation.js.map