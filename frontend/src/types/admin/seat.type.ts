export interface Cinema {
  id: string;
  name: string;
}

export interface Room {
  id: string;
  roomName: string;
  cinema: Cinema;
  roomType: string;
  totalSeats: number;
  screenType: string;
  soundSystem: string;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
}

export interface ShowtimeSeat {
  id: string;
  showtimeId: string;
  seatId: string;
  status: string;
  finalPrice: number;
  lockedUntil: string | null;
}

export interface Seat {
  id: string;
  seatCode: string;
  seatRow: string;
  seatNumber: number;
  seatType: string;
  extraPrice: number;
  deletedAt: string | null;
  room: Room;

  showtimeSeats: ShowtimeSeat[];
}

export interface TrashSeatResponse {
  success: boolean;
  data: Seat[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
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

export interface SeatDetail {
  id: string;
  roomId: string;

  seatRow: string;
  seatNumber: number;
  seatCode: string;
  seatType: "standard" | "vip" | "couple";

  extraPrice: number;
  createdAt: string;

  room: Room;

  showtimeSeats: ShowtimeSeat[];
}

export interface UpdateSeatInput {
  seatCode?: string;
  seatRow?: string;
  seatNumber?: number;
  seatType?: "standard" | "vip" | "couple";
  extraPrice?: number;
}
