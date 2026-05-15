"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultAddressService = exports.deleteAddressService = exports.updateAddressService = exports.getAddressByIdService = exports.getAddressesService = exports.createAddressService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const createAddressService = async (userId, data) => {
    if (data.isDefault) {
        await prisma_1.prisma.userAddress.updateMany({
            where: { userId },
            data: { isDefault: false },
        });
    }
    await redis_1.redis.del(`addresses:${userId}`);
    return prisma_1.prisma.userAddress.create({
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
exports.createAddressService = createAddressService;
const getAddressesService = async (userId) => {
    const cachedAddresses = await redis_1.redis.get(`addresses:${userId}`);
    if (cachedAddresses) {
        return JSON.parse(cachedAddresses);
    }
    const addresses = await prisma_1.prisma.userAddress.findMany({
        where: { userId },
        orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
    await redis_1.redis.set(`addresses:${userId}`, JSON.stringify(addresses), "EX", 600);
    return addresses;
};
exports.getAddressesService = getAddressesService;
const getAddressByIdService = async (userId, addressId) => {
    const address = await prisma_1.prisma.userAddress.findFirst({
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
exports.getAddressByIdService = getAddressByIdService;
const updateAddressService = async (userId, addressId, data) => {
    await (0, exports.getAddressByIdService)(userId, addressId);
    const updatedAddress = await prisma_1.prisma.$transaction(async (tx) => {
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
    await redis_1.redis.del(`addresses:${userId}`);
    return updatedAddress;
};
exports.updateAddressService = updateAddressService;
const deleteAddressService = async (userId, addressId) => {
    await (0, exports.getAddressByIdService)(userId, addressId);
    await prisma_1.prisma.userAddress.delete({
        where: { id: addressId },
    });
    await redis_1.redis.del(`addresses:${userId}`);
    return true;
};
exports.deleteAddressService = deleteAddressService;
const setDefaultAddressService = async (userId, addressId) => {
    await (0, exports.getAddressByIdService)(userId, addressId);
    await prisma_1.prisma.$transaction([
        prisma_1.prisma.userAddress.updateMany({
            where: { userId },
            data: { isDefault: false },
        }),
        prisma_1.prisma.userAddress.update({
            where: { id: addressId },
            data: { isDefault: true },
        }),
    ]);
    await redis_1.redis.del(`addresses:${userId}`);
};
exports.setDefaultAddressService = setDefaultAddressService;
//# sourceMappingURL=address.service.js.map