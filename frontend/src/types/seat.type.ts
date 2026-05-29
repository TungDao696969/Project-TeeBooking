export type SeatStatus =
  | "available"
  | "booked"
  | "locked"
  | "reserved"
  | "maintenance";

export type SeatType = "standard" | "vip" | "couple";

export interface Seat {
  id: string;
  seatId: string;
  seatCode: string;
  seatRow: string;
  seatNumber: number;
  seatType: SeatType;
  status: SeatStatus;
  price: number;
  extraPrice: number;
  lockedUntil: string | null;
  isCouple: boolean;
}

export interface SeatRow {
  row: string;
  seats: Seat[];
}

export interface SeatResponse {
  success: boolean;
  data: {
    statistics: {
      totalSeats: number;
      availableSeats: number;
      bookedSeats: number;
      lockedSeats: number;
    };

    seatRows: SeatRow[];
  };
}
