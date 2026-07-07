import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import { getIo } from "../utils/socket";

const LOCK_DURATION = 5 * 60 * 1000;

export const reservaSeatService = async (showTimeSeatId: string) => {
  const seat = await prisma.showtimeSeat.findUnique({
    where: {
      id: showTimeSeatId,
    },
  });

  if (!seat) {
    throw new Error("Showtime seat not found");
  }

  // ghế đã boock
  if (seat.status === "booked") {
    throw new Error("Seat already booked");
  }

  // ghế bảo trì
  if (seat.status === "maintenance") {
    throw new Error("Seat unavailable");
  }

  // ghế đang reserved và chưa hết hạn
  if (
    seat.status === "reserved" &&
    seat.lockedUntil &&
    seat.lockedUntil > new Date()
  ) {
    throw new Error("Seat is temporarily reserved");
  }

  const lockedUntil = new Date(Date.now() + LOCK_DURATION);

  const updatedSeat = await prisma.showtimeSeat.update({
    where: {
      id: showTimeSeatId,
    },

    data: {
      status: "reserved",
      lockedUntil,
    },
  });

  await redis.del(`showtime:${updatedSeat.showtimeId}:seats`);

  try {
    const io = getIo();
    io.to(`showtime:${updatedSeat.showtimeId}`).emit("seatUpdate", {
      id: updatedSeat.id,
      status: updatedSeat.status,
      lockedUntil: updatedSeat.lockedUntil,
    });
  } catch (err) {
    console.error("Socket error on reserveSeat:", err);
  }

  return updatedSeat;
};

export const releaseSeatService = async (showtimeSeatId: string) => {
  const seat = await prisma.showtimeSeat.findUnique({
    where: {
      id: showtimeSeatId,
    },
  });

  if (!seat) {
    throw new Error("Seat not found");
  }

  if (seat.status !== "reserved") {
    throw new Error("Seat is not reserved");
  }

  const updatedSeat = await prisma.showtimeSeat.update({
    where: {
      id: showtimeSeatId,
    },
    data: {
      status: "available",
      lockedUntil: null,
    },
  });

  await redis.del(`showtime:${updatedSeat.showtimeId}:seats`);

  try {
    const io = getIo();
    io.to(`showtime:${updatedSeat.showtimeId}`).emit("seatUpdate", {
      id: updatedSeat.id,
      status: updatedSeat.status,
      lockedUntil: updatedSeat.lockedUntil,
    });
  } catch (err) {
    console.error("Socket error on releaseSeat:", err);
  }

  return updatedSeat;
};

export const confirmBookingSeatService = async (showtimeSeatId: string) => {
  const seat = await prisma.showtimeSeat.findUnique({
    where: {
      id: showtimeSeatId,
    },
  });

  if (!seat) {
    throw new Error("Seat not found");
  }

  // prevent double booking
  if (seat.status === "booked") {
    throw new Error("Seat already booked");
  }

  if (
    seat.status !== "reserved" ||
    !seat.lockedUntil ||
    seat.lockedUntil < new Date()
  ) {
    throw new Error("Seat reservation expired");
  }

  const updatedSeat = await prisma.showtimeSeat.update({
    where: {
      id: showtimeSeatId,
    },
    data: {
      status: "booked",
      lockedUntil: null,
    },
  });

  await redis.del(`showtime:${updatedSeat.showtimeId}:seats`);

  try {
    const io = getIo();
    io.to(`showtime:${updatedSeat.showtimeId}`).emit("seatUpdate", {
      id: updatedSeat.id,
      status: updatedSeat.status,
      lockedUntil: updatedSeat.lockedUntil,
    });
  } catch (err) {
    console.error("Socket error on confirmBookingSeat:", err);
  }

  return updatedSeat;
};

