"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pastBookingQuerySchema = void 0;
const zod_1 = require("zod");
exports.pastBookingQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
    search: zod_1.z.string().optional(),
});
//# sourceMappingURL=booking.past.schema.js.map