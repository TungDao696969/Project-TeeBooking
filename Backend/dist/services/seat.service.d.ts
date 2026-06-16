import { SeatType } from "../generated/prisma/enums";
import { CreateSeatInput, UpdateSeatInput } from "../validations/seat.validation";
import { Prisma } from "../generated/prisma/client";
interface GenerateSeatPayload {
    roomId: string;
    rows: string[];
    seatsPerRow: number;
}
export declare const createSeatService: (data: CreateSeatInput) => Promise<{
    room: {
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
    };
} & {
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    isActive: boolean;
    roomId: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: SeatType;
    extraPrice: number;
}>;
export declare const generateSeatService: ({ roomId, rows, seatsPerRow, }: GenerateSeatPayload) => Promise<Prisma.SeatCreateManyInput[]>;
export declare const getAllSeatsService: (page?: number, limit?: number) => Promise<{
    seats: ({
        room: {
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
        };
        showtimeSeats: {
            id: string;
            status: import("../generated/prisma/enums").SeatStatus;
            showtimeId: string;
            seatId: string;
            finalPrice: number;
            lockedUntil: Date | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
        isActive: boolean;
        roomId: string;
        seatRow: string;
        seatNumber: number;
        seatCode: string;
        seatType: SeatType;
        extraPrice: number;
    })[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getSeatsByRoomService: (roomId: string) => Promise<any>;
export declare const getSeatByIdService: (id: string) => Promise<({
    room: {
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
    };
    showtimeSeats: {
        id: string;
        status: import("../generated/prisma/enums").SeatStatus;
        showtimeId: string;
        seatId: string;
        finalPrice: number;
        lockedUntil: Date | null;
    }[];
} & {
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    isActive: boolean;
    roomId: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: SeatType;
    extraPrice: number;
}) | null>;
export declare const updateSeatService: (id: string, data: UpdateSeatInput) => Promise<{
    room: {
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
    };
} & {
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    isActive: boolean;
    roomId: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: SeatType;
    extraPrice: number;
}>;
export declare const deleteSeatService: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    isActive: boolean;
    roomId: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: SeatType;
    extraPrice: number;
}>;
export declare const getTrashSeatsService: () => Promise<any>;
export declare const restoreSeatService: (id: string) => Promise<{
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    isActive: boolean;
    roomId: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: SeatType;
    extraPrice: number;
}>;
interface UpdateSeatTypePayload {
    roomId: string;
    startRow: string;
    endRow: string;
    seatType: SeatType;
}
export declare const updateSeatTypeService: ({ roomId, startRow, endRow, seatType, }: UpdateSeatTypePayload) => Promise<Prisma.BatchPayload>;
export {};
//# sourceMappingURL=seat.service.d.ts.map