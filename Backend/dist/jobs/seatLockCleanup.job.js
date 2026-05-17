"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSeatLockCleanupJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const prisma_1 = require("../utils/prisma");
// Run every minute to release seats whose reservation has expired
const startSeatLockCleanupJob = () => {
    node_cron_1.default.schedule("* * * * *", async () => {
        try {
            const result = await prisma_1.prisma.showtimeSeat.updateMany({
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
        }
        catch (error) {
            console.error("Seat cleanup failed:", error);
        }
    });
};
exports.startSeatLockCleanupJob = startSeatLockCleanupJob;
//# sourceMappingURL=seatLockCleanup.job.js.map