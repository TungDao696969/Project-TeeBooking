import { prisma } from "../utils/prisma";

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

  return prisma.showtimeSeat.update({
    where: {
      id: showTimeSeatId,
    },

    data: {
      status: "reserved",
      lockedUntil,
    },
  });
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

  return prisma.showtimeSeat.update({
    where: {
      id: showtimeSeatId,
    },
    data: {
      status: "available",
      lockedUntil: null,
    },
  });
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

  return prisma.showtimeSeat.update({
    where: {
      id: showtimeSeatId,
    },
    data: {
      status: "booked",
      lockedUntil: null,
    },
  });
};
