import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";

interface CreatePromotionInput {
  title: string;

  description?: string;

  imageUrl?: string;

  type: "percentage" | "fixed_amount" | "combo";

  discountValue: number;

  minOrderValue?: number;

  maxDiscount?: number;

  startDate: Date;

  endDate: Date;

  isActive?: boolean;
}

const CACHE_PREFIX = "promotions";

const CACHE_TTL = Number(process.env.CACHE_TTL || 60);

export const createPromotionService = async (data: CreatePromotionInput) => {
  const promotion = await prisma.promotion.create({
    data,
  });

  await clearPromotionCache();

  return promotion;
};

export const getAllPromotionService = async (page = 1, limit = 10) => {
  const cacheKey = `${CACHE_PREFIX}:${page}:${limit}`;

  const cache = await redis.get(cacheKey);

  if (cache) {
    return JSON.parse(cache);
  }

  const skip = (page - 1) * limit;

  const [promotions, total] = await Promise.all([
    prisma.promotion.findMany({
      skip,

      take: limit,

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.promotion.count(),
  ]);

  const result = {
    data: promotions,

    meta: {
      page,

      limit,

      total,

      totalPages: Math.ceil(total / limit),
    },
  };

  await redis.set(cacheKey, JSON.stringify(result), "EX", CACHE_TTL);

  return result;
};

export const getPromotionByIdService = async (id: string) => {
  return prisma.promotion.findUnique({
    where: {
      id,
    },
  });
};

export const updatePromotionService = async (
  id: string,
  data: Partial<CreatePromotionInput>,
) => {
  const promotion = await prisma.promotion.update({
    where: {
      id,
    },

    data,
  });

  await clearPromotionCache();

  return promotion;
};

export const deletePromotionService = async (id: string) => {
  await prisma.promotion.delete({
    where: {
      id,
    },
  });

  await clearPromotionCache();
};

export const getActivePromotionService = async () => {
  return prisma.promotion.findMany({
    where: {
      isActive: true,

      startDate: {
        lte: new Date(),
      },

      endDate: {
        gte: new Date(),
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

async function clearPromotionCache() {
  const keys = await redis.keys(`${CACHE_PREFIX}*`);

  if (keys.length > 0) {
    await redis.del(keys);
  }
}
