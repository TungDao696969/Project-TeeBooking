import { create } from "zustand";

interface ShowtimeStore {
  movieId: string;
  roomId: string;

  setMovieId: (id: string) => void;
  setRoomId: (id: string) => void;
}

export const useShowtimeStore = create<ShowtimeStore>((set) => ({
  movieId: "",
  roomId: "",

  setMovieId: (movieId) => set({ movieId }),

  setRoomId: (roomId) => set({ roomId }),
}));
