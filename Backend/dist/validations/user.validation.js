"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2, "Full name is required"),
    email: zod_1.z.string().email("Invalid email"),
    phone: zod_1.z.string().min(10, "Invalid phone"),
    password: zod_1.z.string().min(6, "Password too short"),
    role: zod_1.z.enum(["customer", "admin", "staff"]).optional(),
});
//# sourceMappingURL=user.validation.js.map