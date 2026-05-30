"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFoodComboSchema = exports.createFoodComboSchema = void 0;
const zod_1 = require("zod");
exports.createFoodComboSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().positive(),
    stockQuantity: zod_1.z.number().int().min(0),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateFoodComboSchema = exports.createFoodComboSchema.partial();
//# sourceMappingURL=foodCombo.validator.js.map