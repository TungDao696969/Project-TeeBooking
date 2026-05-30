"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFoodComboService = exports.updateFoodComboService = exports.createFoodComboService = exports.getFoodComboByIdService = exports.getAllFoodCombosService = void 0;
const prisma_1 = require("../utils/prisma");
const getAllFoodCombosService = async () => {
    return prisma_1.prisma.foodCombo.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getAllFoodCombosService = getAllFoodCombosService;
const getFoodComboByIdService = async (id) => {
    return prisma_1.prisma.foodCombo.findUnique({
        where: { id },
    });
};
exports.getFoodComboByIdService = getFoodComboByIdService;
const createFoodComboService = async (data) => {
    return prisma_1.prisma.foodCombo.create({
        data,
    });
};
exports.createFoodComboService = createFoodComboService;
const updateFoodComboService = async (id, data) => {
    return prisma_1.prisma.foodCombo.update({
        where: { id },
        data,
    });
};
exports.updateFoodComboService = updateFoodComboService;
const deleteFoodComboService = async (id) => {
    return prisma_1.prisma.foodCombo.delete({
        where: { id },
    });
};
exports.deleteFoodComboService = deleteFoodComboService;
//# sourceMappingURL=foodCombo.service.js.map