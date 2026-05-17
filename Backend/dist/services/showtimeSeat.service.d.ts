export declare const reservaSeatService: (showTimeSeatId: string) => Promise<{
    id: string;
    status: import("../generated/prisma/enums").SeatStatus;
    showtimeId: string;
    seatId: string;
    finalPrice: number;
    lockedUntil: Date | null;
}>;
export declare const releaseSeatService: (showtimeSeatId: string) => Promise<{
    id: string;
    status: import("../generated/prisma/enums").SeatStatus;
    showtimeId: string;
    seatId: string;
    finalPrice: number;
    lockedUntil: Date | null;
}>;
export declare const confirmBookingSeatService: (showtimeSeatId: string) => Promise<{
    id: string;
    status: import("../generated/prisma/enums").SeatStatus;
    showtimeId: string;
    seatId: string;
    finalPrice: number;
    lockedUntil: Date | null;
}>;
//# sourceMappingURL=showtimeSeat.service.d.ts.map