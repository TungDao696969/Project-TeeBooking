import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import {
  CreateCinemaRoomInput,
  UpdateCinemaRoomInput,
} from "../validations/activityLog.schema";

const cache_ttl = Number(process.env.CACHE_TTL);

const clearCinemaRoomCache = async () => {
  const keys = await redis.keys("cinemaRooms:*");

  if (keys.length > 0) {
    await redis.del(...keys);
  }
};

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

interface GetRoomsByCinemaParams {
  cinemaId: string;
  page: number;
  limit: number;
}

export const getRoomsByCinemaIdService = async ({
  cinemaId,
  page,
  limit,
}: GetRoomsByCinemaParams) => {
  const skip = (page - 1) * limit;

  const cacheKey = `cinemaRooms:${cinemaId}:page:${page}:limit:${limit}`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const [rooms, total] = await Promise.all([
    prisma.cinemaRoom.findMany({
      where: {
        cinemaId,
        isActive: true,
      },

      include: {
        seats: true,
        showtimes: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: limit,
    }),

    prisma.cinemaRoom.count({
      where: {
        cinemaId,
        isActive: true,
        deletedAt: null,
      },
    }),
  ]);

  const result = {
    data: rooms,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };

  await redis.set(cacheKey, JSON.stringify(result), "EX", cache_ttl);

  return result;
};

export const getAllCinemaRoomsService = async (
  page: number = 1,
  limit: number = 10,
) => {
  const skip = (page - 1) * limit;

  const [rooms, total] = await Promise.all([
    prisma.cinemaRoom.findMany({
      where: {
        deletedAt: null,
      },

      include: {
        seats: true,
        showtimes: true,
        cinema: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: limit,
    }),

    prisma.cinemaRoom.count({
      where: {
        deletedAt: null,
      },
    }),
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
  const room = await prisma.cinemaRoom.findFirst({
    where: {
      id,
      deletedAt: null,
    },

    include: {
      seats: true,
      showtimes: true,
      cinema: true,
    },
  });

  if (!room) {
    throw new Error("Cinema room not found");
  }

  return room;
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
  const room = await prisma.cinemaRoom.findUnique({
    where: { id },
  });

  if (!room) {
    throw new Error("Cinema room not found");
  }

  if (room.deletedAt) {
    throw new Error("Cinema room already deleted");
  }

  const upcomingShowtime = await prisma.showtime.findFirst({
    where: {
      roomId: id,

      startTime: {
        gte: new Date(),
      },
    },
  });

  if (upcomingShowtime) {
    throw new Error("Cannot delete room with upcoming showtimes");
  }

  const deletedRoom = await prisma.cinemaRoom.update({
    where: { id },

    data: {
      deletedAt: new Date(),
      isActive: false,
    },
  });

  await clearCinemaRoomCache();

  return deletedRoom;
};

export const getTrashCinemaRoomsService = async () => {
  const cacheKey = "cinemaRooms:trash";

  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const rooms = await prisma.cinemaRoom.findMany({
    where: {
      deletedAt: {
        not: null,
      },
    },

    include: {
      cinema: true,
    },

    orderBy: {
      deletedAt: "desc",
    },
  });

  await redis.set(cacheKey, JSON.stringify(rooms), "EX", cache_ttl);

  return rooms;
};

export const restoreCinemaRoomService = async (id: string) => {
  const room = await prisma.cinemaRoom.findUnique({
    where: { id },
  });

  if (!room) {
    throw new Error("Cinema room not found");
  }

  if (!room.deletedAt) {
    throw new Error("Cinema room is not in trash");
  }

  const restoredRoom = await prisma.cinemaRoom.update({
    where: { id },

    data: {
      deletedAt: null,
      isActive: true,
    },
  });

  await clearCinemaRoomCache();

  await redis.del("cinemaRooms:trash");

  return restoredRoom;
};
