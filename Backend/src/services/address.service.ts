import { prisma } from "../utils/prisma";
import { CreateAddressInput } from "../validations/address.schema";

export const createAddressService = async (
  userId: string,
  data: CreateAddressInput,
) => {
  if (data.isDefault) {
    await prisma.userAddress.updateMany({
      where: { userId },
      data: { isDefault: false },
    });
  }

  return prisma.userAddress.create({
    data: {
      userId,
      province: data.province,
      district: data.district,
      ward: data.ward,
      addressDetail: data.addressDetail,
      isDefault: data.isDefault ?? false,
    },
  });
};
