"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMembershipSchema = void 0;
const zod_1 = require("zod");
exports.updateMembershipSchema = zod_1.z.object({
    level: zod_1.z.enum(["BRONZE", "SILVER", "GOLD", "PLATINUM"]).optional(),
    points: zod_1.z.number().int().min(0).optional(),
    lifetimePoints: zod_1.z.number().int().min(0).optional(),
    expiredAt: zod_1.z.string().datetime().optional(),
});
//# sourceMappingURL=membership.schema.js.map