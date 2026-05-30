"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingDetailService = void 0;
const prisma_1 = require("../utils/prisma");
const getBookingDetailService = async (bookingId, userId) => {
    console.log("bookingId", bookingId);
    console.log("userId", userId);
    const booking = await prisma_1.prisma.booking.findFirst({
        where: {
            id: bookingId,
            userId,
        },
        include: {
            showtime: {
                include: {
                    movie: true,
                    room: {
                        include: {
                            cinema: true,
                        },
                    },
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
            combos: {
                include: {
                    combo: true,
                },
            },
            payments: true,
        },
    });
    if (!booking) {
        throw new Error("Booking not found");
    }
    return booking;
};
exports.getBookingDetailService = getBookingDetailService;
//# sourceMappingURL=booking-current.service.js.map