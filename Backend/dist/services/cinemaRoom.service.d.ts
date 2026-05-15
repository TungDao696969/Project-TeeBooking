import { CreateCinemaRoomInput, UpdateCinemaRoomInput } from "../validations/activityLog.schema";
export declare const createCinemaRoomService: (data: CreateCinemaRoomInput) => Promise<{
    id: string;
    createdAt: Date;
    cinemaId: string;
    roomName: string;
    roomType: string;
    totalSeats: number;
    screenType: string | null;
    soundSystem: string | null;
}>;
export declare const getCinemaRoomService: (cinemaId: string) => Promise<any>;
export declare const getCinemaRoomByIdService: (id: string) => Promise<({
    showtimes: {
        format: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        language: string | null;
        subtitle: string | null;
        movieId: string;
        roomId: string;
        showDate: Date;
        startTime: Date;
        endTime: Date;
        basePrice: number;
    }[];
    seats: {
        id: string;
        createdAt: Date;
        roomId: string;
        seatRow: string;
        seatNumber: number;
        seatCode: string;
        seatType: import("../generated/prisma/enums").SeatType;
        extraPrice: number;
    }[];
} & {
    id: string;
    createdAt: Date;
    cinemaId: string;
    roomName: string;
    roomType: string;
    totalSeats: number;
    screenType: string | null;
    soundSystem: string | null;
}) | null>;
export declare const updateCinemaRoomService: (id: string, data: UpdateCinemaRoomInput) => Promise<{
    id: string;
    createdAt: Date;
    cinemaId: string;
    roomName: string;
    roomType: string;
    totalSeats: number;
    screenType: string | null;
    soundSystem: string | null;
}>;
export declare const deleteCinemaRoomService: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    cinemaId: string;
    roomName: string;
    roomType: string;
    totalSeats: number;
    screenType: string | null;
    soundSystem: string | null;
}>;
//# sourceMappingURL=cinemaRoom.service.d.ts.map