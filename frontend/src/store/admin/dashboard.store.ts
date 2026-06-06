import { create } from "zustand";

interface DashboardStore {
  refresh: boolean;

  toggleRefresh: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  refresh: false,

  toggleRefresh: () =>
    set((state) => ({
      refresh: !state.refresh,
    })),
}));
