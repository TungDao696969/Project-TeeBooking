import { CreateSeatInput, UpdateSeatInput } from "../validations/seat.validation";
export declare const createSeatService: (data: CreateSeatInput) => Promise<{
    room: {
        id: string;
        createdAt: Date;
        cinemaId: string;
        roomName: string;
        roomType: string;
        totalSeats: number;
        screenType: string | null;
        soundSystem: string | null;
    };
} & {
    id: string;
    createdAt: Date;
    roomId: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: import("../generated/prisma/enums").SeatType;
    extraPrice: number;
}>;
export declare const generateSeatService: (roomId: string, rows: string[], seatsPerRow: number, seatType?: any) => Promise<any[]>;
export declare const getAllSeatsService: () => Promise<any>;
export declare const getSeatsByRoomService: (roomId: string) => Promise<any>;
export declare const getSeatByIdService: (id: string) => Promise<({
    room: {
        id: string;
        createdAt: Date;
        cinemaId: string;
        roomName: string;
        roomType: string;
        totalSeats: number;
        screenType: string | null;
        soundSystem: string | null;
    };
    showtimeSeats: {
        id: string;
        status: import("../generated/prisma/enums").SeatStatus;
        finalPrice: number;
        lockedUntil: Date | null;
        showtimeId: string;
        seatId: string;
    }[];
} & {
    id: string;
    createdAt: Date;
    roomId: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: import("../generated/prisma/enums").SeatType;
    extraPrice: number;
}) | null>;
export declare const updateSeatService: (id: string, data: UpdateSeatInput) => Promise<{
    room: {
        id: string;
        createdAt: Date;
        cinemaId: string;
        roomName: string;
        roomType: string;
        totalSeats: number;
        screenType: string | null;
        soundSystem: string | null;
    };
} & {
    id: string;
    createdAt: Date;
    roomId: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: import("../generated/prisma/enums").SeatType;
    extraPrice: number;
}>;
export declare const deleteSeatService: (id: string) => Promise<boolean>;
//# sourceMappingURL=seat.service.d.ts.map