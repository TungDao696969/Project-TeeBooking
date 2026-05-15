"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemVoucherService = exports.deleteVoucherService = exports.updateVoucherService = exports.getVoucherByIdService = exports.getAllVouchersService = exports.createVoucherService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const createVoucherService = async (data) => {
    const existing = await prisma_1.prisma.voucher.findUnique({
        where: { code: data.code },
    });
    if (existing) {
        throw new Error("Voucher code already exists");
    }
    const voucher = await prisma_1.prisma.voucher.create({
        data,
    });
    await redis_1.redis.del("vouchers:all");
    return voucher;
};
exports.createVoucherService = createVoucherService;
const getAllVouchersService = async () => {
    const cacheTtl = Number(process.env.CACHE_TTL) || 600;
    const cacheKey = "vouchers:all";
    const cached = await redis_1.redis.get(cacheKey);
    if (cached)
        return JSON.parse(cached);
    const vouchers = await prisma_1.prisma.voucher.findMany({
        include: {
            promotion: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    await redis_1.redis.set(cacheKey, JSON.stringify(vouchers), "EX", cacheTtl);
    return vouchers;
};
exports.getAllVouchersService = getAllVouchersService;
const getVoucherByIdService = async (id) => {
    const voucher = await prisma_1.prisma.voucher.findUnique({
        where: { id },
        include: {
            promotion: true,
            users: true,
        },
    });
    if (!voucher) {
        throw new Error("Voucher not found");
    }
    return voucher;
};
exports.getVoucherByIdService = getVoucherByIdService;
const updateVoucherService = async (id, data) => {
    const voucher = await prisma_1.prisma.voucher.update({
        where: { id },
        data,
    });
    await redis_1.redis.del("vouchers:all");
    await redis_1.redis.del(`voucher:${id}`);
    return voucher;
};
exports.updateVoucherService = updateVoucherService;
const deleteVoucherService = async (id) => {
    await prisma_1.prisma.voucher.delete({
        where: { id },
    });
    await redis_1.redis.del("vouchers:all");
    await redis_1.redis.del(`voucher:${id}`);
};
exports.deleteVoucherService = deleteVoucherService;
const redeemVoucherService = async (userId, code) => {
    const voucher = await prisma_1.prisma.voucher.findUnique({
        where: { code },
    });
    if (!voucher) {
        throw new Error("Voucher not found");
    }
    if (voucher.status !== "active") {
        throw new Error("Voucher inactive");
    }
    if (voucher.usedCount >= voucher.usageLimit) {
        throw new Error("Voucher usage limit reached");
    }
    await prisma_1.prisma.$transaction([
        prisma_1.prisma.userVoucher.create({
            data: {
                userId,
                voucherId: voucher.id,
                isUsed: false,
            },
        }),
        prisma_1.prisma.voucher.update({
            where: { id: voucher.id },
            data: {
                usedCount: {
                    increment: 1,
                },
            },
        }),
    ]);
    await redis_1.redis.del("vouchers:all");
    return true;
};
exports.redeemVoucherService = redeemVoucherService;
//# sourceMappingURL=voucher.service.js.map