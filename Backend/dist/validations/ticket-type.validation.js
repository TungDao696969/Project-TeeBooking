"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicketTypeSchema = exports.createTicketTypeSchema = void 0;
const zod_1 = require("zod");
exports.createTicketTypeSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    code: zod_1.z.string().min(2).toLowerCase(),
    description: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateTicketTypeSchema = exports.createTicketTypeSchema.partial();
//# sourceMappingURL=ticket-type.validation.js.map