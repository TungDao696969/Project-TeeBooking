"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentBookingService = void 0;
const prisma_1 = require("../utils/prisma");
const getCurrentBookingService = async (userId) => {
    const booking = await prisma_1.prisma.booking.findFirst({
        where: {
            userId,
            OR: [
                {
                    status: "pending",
                },
                {
                    status: "confirmed",
                },
            ],
        },
        include: {
            showtime: {
                include: {
                    movie: true,
                    room: true,
                },
            },
            tickets: {
                include: {
                    showtimeSeat: {
                        include: {
                            seat: true,
                        },
                    },
                },
            },
            combos: true,
            payments: true,
        },
        orderBy: {
            bookedAt: "desc",
        },
    });
    return booking;
};
exports.getCurrentBookingService = getCurrentBookingService;
//# sourceMappingURL=booking-current.service.js.map