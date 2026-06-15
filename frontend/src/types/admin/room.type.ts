export interface Seat {
  id: string;
  roomId: string;
  seatRow: string;
  seatNumber: number;
  seatCode: string;
  seatType: string;
  extraPrice: number;
  createdAt: string;
}

export interface Room {
  id: string;
  cinemaId: string;
  roomName: string;
  roomType: string;
  totalSeats: number;
  screenType: string;
  soundSystem: string;
  createdAt: string;
  seats: Seat[];
  cinema?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface RoomListResponse {
  data: Room[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateRoomPayload {
  cinemaId: string;
  roomName: string;
  roomType: string;
  totalSeats: number;
  screenType: string;
  soundSystem: string;
}

export type SeatType = "standard" | "vip" | "couple";
export interface RoomDetail {
  id: string;
  cinemaId: string;
  roomName: string;
  roomType: string;
  totalSeats: number;
  screenType: string;
  soundSystem: string;
  createdAt: string;

  cinema?: {
    id: string;
    name: string;
  };

  seats: {
    id: string;
    seatCode: string;
    seatType: SeatType;
    seatRow: string;
    seatNumber: number;
  }[];

  showtimes: {
    id: string;
    startTime: string;
  }[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RoomResponse {
  success: boolean;
  data: Room[];
  pagination: Pagination;
}

export interface UpdateCinemaRoomPayload {
  roomName: string;
  roomType: string;
  screenType: string;
  soundSystem: string;
  totalSeats: number;
}

export interface TrashCinemaRoom {
  id: string;

  roomName: string;

  totalSeats: number;

  isActive: boolean;

  deletedAt: string;

  cinema: {
    id: string;
    name: string;
  };
}
