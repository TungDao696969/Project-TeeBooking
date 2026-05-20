import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
interface CreateBannerInput {
  title: string;
  imageUrl: string;
  redirectUrl?: string;
  startDate: Date;
  endDate: Date;
}
const cache_ttl = Number(process.env.CACHE_TTL);
export const createBannerService = async (data: CreateBannerInput) => {
  const banner = await prisma.banner.create({
    data,
  });

  await redis.del("banners:list");
  return banner;
};

export const getAllBannerService = async () => {
  const cacheKey = "banners:list";
  const cache = await redis.get(cacheKey);
  if (cache) {
    return JSON.parse(cache);
  }

  const banner = await prisma.banner.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  await redis.set(cacheKey, JSON.stringify(banner), "EX", cache_ttl);

  return banner;
};

export const getBannerById = async (id: string) => {
  const banner = prisma.banner.findUnique({
    where: {
      id,
    },
  });

  return banner;
};

export const updateBannerService = async (
  id: string,
  data: Partial<CreateBannerInput>,
) => {
  const banner = await prisma.banner.update({
    where: {
      id,
    },
    data,
  });

  await redis.del("banners:list");

  return banner;
};

export const deleteBannerService = async (id: string) => {
  await prisma.banner.delete({
    where: {
      id,
    },
  });

  await redis.del("banners:list");
};
