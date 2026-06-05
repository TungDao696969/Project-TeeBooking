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

// export interface Room {
//   id: string;
//   roomName: string;
//   roomType: string;
//   totalSeats: number;
//   screenType?: string | null;
//   soundSystem?: string | null;
//   capacity: number;

//   seats: unknown[];
//   showtimes: unknown[];
//   cinema: {
//     id: string;
//     name: string;
//   };
//   createdAt: string;
// }

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
