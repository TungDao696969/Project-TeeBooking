import { create } from "zustand";

interface BookingState {
  selectedMovieId: string | null;
  setSelectedMovieId: (id: string) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedMovieId: null,

  setSelectedMovieId: (id) =>
    set({
      selectedMovieId: id,
    }),
}));
