"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingSchema = void 0;
const zod_1 = require("zod");
exports.createBookingSchema = zod_1.z.object({
    showtimeId: zod_1.z.string().uuid(),
    seatIds: zod_1.z.array(zod_1.z.string().uuid()),
    comboIds: zod_1.z
        .array(zod_1.z.object({
        comboId: zod_1.z.string().uuid(),
        quantity: zod_1.z.number().min(1),
    }))
        .optional(),
    tickets: zod_1.z
        .array(zod_1.z.object({
        ticketTypeId: zod_1.z.string().uuid(),
        quantity: zod_1.z.number().min(1),
        price: zod_1.z.number().min(0),
    }))
        .optional(),
});
//# sourceMappingURL=booking.schema.js.map