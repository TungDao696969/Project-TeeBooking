import { prisma } from "../utils/prisma";
import {
  CreateAddressInput,
  UpdateAddressInput,
} from "../validations/address.schema";
import { redis } from "../utils/redis";

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
  await redis.del(`addresses:${userId}`);
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

export const getAddressesService = async (userId: string) => {
  const cachedAddresses = await redis.get(`addresses:${userId}`);

  if (cachedAddresses) {
    return JSON.parse(cachedAddresses);
  }

  const addresses = await prisma.userAddress.findMany({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  await redis.set(`addresses:${userId}`, JSON.stringify(addresses), "EX", 600);

  return addresses;
};

export const getAddressByIdService = async (
  userId: string,
  addressId: string,
) => {
  const address = await prisma.userAddress.findFirst({
    where: {
      id: addressId,
      userId,
    },
  });
  if (!address) {
    throw new Error("Address not found");
  }

  return address;
};

export const updateAddressService = async (
  userId: string,
  addressId: string,
  data: UpdateAddressInput,
) => {
  await getAddressByIdService(userId, addressId);

  const updatedAddress = await prisma.$transaction(async (tx) => {
    if (data.isDefault) {
      await tx.userAddress.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    return tx.userAddress.update({
      where: { id: addressId },
      data,
    });
  });

  await redis.del(`addresses:${userId}`);

  return updatedAddress;
};

export const deleteAddressService = async (
  userId: string,
  addressId: string,
) => {
  await getAddressByIdService(userId, addressId);

  await prisma.userAddress.delete({
    where: { id: addressId },
  });
  await redis.del(`addresses:${userId}`);
  return true;
};

export const setDefaultAddressService = async (
  userId: string,
  addressId: string,
) => {
  await getAddressByIdService(userId, addressId);

  await prisma.$transaction([
    prisma.userAddress.updateMany({
      where: { userId },
      data: { isDefault: false },
    }),
    prisma.userAddress.update({
      where: { id: addressId },
      data: { isDefault: true },
    }),
  ]);
  await redis.del(`addresses:${userId}`);
};
