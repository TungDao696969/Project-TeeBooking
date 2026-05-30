import { BookingPaymentStatus, BookingStatus, PaymentMethod } from "../generated/prisma/enums";
export interface PaymentBookingPayload {
    showtimeId: string;
    seats: Array<{
        seatId: string;
    }>;
    combos: Array<{
        comboId: string;
        quantity: number;
    }>;
    tickets: Array<{
        ticketTypeId: string;
        quantity: number;
    }>;
    voucherCode?: string;
}
export declare const createBookingFromPaymentPayload: (userId: string, payload: PaymentBookingPayload) => Promise<{
    userId: string;
    id: string;
    status: BookingStatus;
    showtimeId: string;
    bookingCode: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    paymentStatus: BookingPaymentStatus;
    bookedAt: Date;
    expiresAt: Date | null;
}>;
export declare const createVNPayPayment: (bookingId: string, ipAddr?: string) => Promise<{
    id: string;
    createdAt: Date;
    status: import("../generated/prisma/enums").PaymentStatus;
    bookingId: string;
    expiresAt: Date | null;
    paymentMethod: PaymentMethod;
    paymentGateway: string | null;
    transactionCode: string | null;
    amount: number;
    paidAt: Date | null;
}>;
export declare const handleVNPayReturn: (query: any) => Promise<{
    status: "success";
    bookingId: string | null;
} | {
    status: "failed";
    bookingId: string | null;
}>;
export declare const handleVNPayIPN: (query: any) => Promise<{
    RspCode: string;
    Message: string;
}>;
//# sourceMappingURL=payment.service.d.ts.map