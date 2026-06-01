import { create } from "zustand";

interface MovieStore {
  page: number;

  setPage: (page: number) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  page: 1,

  setPage: (page) => set({ page }),
}));
