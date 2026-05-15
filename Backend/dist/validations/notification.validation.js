"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotificationSchema = exports.createNotificationSchema = void 0;
const zod_1 = require("zod");
exports.createNotificationSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Title phải ít nhất 3 ký tự").max(255),
    content: zod_1.z.string().min(5, "Content phải ít nhất 5 ký tự"),
    type: zod_1.z.string().optional(),
});
exports.updateNotificationSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(255).optional(),
    content: zod_1.z.string().min(5).optional(),
    type: zod_1.z.string().optional(),
    isRead: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=notification.validation.js.map