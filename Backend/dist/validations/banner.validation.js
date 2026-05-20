"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBannerSchema = void 0;
const zod_1 = require("zod");
exports.createBannerSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    redirectUrl: zod_1.z.string().url().optional(),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
});
//# sourceMappingURL=banner.validation.js.map