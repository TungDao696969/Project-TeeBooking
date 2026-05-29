import { create } from "zustand";

interface MovieStore {
  selectedTrailer: string | null;

  setSelectedTrailer: (url: string) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  selectedTrailer: null,

  setSelectedTrailer: (url) =>
    set({
      selectedTrailer: url,
    }),
}));
