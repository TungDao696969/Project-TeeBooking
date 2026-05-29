export type SeatStatus = "available" | "reserved" | "booked" | "maintenance";

export interface ShowtimeSeat {
  id: string;
  showtimeId: string;
  seatId: string;
  status: SeatStatus;
  finalPrice: number;
  lockedUntil: string | null;
}

export interface ReserveSeatResponse {
  success: boolean;
  data: ShowtimeSeat;
}
