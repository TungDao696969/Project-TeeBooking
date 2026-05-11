import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import { VoucherStatus } from "../generated/prisma/enums";
import type {
  CreateVoucherInput,
  UpdateVoucherInput,
} from "../validations/voucher.schema";
export const createVoucherService = async (data: CreateVoucherInput) => {
  const existing = await prisma.voucher.findUnique({
    where: { code: data.code },
  });

  if (existing) {
    throw new Error("Voucher code already exists");
  }

  const voucher = await prisma.voucher.create({
    data,
  });

  await redis.del("vouchers:all");

  return voucher;
};

export const getAllVouchersService = async () => {
  const cacheTtl = Number(process.env.CACHE_TTL) || 600;
  const cacheKey = "vouchers:all";

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const vouchers = await prisma.voucher.findMany({
    include: {
      promotion: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  await redis.set(cacheKey, JSON.stringify(vouchers), "EX", cacheTtl);

  return vouchers;
};

export const getVoucherByIdService = async (id: string) => {
  const voucher = await prisma.voucher.findUnique({
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

export const updateVoucherService = async (
  id: string,
  data: UpdateVoucherInput,
) => {
  const voucher = await prisma.voucher.update({
    where: { id },
    data,
  });

  await redis.del("vouchers:all");
  await redis.del(`voucher:${id}`);

  return voucher;
};

export const deleteVoucherService = async (id: string) => {
  await prisma.voucher.delete({
    where: { id },
  });

  await redis.del("vouchers:all");
  await redis.del(`voucher:${id}`);
};

export const redeemVoucherService = async (userId: string, code: string) => {
  const voucher = await prisma.voucher.findUnique({
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

  await prisma.$transaction([
    prisma.userVoucher.create({
      data: {
        userId,
        voucherId: voucher.id,
        isUsed: false,
      },
    }),
    prisma.voucher.update({
      where: { id: voucher.id },
      data: {
        usedCount: {
          increment: 1,
        },
      },
    }),
  ]);

  await redis.del("vouchers:all");

  return true;
};
