import { PaymentMethod } from "../generated/prisma/enums";
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
export declare const handleVNPayReturn: (query: any) => Promise<"failed" | "success">;
export declare const handleVNPayIPN: (query: any) => Promise<{
    RspCode: string;
    Message: string;
}>;
//# sourceMappingURL=payment.service.d.ts.map