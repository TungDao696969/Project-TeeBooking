import cron from "node-cron";
import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import { getIo } from "../utils/socket";

// Run every minute to release seats whose reservation has expired
export const startSeatLockCleanupJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      // 1. Cancel expired pending bookings
      const expiredBookings = await prisma.booking.findMany({
        where: {
          status: "pending",
          expiresAt: {
            lt: new Date(),
          },
        },
        include: {
          tickets: true,
        },
      });

      if (expiredBookings.length > 0) {
        const bookingIds = expiredBookings.map((b) => b.id);
        const seatIds = expiredBookings.flatMap((b) =>
          b.tickets.map((t) => t.showtimeSeatId)
        );

        await prisma.$transaction(async (tx) => {
          // Update bookings to cancelled
          await tx.booking.updateMany({
            where: {
              id: { in: bookingIds },
            },
            data: {
              status: "cancelled",
            },
          });

          // Release seats for these bookings
          if (seatIds.length > 0) {
            await tx.showtimeSeat.updateMany({
              where: {
                id: { in: seatIds },
              },
              data: {
                status: "available",
                lockedUntil: null,
              },
            });
          }
        });

        const showtimeIds = Array.from(new Set(expiredBookings.map((b) => b.showtimeId)));
        for (const showtimeId of showtimeIds) {
          await redis.del(`showtime:${showtimeId}:seats`);
        }

        try {
          const io = getIo();
          const seatUpdates = expiredBookings.flatMap((b) => 
            b.tickets.map(t => ({ id: t.showtimeSeatId, showtimeId: b.showtimeId }))
          );
          for (const update of seatUpdates) {
            io.to(`showtime:${update.showtimeId}`).emit("seatUpdate", {
              id: update.id,
              status: "available",
              lockedUntil: null
            });
          }
        } catch (err) {
          console.error("Socket error on job 1:", err);
        }

        console.log(`Cancelled ${expiredBookings.length} expired bookings and released ${seatIds.length} seats`);
      }

      // 2. Release any orphaned reserved seats that expired
      const expiredSeats = await prisma.showtimeSeat.findMany({
        where: {
          status: "reserved",
          lockedUntil: {
            lt: new Date(),
          },
        },
        select: {
          id: true,
          showtimeId: true,
        },
      });

      if (expiredSeats.length > 0) {
        const expiredSeatIds = expiredSeats.map((s) => s.id);
        const orphanedShowtimeIds = Array.from(new Set(expiredSeats.map((s) => s.showtimeId)));

        await prisma.showtimeSeat.updateMany({
          where: {
            id: { in: expiredSeatIds },
          },
          data: {
            status: "available",
            lockedUntil: null,
          },
        });

        for (const showtimeId of orphanedShowtimeIds) {
          await redis.del(`showtime:${showtimeId}:seats`);
        }

        try {
          const io = getIo();
          for (const s of expiredSeats) {
            io.to(`showtime:${s.showtimeId}`).emit("seatUpdate", {
              id: s.id,
              status: "available",
              lockedUntil: null
            });
          }
        } catch (err) {
          console.error("Socket error on job 2:", err);
        }

        console.log(`Released ${expiredSeats.length} orphaned expired reserved seats`);
      }
    } catch (error) {
      console.error("Seat cleanup failed:", error);
    }
  });
};

