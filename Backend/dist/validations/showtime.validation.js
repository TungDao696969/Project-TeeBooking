"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShowtimeSchema = exports.createShowtimeSchema = void 0;
const zod_1 = require("zod");
exports.createShowtimeSchema = zod_1.z.object({
    movieId: zod_1.z.string().uuid(),
    roomId: zod_1.z.string().uuid(),
    showDate: zod_1.z.string().datetime(),
    startTime: zod_1.z.string().datetime(),
    endTime: zod_1.z.string().datetime(),
    basePrice: zod_1.z.number().positive(),
    format: zod_1.z.string().optional(),
    language: zod_1.z.string().optional(),
    subtitle: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateShowtimeSchema = exports.createShowtimeSchema.partial();
//# sourceMappingURL=showtime.validation.js.map