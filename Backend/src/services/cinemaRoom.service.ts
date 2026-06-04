import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import {
  CreateCinemaRoomInput,
  UpdateCinemaRoomInput,
} from "../validations/activityLog.schema";

const cache_ttl = Number(process.env.CACHE_TTL);

export const createCinemaRoomService = async (data: CreateCinemaRoomInput) => {
  const cinema = await prisma.cinema.findUnique({
    where: {
      id: data.cinemaId,
    },
  });

  if (!cinema) {
    throw new Error("Cinema not found");
  }

  const room = await prisma.cinemaRoom.create({
    data,
  });

  await redis.del(`cinemaRooms:${data.cinemaId}`);

  return room;
};

export const getCinemaRoomService = async (cinemaId: string) => {
  const cacheKey = `cinemaRooms:${cinemaId}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const rooms = await prisma.cinemaRoom.findMany({
    where: { cinemaId, isActive: true },
    include: {
      seats: true,
      showtimes: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  await redis.set(cacheKey, JSON.stringify(rooms), "EX", cache_ttl);
  return rooms;
};

export const getAllCinemaRoomsService = async (
  page: number = 1,
  limit: number = 10,
) => {
  const skip = (page - 1) * limit;

  const [rooms, total] = await Promise.all([
    prisma.cinemaRoom.findMany({
      include: {
        seats: true,
        showtimes: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      skip,
      take: limit,
    }),

    prisma.cinemaRoom.count(),
  ]);

  return {
    data: rooms,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getCinemaRoomByIdService = async (id: string) => {
  const rooms = await prisma.cinemaRoom.findUnique({
    where: { id },
    include: {
      seats: true,
      showtimes: true,
    },
  });
  return rooms;
};

export const updateCinemaRoomService = async (
  id: string,
  data: UpdateCinemaRoomInput,
) => {
  const existing = await prisma.cinemaRoom.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Cinema room not found");
  }
  const room = await prisma.cinemaRoom.update({
    where: { id },
    data,
  });

  await redis.del(`cinemaRooms:${room.cinemaId}`);

  return room;
};

export const deleteCinemaRoomService = async (id: string) => {
  const existing = await prisma.cinemaRoom.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Cinema room not found");
  }

  if (!existing.isActive) {
    throw new Error("Cinema room is already disabled");
  }

  const room = await prisma.cinemaRoom.update({
    where: { id },
    data: {
      isActive: false,
      deletedAt: new Date(),
    },
  });

  await redis.del(`cinemaRooms:${room.cinemaId}`);

  return room;
};
