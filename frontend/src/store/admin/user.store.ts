import { create } from "zustand";

interface UserState {
  page: number;
  limit: number;

  setPage: (page: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  page: 1,
  limit: 10,

  setPage: (page) => set({ page }),
}));
