"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSeatLockCleanupJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
// Run every minute to release seats whose reservation has expired
const startSeatLockCleanupJob = () => {
    node_cron_1.default.schedule("* * * * *", async () => {
        try {
            // 1. Cancel expired pending bookings
            const expiredBookings = await prisma_1.prisma.booking.findMany({
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
                const seatIds = expiredBookings.flatMap((b) => b.tickets.map((t) => t.showtimeSeatId));
                await prisma_1.prisma.$transaction(async (tx) => {
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
                    await redis_1.redis.del(`showtime:${showtimeId}:seats`);
                }
                console.log(`Cancelled ${expiredBookings.length} expired bookings and released ${seatIds.length} seats`);
            }
            // 2. Release any orphaned reserved seats that expired
            const expiredSeats = await prisma_1.prisma.showtimeSeat.findMany({
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
                await prisma_1.prisma.showtimeSeat.updateMany({
                    where: {
                        id: { in: expiredSeatIds },
                    },
                    data: {
                        status: "available",
                        lockedUntil: null,
                    },
                });
                for (const showtimeId of orphanedShowtimeIds) {
                    await redis_1.redis.del(`showtime:${showtimeId}:seats`);
                }
                console.log(`Released ${expiredSeats.length} orphaned expired reserved seats`);
            }
        }
        catch (error) {
            console.error("Seat cleanup failed:", error);
        }
    });
};
exports.startSeatLockCleanupJob = startSeatLockCleanupJob;
//# sourceMappingURL=seatLockCleanup.job.js.map