"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressSchema = exports.createAddressSchema = void 0;
const zod_1 = require("zod");
exports.createAddressSchema = zod_1.z.object({
    province: zod_1.z.string().min(1, "Province is required"),
    district: zod_1.z.string().min(1, "District is required"),
    ward: zod_1.z.string().min(1, "Ward is required"),
    addressDetail: zod_1.z.string().min(1, "Address detail is required"),
    isDefault: zod_1.z.boolean().optional(),
});
exports.updateAddressSchema = exports.createAddressSchema.partial();
//# sourceMappingURL=address.schema.js.map