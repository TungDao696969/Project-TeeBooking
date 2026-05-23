import { create } from "zustand";

interface BookingState {
  selectedShowtimeId: string | null;

  setSelectedShowtime: (id: string) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedShowtimeId: null,

  setSelectedShowtime: (id) =>
    set({
      selectedShowtimeId: id,
    }),
}));
