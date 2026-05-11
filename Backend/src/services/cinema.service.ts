import { id } from "zod/locales";
import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import { generateSlug } from "../utils/slug";
import {
  CreateCinemaInput,
  UpdateCinemaInput,
} from "../validations/cinema.schema";

const cache_ttl = Number(process.env.CACHE_TTL);

export const createCinemaService = async (data: CreateCinemaInput) => {
  const slug = generateSlug(data.name);

  const cinema = await prisma.cinema.create({
    data: {
      ...data,
      slug,
    },
  });

  await redis.del("cinemas:all");
  return cinema;
};

export const getCinemaService = async () => {
  const cached = await redis.get("cinemas:all");

  if (cached) {
    return JSON.parse(cached);
  }

  const cinema = await prisma.cinema.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  await redis.set("cinemas:all", JSON.stringify(cinema), "EX", cache_ttl);

  return cinema;
};

export const getCinemaByIdService = async (id: string) => {
  const cacheKey = `cinema: ${id}`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const cinema = await prisma.cinema.findUnique({
    where: { id },
    include: { rooms: true },
  });

  if (!cinema) throw new Error("Cinema not found");

  await redis.set(cacheKey, JSON.stringify(cinema), "EX", cache_ttl);

  return cinema;
};

export const updateCinemaService = async (
  id: string,
  data: UpdateCinemaInput,
) => {
  const updatedData: any = { ...data };

  if (data.name) {
    updatedData.slug = generateSlug(data.name);
  }

  const cinema = await prisma.cinema.update({
    where: { id },
    data: updatedData,
  });

  await redis.del(`cinema:${id}`);
  await redis.del("cinemas:all");

  return cinema;
};

export const deleteCinemaService = async (id: string) => {
  await prisma.cinema.delete({
    where: { id },
  });

  await redis.del(`cinema:${id}`);
  await redis.del("cinemas:all");

  return true;
};
