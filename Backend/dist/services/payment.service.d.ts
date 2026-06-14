export declare const createPaymentBooking: (bookingId: string) => Promise<{
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
export declare const generateBookingCode: () => `${string}-${string}-${string}-${string}-${string}`;
//# sourceMappingURL=payment.service.d.ts.map