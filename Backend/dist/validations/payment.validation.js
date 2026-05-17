"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMomoPaymentSchema = void 0;
const zod_1 = require("zod");
exports.createMomoPaymentSchema = zod_1.z.object({
    bookingId: zod_1.z.string().uuid(),
    amount: zod_1.z.number().positive(),
});
//# sourceMappingURL=payment.validation.js.map