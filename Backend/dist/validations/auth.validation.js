"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    fullName: zod_1.z.string().trim().min(3, "Full name must be at least 3 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    phone: zod_1.z
        .string()
        .trim()
        .min(8, "Phone must be at least 8 characters")
        .regex(/^\d+$/, "Phone must contain only numbers"),
    gender: zod_1.z.enum(["male", "female", "other"]).optional(),
    dateOfBirth: zod_1.z.coerce.date().optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(1, "Password is required"),
});
//# sourceMappingURL=auth.validation.js.map