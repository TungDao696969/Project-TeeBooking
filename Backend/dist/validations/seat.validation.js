"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSeatTypeSchema = exports.generateSeatSchema = exports.updateSeatSchema = exports.createSeatSchema = void 0;
const zod_1 = require("zod");
exports.createSeatSchema = zod_1.z.object({
    roomId: zod_1.z.string().uuid(),
    seatRow: zod_1.z.string().min(1).max(5),
    seatNumber: zod_1.z.number().int().positive(),
    seatCode: zod_1.z.string().min(2),
    seatType: zod_1.z.enum(["standard", "vip", "couple", "recliner"]),
    extraPrice: zod_1.z.number().min(0).optional(),
});
exports.updateSeatSchema = exports.createSeatSchema.partial();
exports.generateSeatSchema = zod_1.z.object({
    roomId: zod_1.z.string().uuid(),
    rows: zod_1.z.array(zod_1.z.string()).min(1, "Rows is required"),
    seatsPerRow: zod_1.z.number().min(1).max(30),
});
exports.updateSeatTypeSchema = zod_1.z.object({
    roomId: zod_1.z.string().uuid(),
    startRow: zod_1.z.string().min(1).max(5),
    endRow: zod_1.z.string().min(1).max(5),
    seatType: zod_1.z.enum(["standard", "vip", "couple", "recliner"]),
});
//# sourceMappingURL=seat.validation.js.map