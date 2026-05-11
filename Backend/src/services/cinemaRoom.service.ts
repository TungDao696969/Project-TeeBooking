import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import {
  CreateCinemaRoomInput,
  UpdateCinemaRoomInput,
} from "../validations/activityLog.schema";

const cache_ttl = Number(process.env.CACHE_TTL);

export const createCinemaRoomService = async (data: CreateCinemaRoomInput) => {
  const cinema = await prisma.cinemaRoom.create({
    data,
  });

  await redis.del(`cinemaRooms:${data.cinemaId}`);

  return cinema;
};

export const getCinemaRoomService = async (cinemaId: string) => {
  const cacheKey = `cinemaRooms:${cinemaId}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const rooms = await prisma.cinemaRoom.findMany({
    where: { cinemaId },
    include: {
      seats: true,
      showtimes: true,
    },
  });

  await redis.set(cacheKey, JSON.stringify(rooms), "EX", cache_ttl);
  return rooms;
};

export const getCinemaRoomByIdService = async (id: string) => {
  const cinemaRooms = await prisma.cinemaRoom.findUnique({
    where: { id },
    include: {
      seats: true,
      showtimes: true,
    },
  });
  return cinemaRooms;
};

export const updateCinemaRoomService = async (
  id: string,
  data: UpdateCinemaRoomInput,
) => {
  const room = await prisma.cinemaRoom.update({
    where: { id },
    data,
  });

  await redis.del(`cinemaRooms:${room.cinemaId}`);

  return room;
};

export const deleteCinemaRoomService = async (id: string) => {
  const room = await prisma.cinemaRoom.delete({
    where: { id },
  });

  await redis.del(`cinemaRooms:${room.cinemaId}`);

  return room;
};
