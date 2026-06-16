import { BookingStatus } from "../../generated/prisma/enums";
interface GetAdminBookingsOptions {
    page?: number;
    limit?: number;
    search?: string;
    status?: BookingStatus;
}
export declare const getAdminBookingsService: ({ page, limit, search, status, }: GetAdminBookingsOptions) => Promise<{
    bookings: ({
        showtime: {
            movie: {
                id: string;
                title: string;
            };
            room: {
                id: string;
                cinema: {
                    name: string;
                    id: string;
                };
                roomName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            movieId: string;
            roomId: string;
            showDate: Date;
            startTime: Date;
            endTime: Date;
            basePrice: number;
            format: string | null;
            language: string | null;
            subtitle: string | null;
        };
        user: {
            email: string;
            id: string;
            fullName: string;
            phone: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        status: BookingStatus;
        userId: string;
        showtimeId: string;
        bookingCode: string;
        totalTicketPrice: number;
        totalComboPrice: number;
        discountAmount: number;
        finalAmount: number;
        paymentStatus: import("../../generated/prisma/enums").BookingPaymentStatus;
        bookedAt: Date;
        expiresAt: Date | null;
    })[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getAdminBookingDetailService: (id: string) => Promise<{
    showtime: {
        movie: {
            id: string;
            title: string;
            posterUrl: string | null;
        };
        room: {
            id: string;
            cinema: {
                name: string;
                address: string;
                id: string;
            };
            roomName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        movieId: string;
        roomId: string;
        showDate: Date;
        startTime: Date;
        endTime: Date;
        basePrice: number;
        format: string | null;
        language: string | null;
        subtitle: string | null;
    };
    user: {
        email: string;
        id: string;
        fullName: string;
        phone: string;
        avatarUrl: string | null;
    };
    tickets: ({
        showtimeSeat: {
            seat: {
                id: string;
                createdAt: Date;
                deletedAt: Date | null;
                isActive: boolean;
                roomId: string;
                seatRow: string;
                seatNumber: number;
                seatCode: string;
                seatType: import("../../generated/prisma/enums").SeatType;
                extraPrice: number;
            };
        } & {
            id: string;
            status: import("../../generated/prisma/enums").SeatStatus;
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
    combos: ({
        combo: {
            name: string;
            id: string;
            createdAt: Date;
            isActive: boolean;
            description: string | null;
            price: number;
            imageUrl: string | null;
            stockQuantity: number;
        };
    } & {
        id: string;
        bookingId: string;
        comboId: string;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
    })[];
    payments: {
        id: string;
        createdAt: Date;
        status: import("../../generated/prisma/enums").PaymentStatus;
        expiresAt: Date | null;
        bookingId: string;
        paymentMethod: import("../../generated/prisma/enums").PaymentMethod;
        paymentGateway: string | null;
        transactionCode: string | null;
        amount: number;
        paidAt: Date | null;
    }[];
} & {
    id: string;
    status: BookingStatus;
    userId: string;
    showtimeId: string;
    bookingCode: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    paymentStatus: import("../../generated/prisma/enums").BookingPaymentStatus;
    bookedAt: Date;
    expiresAt: Date | null;
}>;
export declare const updateAdminBookingStatusService: (id: string, newStatus: BookingStatus) => Promise<{
    id: string;
    status: BookingStatus;
    userId: string;
    showtimeId: string;
    bookingCode: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    paymentStatus: import("../../generated/prisma/enums").BookingPaymentStatus;
    bookedAt: Date;
    expiresAt: Date | null;
}>;
export declare const adminCancelBookingService: (id: string, { refund }: {
    refund: boolean;
}) => Promise<{
    success: boolean;
    message: string;
}>;
export {};
//# sourceMappingURL=booking.service.d.ts.map