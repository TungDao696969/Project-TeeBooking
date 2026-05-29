import { prisma } from "../utils/prisma";

export const getAllFoodCombosService = async () => {
  return prisma.foodCombo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getFoodComboByIdService = async (id: string) => {
  return prisma.foodCombo.findUnique({
    where: { id },
  });
};

export const createFoodComboService = async (data: any) => {
  return prisma.foodCombo.create({
    data,
  });
};

export const updateFoodComboService = async (id: string, data: any) => {
  return prisma.foodCombo.update({
    where: { id },
    data,
  });
};

export const deleteFoodComboService = async (id: string) => {
  return prisma.foodCombo.delete({
    where: { id },
  });
};
