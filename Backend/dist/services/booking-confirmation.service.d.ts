export declare const confirmBookingService: (bookingId: string) => Promise<{
    user: {
        fullName: string;
        email: string;
        phone: string;
        gender: import("../generated/prisma/enums").GenderType | null;
        dateOfBirth: Date | null;
        id: string;
        passwordHash: string;
        avatarUrl: string | null;
        role: import("../generated/prisma/enums").UserRole;
        verificationCode: string | null;
        resetPasswordCode: string | null;
        resetPasswordExpiresAt: Date | null;
        refreshToken: string | null;
        isVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
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
}>;
//# sourceMappingURL=booking-confirmation.service.d.ts.map