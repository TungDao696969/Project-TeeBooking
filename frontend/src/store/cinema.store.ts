import { create } from "zustand";

interface CinemaStore {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}
interface CinemaDropdownState {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const useCinemaDropdown = create<CinemaDropdownState>((set) => ({
  open: false,
  setOpen: (value) => set({ open: value }),
}));

export const useCinemaStore = create<CinemaStore>((set) => ({
  selectedTab: "rooms",

  setSelectedTab: (tab) =>
    set({
      selectedTab: tab,
    }),
}));
