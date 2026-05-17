export declare const getCurrentBookingService: (userId: string) => Promise<({
    showtime: {
        movie: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums").MovieStatus;
            title: string;
            slug: string;
            originalTitle: string | null;
            description: string;
            durationMinutes: number;
            releaseDate: Date;
            endDate: Date | null;
            ageRating: string | null;
            language: string | null;
            subtitle: string | null;
            trailerUrl: string | null;
            posterUrl: string | null;
            bannerUrl: string | null;
            country: string | null;
            producer: string | null;
        };
        room: {
            id: string;
            createdAt: Date;
            cinemaId: string;
            roomName: string;
            roomType: string;
            totalSeats: number;
            screenType: string | null;
            soundSystem: string | null;
        };
    } & {
        format: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        language: string | null;
        subtitle: string | null;
        movieId: string;
        roomId: string;
        showDate: Date;
        startTime: Date;
        endTime: Date;
        basePrice: number;
    };
    tickets: ({
        showtimeSeat: {
            seat: {
                id: string;
                createdAt: Date;
                roomId: string;
                seatRow: string;
                seatNumber: number;
                seatCode: string;
                seatType: import("../generated/prisma/enums").SeatType;
                extraPrice: number;
            };
        } & {
            id: string;
            status: import("../generated/prisma/enums").SeatStatus;
            showtimeId: string;
            seatId: string;
            finalPrice: number;
            lockedUntil: Date | null;
        };
    } & {
        id: string;
        bookingId: string;
        showtimeSeatId: string;
        ticketPrice: number;
        qrCode: string | null;
        checkinStatus: boolean;
        checkedInAt: Date | null;
    })[];
    combos: {
        id: string;
        bookingId: string;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
        comboId: string;
    }[];
    payments: {
        id: string;
        createdAt: Date;
        status: import("../generated/prisma/enums").PaymentStatus;
        bookingId: string;
        expiresAt: Date | null;
        paymentMethod: import("../generated/prisma/enums").PaymentMethod;
        paymentGateway: string | null;
        transactionCode: string | null;
        amount: number;
        paidAt: Date | null;
    }[];
} & {
    userId: string;
    id: string;
    status: import("../generated/prisma/enums").BookingStatus;
    showtimeId: string;
    bookingCode: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    paymentStatus: import("../generated/prisma/enums").BookingPaymentStatus;
    bookedAt: Date;
    expiresAt: Date | null;
}) | null>;
//# sourceMappingURL=booking-current.service.d.ts.map