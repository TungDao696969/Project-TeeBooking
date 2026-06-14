import { SeatType } from "../generated/prisma/enums";
import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import {
  CreateSeatInput,
  UpdateSeatInput,
} from "../validations/seat.validation";
import { Prisma } from "../generated/prisma/client";
const cache_ttl = Number(process.env.CACHE_TTL);
interface GenerateSeatPayload {
  roomId: string;
  rows: string[];
  seatsPerRow: number;
}

export const createSeatService = async (data: CreateSeatInput) => {
  const room = await prisma.cinemaRoom.findUnique({
    where: {
      id: data.roomId,
    },
  });

  if (!room) {
    throw new Error("Cinema room not found");
  }

  if (!room.isActive) {
    throw new Error("Cinema room is disabled");
  }

  const existingSeat = await prisma.seat.findFirst({
    where: {
      roomId: data.roomId,
      seatCode: data.seatCode,
    },
  });

  if (existingSeat) {
    throw new Error("Seat code already exists in this room");
  }

  const seat = await prisma.seat.create({
    data,
    include: {
      room: true,
    },
  });

  await redis.del(`seats:${data.roomId}`);
  await redis.del("seats:all");

  return seat;
};

// tự động tạo ghế ngồi

export const generateSeatService = async ({
  roomId,
  rows,
  seatsPerRow,
}: GenerateSeatPayload) => {
  const room = await prisma.cinemaRoom.findUnique({
    where: {
      id: roomId,
    },
  });

  if (!room) {
    throw new Error("Cinema room not found");
  }

  if (!room.isActive) {
    throw new Error("Cinema room is disabled");
  }

  const seatCount = await prisma.seat.count({
    where: {
      roomId,
    },
  });

  if (seatCount > 0) {
    throw new Error("Room already contains seats");
  }

  const seatData: Prisma.SeatCreateManyInput[] = [];

  for (const row of rows) {
    for (let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
      seatData.push({
        roomId,
        seatRow: row,
        seatNumber,
        seatCode: `${row}${seatNumber}`,
        seatType: SeatType.standard,
        extraPrice: 0,
      });
    }
  }

  await prisma.$transaction(async (tx) => {
    await tx.seat.createMany({
      data: seatData,
    });
  });

  await Promise.all([redis.del(`seats:${roomId}`), redis.del("seats:all")]);

  return seatData;
};

export const getAllSeatsService = async (
  page: number = 1,
  limit: number = 10,
) => {
  const skip = (page - 1) * limit;

  const [seats, total] = await Promise.all([
    prisma.seat.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      include: {
        room: {
          include: {
            cinema: true,
          },
        },
        showtimeSeats: true,
      },
      orderBy: [{ seatRow: "desc" }, { seatNumber: "desc" }],
      skip,
      take: limit,
    }),

    prisma.seat.count({
      where: {
        deletedAt: null,
        isActive: true,
      },
    }),
  ]);

  return {
    seats,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getSeatsByRoomService = async (roomId: string) => {
  const cacheKey = `seats:${roomId}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const seats = await prisma.seat.findMany({
    where: {
      roomId,
      deletedAt: null,

      isActive: true,
    },
    include: {
      room: true,
      showtimeSeats: true,
    },
    orderBy: [{ seatRow: "asc" }, { seatNumber: "asc" }],
  });

  await redis.set(cacheKey, JSON.stringify(seats), "EX", cache_ttl);

  return seats;
};

export const getSeatByIdService = async (id: string) => {
  return prisma.seat.findFirst({
    where: {
      id,
      deletedAt: null,
    },

    include: {
      room: true,
      showtimeSeats: true,
    },
  });
};

// UPDATE
export const updateSeatService = async (id: string, data: UpdateSeatInput) => {
  const existing = await prisma.seat.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Seat not found");
  }

  if (data.seatCode) {
    const duplicate = await prisma.seat.findFirst({
      where: {
        roomId: existing.roomId,
        seatCode: data.seatCode,
        NOT: { id },
      },
    });

    if (duplicate) {
      throw new Error("Seat code already exists");
    }
  }

  const updated = await prisma.seat.update({
    where: { id },
    data,
    include: {
      room: true,
    },
  });

  await redis.del(`seats:${existing.roomId}`);
  await redis.del("seats:all");

  return updated;
};

// DELETE
export const deleteSeatService = async (id: string) => {
  const seat = await prisma.seat.findUnique({
    where: { id },
    include: {
      showtimeSeats: true,
    },
  });

  if (!seat) {
    throw new Error("Seat not found");
  }

  if (!seat.isActive) {
    throw new Error("Seat already deleted");
  }

  if (seat.showtimeSeats.length > 0) {
    throw new Error(
      "Cannot delete seat because it is already used in showtimes/bookings",
    );
  }

  const deletedSeat = await prisma.seat.update({
    where: { id },

    data: {
      isActive: false,
      deletedAt: new Date(),
    },
  });

  await redis.del(`seats:${seat.roomId}`);
  await redis.del("seats:all");
  await redis.del("seats:trash");

  return deletedSeat;
};

export const getTrashSeatsService = async () => {
  const cacheKey = "seats:trash";

  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const seats = await prisma.seat.findMany({
    where: {
      deletedAt: {
        not: null,
      },
    },

    include: {
      room: {
        include: {
          cinema: true,
        },
      },
    },

    orderBy: {
      deletedAt: "desc",
    },
  });

  await redis.set(cacheKey, JSON.stringify(seats), "EX", 300);

  return seats;
};

export const restoreSeatService = async (id: string) => {
  const seat = await prisma.seat.findUnique({
    where: { id },
  });

  if (!seat) {
    throw new Error("Seat not found");
  }

  if (!seat.deletedAt) {
    throw new Error("Seat is not deleted");
  }

  const restoredSeat = await prisma.seat.update({
    where: { id },

    data: {
      isActive: true,
      deletedAt: null,
    },
  });

  await redis.del(`seats:${seat.roomId}`);
  await redis.del("seats:all");
  await redis.del("seats:trash");

  return restoredSeat;
};

interface UpdateSeatTypePayload {
  roomId: string;
  startRow: string;
  endRow: string;
  seatType: SeatType;
}

export const updateSeatTypeService = async ({
  roomId,
  startRow,
  endRow,
  seatType,
}: UpdateSeatTypePayload) => {
  const room = await prisma.cinemaRoom.findUnique({
    where: { id: roomId },
  });

  if (!room) {
    throw new Error("Cinema room not found");
  }

  const updated = await prisma.seat.updateMany({
    where: {
      roomId,
      seatRow: {
        gte: startRow,
        lte: endRow,
      },
    },
    data: {
      seatType,
    },
  });

  await redis.del(`seats:${roomId}`);
  await redis.del("seats:all");

  return updated;
};
