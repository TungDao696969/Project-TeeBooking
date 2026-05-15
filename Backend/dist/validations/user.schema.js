"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateProfileSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2).max(100).optional(),
    phone: zod_1.z
        .string()
        .regex(/^[0-9]{10,11}$/)
        .optional(),
    avatarUrl: zod_1.z.string().url().optional(),
    gender: zod_1.z.enum(["male", "female", "other"]).optional(),
    dateOfBirth: zod_1.z.string().datetime().optional(),
});
//# sourceMappingURL=user.schema.js.map