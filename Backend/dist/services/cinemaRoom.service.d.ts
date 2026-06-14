import { CreateCinemaRoomInput, UpdateCinemaRoomInput } from "../validations/activityLog.schema";
export declare const createCinemaRoomService: (data: CreateCinemaRoomInput) => Promise<{
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    isActive: boolean;
    cinemaId: string;
    roomName: string;
    roomType: string;
    totalSeats: number;
    screenType: string | null;
    soundSystem: string | null;
}>;
interface GetRoomsByCinemaParams {
    cinemaId: string;
    page: number;
    limit: number;
}
export declare const getRoomsByCinemaIdService: ({ cinemaId, page, limit, }: GetRoomsByCinemaParams) => Promise<any>;
export declare const getAllCinemaRoomsService: (page?: number, limit?: number) => Promise<{
    data: ({
        seats: {
            id: string;
            createdAt: Date;
            deletedAt: Date | null;
            roomId: string;
            isActive: boolean;
            seatRow: string;
            seatNumber: number;
            seatCode: string;
            seatType: import("../generated/prisma/enums").SeatType;
            extraPrice: number;
        }[];
        showtimes: {
            id: string;
            createdAt: Date;
            deletedAt: Date | null;
            movieId: string;
            roomId: string;
            showDate: Date;
            startTime: Date;
            endTime: Date;
            basePrice: number;
            format: string | null;
            language: string | null;
            subtitle: string | null;
            isActive: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        cinemaId: string;
        roomName: string;
        roomType: string;
        totalSeats: number;
        screenType: string | null;
        soundSystem: string | null;
    })[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getCinemaRoomByIdService: (id: string) => Promise<{
    seats: {
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
        roomId: string;
        isActive: boolean;
        seatRow: string;
        seatNumber: number;
        seatCode: string;
        seatType: import("../generated/prisma/enums").SeatType;
        extraPrice: number;
    }[];
    showtimes: {
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
        movieId: string;
        roomId: string;
        showDate: Date;
        startTime: Date;
        endTime: Date;
        basePrice: number;
        format: string | null;
        language: string | null;
        subtitle: string | null;
        isActive: boolean;
    }[];
} & {
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    isActive: boolean;
    cinemaId: string;
    roomName: string;
    roomType: string;
    totalSeats: number;
    screenType: string | null;
    soundSystem: string | null;
}>;
export declare const updateCinemaRoomService: (id: string, data: UpdateCinemaRoomInput) => Promise<{
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    isActive: boolean;
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
    deletedAt: Date | null;
    isActive: boolean;
    cinemaId: string;
    roomName: string;
    roomType: string;
    totalSeats: number;
    screenType: string | null;
    soundSystem: string | null;
}>;
export declare const getTrashCinemaRoomsService: () => Promise<any>;
export declare const restoreCinemaRoomService: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    isActive: boolean;
    cinemaId: string;
    roomName: string;
    roomType: string;
    totalSeats: number;
    screenType: string | null;
    soundSystem: string | null;
}>;
export {};
//# sourceMappingURL=cinemaRoom.service.d.ts.map