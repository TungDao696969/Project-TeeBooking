import { da } from "zod/locales";
import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import {
  CreateShowtimeInput,
  UpdateShowtimeInput,
} from "../validations/showtime.validation";

const cache_ttl = Number(process.env.CACHE_TTL);

export const createShowtimeService = async (data: CreateShowtimeInput) => {
  const movie = await prisma.movie.findUnique({
    where: { id: data.movieId },
  });
  if (!movie) {
    throw new Error("Movie not found");
  }

  const room = await prisma.cinemaRoom.findUnique({
    where: { id: data.roomId },
  });

  if (!room) {
    throw new Error("Cinema room not found");
  }

  const showTime = await prisma.showtime.create({
    data: {
      ...data,
      showDate: new Date(data.showDate),
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
    },
    include: {
      movie: true,
      room: true,
    },
  });

  await redis.del(`showtimes:${data.roomId}`);

  return showTime;
};

export const getAllShowtimesService = async () => {
  const cacheKey = "showtimes:all";

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const showtimes = await prisma.showtime.findMany({
    include: {
      movie: true,
      room: true,
      seats: true,
      bookings: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  await redis.set(cacheKey, JSON.stringify(showtimes), "EX", cache_ttl);

  return showtimes;
};

export const getShowtimeByIdService = async (id: string) => {
  return prisma.showtime.findUnique({
    where: { id },
    include: {
      movie: true,
      room: true,
      seats: true,
      bookings: true,
    },
  });
};

export const updateShowtimeService = async (
  id: string,
  data: UpdateShowtimeInput,
) => {
  const existing = await prisma.showtime.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Showtime not found");
  }

  const updated = await prisma.showtime.update({
    where: { id },
    data: {
      ...data,
      showDate: data.showDate ? new Date(data.showDate) : undefined,
      startTime: data.startTime ? new Date(data.startTime) : undefined,
      endTime: data.endTime ? new Date(data.endTime) : undefined,
    },
    include: {
      movie: true,
      room: true,
    },
  });

  await redis.del("showtimes:all");
  await redis.del(`showtimes:${existing.roomId}`);

  return updated;
};

export const deleteShowtimeService = async (id: string) => {
  const existing = await prisma.showtime.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Showtime not found");
  }

  await prisma.showtime.delete({
    where: { id },
  });

  await redis.del("showtimes:all");
  await redis.del(`showtimes:${existing.roomId}`);

  return true;
};
