import { create } from "zustand";

interface SeatStore {
  keyword: string;

  setKeyword: (keyword: string) => void;
  page: number;

  setPage: (page: number) => void;
}

export const useSeatStore = create<SeatStore>((set) => ({
  keyword: "",
  page: 1,

  setPage: (page) => set({ page }),
  setKeyword: (keyword) =>
    set({
      keyword,
    }),
}));
