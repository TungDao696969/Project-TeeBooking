"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVoucherSchema = exports.createVoucherSchema = void 0;
const zod_1 = require("zod");
exports.createVoucherSchema = zod_1.z.object({
    promotionId: zod_1.z.string().uuid("Invalid promotion id"),
    code: zod_1.z.string().min(3).max(50),
    usageLimit: zod_1.z.number().int().min(1),
    status: zod_1.z.enum(["active", "inactive", "expired"]),
});
exports.updateVoucherSchema = zod_1.z.object({
    code: zod_1.z.string().min(3).max(50).optional(),
    usageLimit: zod_1.z.number().int().min(1).optional(),
    status: zod_1.z.enum(["active", "inactive", "expired"]).optional(),
});
//# sourceMappingURL=voucher.schema.js.map