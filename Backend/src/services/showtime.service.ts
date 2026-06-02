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

export const getAllShowtimesService = async (
  page: number = 1,
  limit: number = 10,
) => {
  const cacheKey = `showtimes:${page}:${limit}`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const skip = (page - 1) * limit;

  const [showtimes, total] = await Promise.all([
    prisma.showtime.findMany({
      skip,
      take: limit,

      include: {
        movie: true,
        room: true,
        seats: true,
        bookings: true,
      },

      orderBy: {
        startTime: "asc",
      },
    }),

    prisma.showtime.count(),
  ]);

  const result = {
    count: showtimes.length,

    data: showtimes,

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

export const getShowtimeTicketTypesService = async (showtimeId: string) => {
  const cacheKey = `showtime:${showtimeId}:ticket-types`;

  // cache
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  // find showtime
  const showtime = await prisma.showtime.findUnique({
    where: {
      id: showtimeId,
    },

    include: {
      movie: true,
      showtimeTicketTypes: {
        where: { isActive: true },
        include: { ticketType: true },
        orderBy: { createdAt: "asc" },
      },
      room: {
        include: {
          cinema: true,
        },
      },
    },
  });

  if (!showtime) {
    throw new Error("Showtime not found");
  }

  const cinemaId = showtime.room.cinema.id;

  let ticketTypes: {
    id: string;
    name: string;
    type: string;
    price: number;
    description: string;
  }[];

  if (showtime.showtimeTicketTypes.length > 0) {
    ticketTypes = showtime.showtimeTicketTypes
      .filter((item) => item.ticketType.isActive)
      .map((item) => ({
        id: item.ticketType.id,
        name: item.ticketType.name,
        type: item.ticketType.type,
        price: Number(item.price),
        description: item.ticketType.description ?? "",
      }));
  } else {
    const globalTicketTypes = await prisma.ticketType.findMany({
      where: {
        isActive: true,
        OR: [{ cinemaId: null }, { cinemaId }],
      },
      orderBy: { createdAt: "asc" },
    });

    ticketTypes = globalTicketTypes.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      price: Number(item.price),
      description: item.description ?? "",
    }));
  }

  const result = {
    showtime: {
      id: showtime.id,

      startTime: showtime.startTime,
      endTime: showtime.endTime,

      format: showtime.format,

      language: showtime.language,
      subtitle: showtime.subtitle,

      cinema: {
        id: showtime.room.cinema.id,
        name: showtime.room.cinema.name,
        address: showtime.room.cinema.address,
      },

      room: {
        id: showtime.room.id,
        name: showtime.room.roomName,
      },

      movie: {
        id: showtime.movie.id,
        title: showtime.movie.title,
        posterUrl: showtime.movie.posterUrl,
        ageRating: showtime.movie.ageRating,
      },
    },

    ticketTypes,
  };

  // cache redis
  await redis.set(cacheKey, JSON.stringify(result), "EX", cache_ttl);

  return result;
};
