import { CreateCinemaRoomInput, UpdateCinemaRoomInput } from "../validations/activityLog.schema";
export declare const createCinemaRoomService: (data: CreateCinemaRoomInput) => Promise<{
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    cinemaId: string;
    roomName: string;
    roomType: string;
    totalSeats: number;
    screenType: string | null;
    soundSystem: string | null;
    isActive: boolean;
}>;
interface GetRoomsByCinemaParams {
    cinemaId: string;
    page: number;
    limit: number;
}
export declare const getRoomsByCinemaIdService: ({ cinemaId, page, limit, }: GetRoomsByCinemaParams) => Promise<any>;
export declare const getAllCinemaRoomsService: (page?: number, limit?: number) => Promise<{
    data: ({
        cinema: {
            name: string;
            hotline: string | null;
            email: string | null;
            cityId: string;
            province: string;
            district: string;
            ward: string;
            address: string;
            latitude: number | null;
            longitude: number | null;
            openingHours: string | null;
            id: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
        seats: {
            id: string;
            createdAt: Date;
            deletedAt: Date | null;
            isActive: boolean;
            roomId: string;
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
            isActive: boolean;
            movieId: string;
            roomId: string;
            showDate: Date;
            startTime: Date;
            endTime: Date;
            basePrice: number;
            format: string | null;
            language: string | null;
            subtitle: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
        cinemaId: string;
        roomName: string;
        roomType: string;
        totalSeats: number;
        screenType: string | null;
        soundSystem: string | null;
        isActive: boolean;
    })[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getCinemaRoomByIdService: (id: string) => Promise<{
    cinema: {
        name: string;
        hotline: string | null;
        email: string | null;
        cityId: string;
        province: string;
        district: string;
        ward: string;
        address: string;
        latitude: number | null;
        longitude: number | null;
        openingHours: string | null;
        id: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    };
    seats: {
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        roomId: string;
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
        isActive: boolean;
        movieId: string;
        roomId: string;
        showDate: Date;
        startTime: Date;
        endTime: Date;
        basePrice: number;
        format: string | null;
        language: string | null;
        subtitle: string | null;
    }[];
} & {
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    cinemaId: string;
    roomName: string;
    roomType: string;
    totalSeats: number;
    screenType: string | null;
    soundSystem: string | null;
    isActive: boolean;
}>;
export declare const updateCinemaRoomService: (id: string, data: UpdateCinemaRoomInput) => Promise<{
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    cinemaId: string;
    roomName: string;
    roomType: string;
    totalSeats: number;
    screenType: string | null;
    soundSystem: string | null;
    isActive: boolean;
}>;
export declare const deleteCinemaRoomService: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    cinemaId: string;
    roomName: string;
    roomType: string;
    totalSeats: number;
    screenType: string | null;
    soundSystem: string | null;
    isActive: boolean;
}>;
export declare const getTrashCinemaRoomsService: () => Promise<any>;
export declare const restoreCinemaRoomService: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    cinemaId: string;
    roomName: string;
    roomType: string;
    totalSeats: number;
    screenType: string | null;
    soundSystem: string | null;
    isActive: boolean;
}>;
export {};
//# sourceMappingURL=cinemaRoom.service.d.ts.map