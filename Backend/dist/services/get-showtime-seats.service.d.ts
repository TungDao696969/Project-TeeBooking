export declare const getShowtimeSeatsService: (showtimeId: string) => Promise<{
    showtime: {
        id: string;
        showDate: Date;
        startTime: Date;
        endTime: Date;
        format: string | null;
        language: string | null;
        subtitle: string | null;
        basePrice: number;
        movie: {
            id: string;
            title: string;
            posterUrl: string | null;
        };
        cinema: {
            name: string;
            province: string;
            address: string;
            id: string;
        };
        room: {
            id: string;
            name: string;
            type: string;
            totalSeats: number;
        };
    };
    statistics: {
        totalSeats: number;
        availableSeats: number;
        bookedSeats: number;
        lockedSeats: number;
    };
    seatLayout: {
        totalRows: number;
        rows: string[];
    };
    seatRows: {
        row: string;
        seats: any[];
    }[];
}>;
//# sourceMappingURL=get-showtime-seats.service.d.ts.map