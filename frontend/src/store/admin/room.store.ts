import { create } from "zustand";

interface RoomStore {
  page: number;
  keyword: string;

  setPage: (page: number) => void;
  setKeyword: (keyword: string) => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  page: 1,
  keyword: "",

  setPage: (page) =>
    set({
      page,
    }),

  setKeyword: (keyword) =>
    set({
      keyword,
    }),
}));
