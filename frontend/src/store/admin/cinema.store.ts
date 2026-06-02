import { create } from "zustand";

interface CinemaStore {
  selectedCinemaId: string | null;
  setSelectedCinemaId: (id: string | null) => void;
}

interface CinemaDialogStore {
  open: boolean;

  onOpen: () => void;

  onClose: () => void;
}

export const useCinemaStore = create<CinemaStore>((set) => ({
  selectedCinemaId: null,

  setSelectedCinemaId: (id) =>
    set({
      selectedCinemaId: id,
    }),
}));

export const useCinemaDialogStore = create<CinemaDialogStore>((set) => ({
  open: false,

  onOpen: () =>
    set({
      open: true,
    }),

  onClose: () =>
    set({
      open: false,
    }),
}));
