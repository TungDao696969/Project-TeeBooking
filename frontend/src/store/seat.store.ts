import { create } from "zustand";

import { ShowtimeSeat } from "@/types/showtime-seat";

interface SeatStore {
  selectedSeats: ShowtimeSeat[];

  addSeat: (seat: ShowtimeSeat) => void;

  removeSeat: (seatId: string) => void;

  clearSeats: () => void;

  getTotalPrice: () => number;
}

export const useSeatStore = create<SeatStore>((set, get) => ({
  selectedSeats: [],

  addSeat: (seat) => {
    const exists = get().selectedSeats.find((item) => item.id === seat.id);

    if (exists) return;

    set({
      selectedSeats: [...get().selectedSeats, seat],
    });
  },

  removeSeat: (seatId) => {
    set({
      selectedSeats: get().selectedSeats.filter((item) => item.id !== seatId),
    });
  },

  clearSeats: () => {
    set({
      selectedSeats: [],
    });
  },

  getTotalPrice: () => {
    return get().selectedSeats.reduce(
      (total, seat) => total + seat.finalPrice,
      0,
    );
  },
}));
