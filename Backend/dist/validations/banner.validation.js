"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBannerSchema = exports.createBannerSchema = void 0;
const zod_1 = require("zod");
exports.createBannerSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    redirectUrl: zod_1.z.string().url().optional().or(zod_1.z.literal("")),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    isActive: zod_1.z.preprocess((val) => {
        if (val === "true")
            return true;
        if (val === "false")
            return false;
        return val;
    }, zod_1.z.boolean().optional().default(true)),
});
exports.updateBannerSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).optional(),
    redirectUrl: zod_1.z.string().url().optional().or(zod_1.z.literal("")),
    startDate: zod_1.z.string().optional(),
    endDate: zod_1.z.string().optional(),
    isActive: zod_1.z.preprocess((val) => {
        if (val === "true")
            return true;
        if (val === "false")
            return false;
        return val;
    }, zod_1.z.boolean().optional()),
});
//# sourceMappingURL=banner.validation.js.map