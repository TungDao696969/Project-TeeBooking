"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCitySchema = exports.createCitySchema = void 0;
const zod_1 = require("zod");
exports.createCitySchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    slug: zod_1.z.string().min(2).max(100),
});
exports.updateCitySchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100).optional(),
    slug: zod_1.z.string().min(2).max(100).optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=city.validation.js.map