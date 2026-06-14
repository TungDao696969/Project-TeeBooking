export declare const confirmBookingService: (bookingId: string) => Promise<{
    user: {
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        fullName: string;
        phone: string;
        gender: import("../generated/prisma/enums").GenderType | null;
        dateOfBirth: Date | null;
        passwordHash: string;
        avatarUrl: string | null;
        role: import("../generated/prisma/enums").UserRole;
        verificationCode: string | null;
        resetPasswordCode: string | null;
        resetPasswordExpiresAt: Date | null;
        refreshToken: string | null;
        isVerified: boolean;
    };
    tickets: {
        id: string;
        bookingId: string;
        showtimeSeatId: string;
        ticketPrice: number;
        qrCode: string | null;
        checkinStatus: boolean;
        checkedInAt: Date | null;
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
}>;
//# sourceMappingURL=booking-confirmation.service.d.ts.map