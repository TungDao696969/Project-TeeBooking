"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieSlugSchema = void 0;
const zod_1 = require("zod");
exports.movieSlugSchema = zod_1.z.object({ slug: zod_1.z.string().min(1) });
//# sourceMappingURL=movieSlug.validation.js.map