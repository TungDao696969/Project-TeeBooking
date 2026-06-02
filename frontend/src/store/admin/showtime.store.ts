import { create } from "zustand";

interface ShowtimeStore {
  page: number;
  limit: number;

  setPage: (page: number) => void;
}

export const useShowtimeStore = create<ShowtimeStore>((set) => ({
  page: 1,
  limit: 10,

  setPage: (page) =>
    set({
      page,
    }),
}));
