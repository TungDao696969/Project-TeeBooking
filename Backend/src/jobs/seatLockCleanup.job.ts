import cron from "node-cron";
import { prisma } from "../utils/prisma";

// Run every minute to release seats whose reservation has expired
export const startSeatLockCleanupJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const result = await prisma.showtimeSeat.updateMany({
        where: {
          status: "reserved",
          lockedUntil: {
            lt: new Date(),
          },
        },
        data: {
          status: "available",
          lockedUntil: null,
        },
      });

      console.log(`Released ${result.count} expired reserved seats`);
    } catch (error) {
      console.error("Seat cleanup failed:", error);
    }
  });
};
