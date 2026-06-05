export interface Showtime {
  id: string;
  movieId: string;
  roomId: string;
  showDate: string;
  startTime: string;
  endTime: string;
  basePrice: number;
  format: string;
  language: string;
  subtitle: string;
  isActive: boolean;

  movie: {
    id: string;
    title: string;
    posterUrl: string;
  };

  room: {
    id: string;
    roomName: string;
  };
}

export interface ShowtimeResponse {
  success: boolean;
  count: number;
  data: Showtime[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ShowtimePayload {
  movieId: string;
  roomId: string;
  showDate: string;
  startTime: string;
  endTime: string;
  basePrice: number;
  format: string;
  language: string;
  subtitle: string;
  isActive?: boolean;
}

export interface ShowtimeSeat {
  id: string;
  seatId: string;
  seatCode: string;
  seatRow: string;
  seatNumber: number;
  seatType: string;
  status: "available" | "booked" | "locked";
  price: number;
  extraPrice: number;
  isCouple: boolean;
}

export interface SeatRow {
  row: string;
  seats: ShowtimeSeat[];
}

export interface ShowtimeSeatsResponse {
  showtime: {
    id: string;
    showDate: string;
    startTime: string;
    endTime: string;
    format: string;
    language: string;
    subtitle: string;
    basePrice: number;

    movie: {
      id: string;
      title: string;
      posterUrl: string;
    };

    cinema: {
      id: string;
      name: string;
      address: string;
      province: string;
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

  seatRows: SeatRow[];
}
