import { BookingStatus } from "../generated/prisma/enums";
import { CreateBookingInput } from "../validations/booking.schema";
export declare const createBookingService: (userId: string, payload: CreateBookingInput) => Promise<{
    id: string;
    status: BookingStatus;
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
//# sourceMappingURL=booking.service.d.ts.map