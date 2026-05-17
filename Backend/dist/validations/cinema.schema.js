"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCinemaSchema = exports.createCinemaSchema = void 0;
const zod_1 = require("zod");
exports.createCinemaSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(255),
    hotline: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    cityId: zod_1.z.string().uuid(),
    province: zod_1.z.string().min(1),
    district: zod_1.z.string().min(1),
    ward: zod_1.z.string().min(1),
    address: zod_1.z.string().min(5),
    latitude: zod_1.z.number().optional(),
    longitude: zod_1.z.number().optional(),
    openingHours: zod_1.z.string().optional(),
});
exports.updateCinemaSchema = exports.createCinemaSchema.partial();
//# sourceMappingURL=cinema.schema.js.map