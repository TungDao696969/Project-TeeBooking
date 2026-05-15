import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";

const CITY_CACHE_KEY = "cities:list";

const clearCityCache = async () => {
  await redis.del("cities:list");
};

export const createCityService = async (data: {
  name: string;
  slug: string;
}) => {
  const existing = await prisma.city.findUnique({
    where: {
      slug: data.slug,
    },
  });

  if (existing) {
    throw new Error("City already exists");
  }

  const city = await prisma.city.create({
    data,
  });

  await clearCityCache();

  return {
    success: true,
    message: "City created successfully",
    data: city,
  };
};

export const getCitiesService = async () => {
  const cached = await redis.get(CITY_CACHE_KEY);

  if (cached) {
    return JSON.parse(cached);
  }

  const cities = await prisma.city.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const result = {
    success: true,
    data: cities,
  };

  await redis.set(CITY_CACHE_KEY, JSON.stringify(result), "EX", 60 * 60);

  return result;
};

export const getCityByIdService = async (id: string) => {
  const city = await prisma.city.findUnique({
    where: { id },
  });

  if (!city) {
    throw new Error("City not found");
  }

  return {
    success: true,
    data: city,
  };
};

export const updateCityService = async (id: string, data: any) => {
  const existing = await prisma.city.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("City not found");
  }

  const city = await prisma.city.update({
    where: { id },
    data,
  });

  await clearCityCache();

  return {
    success: true,
    message: "City updated successfully",
    data: city,
  };
};

export const deleteCityService = async (id: string) => {
  const existing = await prisma.city.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("City not found");
  }

  await prisma.city.delete({
    where: { id },
  });

  await clearCityCache();

  return {
    success: true,
    message: "City deleted successfully",
  };
};
