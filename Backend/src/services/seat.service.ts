import { SeatType } from "../generated/prisma/enums";
import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import {
  CreateSeatInput,
  UpdateSeatInput,
} from "../validations/seat.validation";

const cache_ttl = Number(process.env.CACHE_TTL);

export const createSeatService = async (data: CreateSeatInput) => {
  const room = await prisma.cinemaRoom.findUnique({
    where: {
      id: data.roomId,
    },
  });

  if (!room) {
    throw new Error("Cinema room not found");
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

export const generateSeatService = async (
  roomId: string,
  rows: string[],
  seatsPerRow: number,
  seatType: SeatType = "standard",
) => {
  const room = await prisma.cinemaRoom.findUnique({
    where: { id: roomId },
  });

  if (!room) {
    throw new Error("Cinema room not found");
  }

  const seatData: any[] = [];

  for (const row of rows) {
    for (let i = 1; i <= seatsPerRow; i++) {
      seatData.push({
        roomId,
        seatRow: row,
        seatNumber: i,
        seatCode: `${row}${i}`,
        seatType,
        extraPrice: 0,
      });
    }
  }

  await prisma.seat.createMany({
    data: seatData,
    skipDuplicates: true,
  });

  await redis.del(`seats:${roomId}`);
  await redis.del("seats:all");

  return seatData;
};

export const getAllSeatsService = async () => {
  const cacheKey = "seats:all";

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const seats = await prisma.seat.findMany({
    include: {
      room: {
        include: {
          cinema: true,
        },
      },
      showtimeSeats: true,
    },
    orderBy: [{ seatRow: "asc" }, { seatNumber: "asc" }],
  });

  await redis.set(cacheKey, JSON.stringify(seats), "EX", cache_ttl);

  return seats;
};

export const getSeatsByRoomService = async (roomId: string) => {
  const cacheKey = `seats:${roomId}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const seats = await prisma.seat.findMany({
    where: { roomId },
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
  return prisma.seat.findUnique({
    where: { id },
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

  // Không cho xóa nếu ghế đã được dùng trong showtime/booking
  if (seat.showtimeSeats.length > 0) {
    throw new Error(
      "Cannot delete seat because it is already used in showtimes/bookings",
    );
  }

  await prisma.seat.delete({
    where: { id },
  });

  // clear cache
  await redis.del(`seats:${seat.roomId}`);
  await redis.del("seats:all");

  return {
    success: true,
    message: "Seat deleted successfully",
  };
};
