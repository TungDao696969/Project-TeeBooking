import { create } from "zustand";
import { BookingStatus } from "@/types/admin/booking.type";

interface BookingState {
  page: number;
  limit: number;
  search: string;
  statusFilter: BookingStatus | "all";
  
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (search: string) => void;
  setStatusFilter: (status: BookingStatus | "all") => void;
}

export const useAdminBookingStore = create<BookingState>((set) => ({
  page: 1,
  limit: 10,
  search: "",
  statusFilter: "all",

  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setSearch: (search) => set({ search, page: 1 }), // Reset to page 1 on search
  setStatusFilter: (statusFilter) => set({ statusFilter, page: 1 }), // Reset to page 1 on filter
}));
