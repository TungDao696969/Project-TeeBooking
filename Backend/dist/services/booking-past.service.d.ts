interface GetPastBookingsParams {
    userId: string;
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
}
export declare const getPastBookingsService: ({ userId, page, limit, status, search, }: GetPastBookingsParams) => Promise<{
    data: (({
        showtime: {
            movie: {
                id: string;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                language: string | null;
                subtitle: string | null;
                title: string;
                originalTitle: string | null;
                description: string;
                durationMinutes: number;
                releaseDate: Date;
                endDate: Date | null;
                ageRating: string | null;
                trailerUrl: string | null;
                posterUrl: string | null;
                bannerUrl: string | null;
                status: import("../generated/prisma/enums").MovieStatus;
                country: string | null;
                producer: string | null;
            };
            room: {
                cinema: {
                    name: string;
                    hotline: string | null;
                    email: string | null;
                    cityId: string;
                    province: string;
                    district: string;
                    ward: string;
                    address: string;
                    latitude: number | null;
                    longitude: number | null;
                    openingHours: string | null;
                    id: string;
                    slug: string;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                };
            } & {
                id: string;
                createdAt: Date;
                deletedAt: Date | null;
                cinemaId: string;
                roomName: string;
                roomType: string;
                totalSeats: number;
                screenType: string | null;
                soundSystem: string | null;
                isActive: boolean;
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
        invoice: {
            id: string;
            total: number;
            bookingId: string;
            invoiceNumber: string;
            subtotal: number;
            discount: number;
            pdfUrl: string | null;
            issuedAt: Date;
        } | null;
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
        payments: {
            id: string;
            createdAt: Date;
            status: import("../generated/prisma/enums").PaymentStatus;
            expiresAt: Date | null;
            bookingId: string;
            paymentMethod: import("../generated/prisma/enums").PaymentMethod;
            paymentGateway: string | null;
            transactionCode: string | null;
            amount: number;
            paidAt: Date | null;
        }[];
    } & {
        id: string;
        status: import("../generated/prisma/enums").BookingStatus;
        userId: string;
        showtimeId: string;
        bookingCode: string;
        totalTicketPrice: number;
        totalComboPrice: number;
        discountAmount: number;
        finalAmount: number;
        paymentStatus: import("../generated/prisma/enums").BookingPaymentStatus;
        bookedAt: Date;
        expiresAt: Date | null;
    }) | {
        showtime: {
            id: string;
            startTime: string;
            date: string;
            movie: {
                id: string;
                title: string;
                posterUrl: string | null;
                durationMinutes: number;
            };
            cinema: {
                id: string;
                name: string;
            };
            room: {
                id: string;
                roomName: string;
            };
        };
        invoice: {
            id: string;
            total: number;
            bookingId: string;
            invoiceNumber: string;
            subtotal: number;
            discount: number;
            pdfUrl: string | null;
            issuedAt: Date;
        } | null;
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
        payments: {
            id: string;
            createdAt: Date;
            status: import("../generated/prisma/enums").PaymentStatus;
            expiresAt: Date | null;
            bookingId: string;
            paymentMethod: import("../generated/prisma/enums").PaymentMethod;
            paymentGateway: string | null;
            transactionCode: string | null;
            amount: number;
            paidAt: Date | null;
        }[];
        id: string;
        status: import("../generated/prisma/enums").BookingStatus;
        userId: string;
        showtimeId: string;
        bookingCode: string;
        totalTicketPrice: number;
        totalComboPrice: number;
        discountAmount: number;
        finalAmount: number;
        paymentStatus: import("../generated/prisma/enums").BookingPaymentStatus;
        bookedAt: Date;
        expiresAt: Date | null;
    })[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}>;
export declare const getBookingHistoryDetail: (bookingId: string, userId: string) => Promise<({
    showtime: {
        movie: {
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            language: string | null;
            subtitle: string | null;
            title: string;
            originalTitle: string | null;
            description: string;
            durationMinutes: number;
            releaseDate: Date;
            endDate: Date | null;
            ageRating: string | null;
            trailerUrl: string | null;
            posterUrl: string | null;
            bannerUrl: string | null;
            status: import("../generated/prisma/enums").MovieStatus;
            country: string | null;
            producer: string | null;
        };
        room: {
            cinema: {
                name: string;
                hotline: string | null;
                email: string | null;
                cityId: string;
                province: string;
                district: string;
                ward: string;
                address: string;
                latitude: number | null;
                longitude: number | null;
                openingHours: string | null;
                id: string;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
            };
        } & {
            id: string;
            createdAt: Date;
            deletedAt: Date | null;
            cinemaId: string;
            roomName: string;
            roomType: string;
            totalSeats: number;
            screenType: string | null;
            soundSystem: string | null;
            isActive: boolean;
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
    invoice: {
        id: string;
        total: number;
        bookingId: string;
        invoiceNumber: string;
        subtotal: number;
        discount: number;
        pdfUrl: string | null;
        issuedAt: Date;
    } | null;
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
        status: import("../generated/prisma/enums").PaymentStatus;
        expiresAt: Date | null;
        bookingId: string;
        paymentMethod: import("../generated/prisma/enums").PaymentMethod;
        paymentGateway: string | null;
        transactionCode: string | null;
        amount: number;
        paidAt: Date | null;
    }[];
} & {
    id: string;
    status: import("../generated/prisma/enums").BookingStatus;
    userId: string;
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
export {};
//# sourceMappingURL=booking-past.service.d.ts.map