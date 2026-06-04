export interface Cinema {
  id: string;
  name: string;
}

export interface Room {
  id: string;
  roomName: string;
  cinema: Cinema;
}

export interface ShowtimeSeat {
  id: string;
  status: string;
}

export interface Seat {
  id: string;
  seatCode: string;
  seatRow: string;
  seatNumber: number;
  seatType: string;

  room: Room;

  showtimeSeats: ShowtimeSeat[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SeatResponse {
  success: boolean;
  data: Seat[];
  pagination: Pagination;
}

export interface Room {
  id: string;
  roomName: string;
  roomType: string;
  totalSeats: number;
  screenType?: string | null;
  soundSystem?: string | null;
  capacity: number;

  seats: unknown[];
  showtimes: unknown[];
  cinema: {
    id: string;
    name: string;
  };
  createdAt: string;
}
