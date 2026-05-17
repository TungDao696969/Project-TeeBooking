export declare const createMoMoPayment: (bookingId: string) => Promise<any>;
export declare const handleMoMoIPN: (body: any) => Promise<{
    message: string;
}>;
export declare const handleMoMoReturn: (query: any) => Promise<"failed" | "success">;
//# sourceMappingURL=momo.service.d.ts.map