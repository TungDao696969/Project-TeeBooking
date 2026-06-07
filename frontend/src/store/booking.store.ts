import { create } from "zustand";
import { Seat } from "@/types/seat.type";

import { persist } from "zustand/middleware";
interface SelectedTicket {
  ticketTypeId: string;
  quantity: number;
  price: number;
}
interface BookingState {
  selectedShowtimeId: string | null;

  setSelectedShowtime: (id: string) => void;

  tickets: SelectedTicket[];

  increaseTicket: (ticketTypeId: string, price: number) => void;

  decreaseTicket: (ticketTypeId: string) => void;

  selectedSeats: Seat[];

  toggleSeat: (seat: Seat) => void;

  upsertSeat: (seat: Seat) => void;

  clearSeats: () => void;
  resetBooking: () => void;
  totalPrice: number;

  selectedTab: "detail" | "ticket" | "payment";
  setTab: (tab: BookingState["selectedTab"]) => void;

  search: string;

  setSearch: (search: string) => void;

  status: string;

  setStatus: (status: string) => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      selectedShowtimeId: null,
      tickets: [],

      setSelectedShowtime: (id) =>
        set({
          selectedShowtimeId: id,
        }),

      increaseTicket: (ticketTypeId, price) =>
        set((state) => {
          const existing = state.tickets.find(
            (t) => t.ticketTypeId === ticketTypeId,
          );

          if (existing) {
            return {
              tickets: state.tickets.map((t) =>
                t.ticketTypeId === ticketTypeId
                  ? {
                      ...t,
                      quantity: t.quantity + 1,
                    }
                  : t,
              ),
            };
          }

          return {
            tickets: [
              ...state.tickets,
              {
                ticketTypeId,
                quantity: 1,
                price,
              },
            ],
          };
        }),

      decreaseTicket: (ticketTypeId) =>
        set((state) => ({
          tickets: state.tickets
            .map((t) =>
              t.ticketTypeId === ticketTypeId
                ? {
                    ...t,
                    quantity: Math.max(0, t.quantity - 1),
                  }
                : t,
            )
            .filter((t) => t.quantity > 0),
        })),

      selectedSeats: [],

      totalPrice: 0,

      toggleSeat: (seat) => {
        const selectedSeats = get().selectedSeats;

        const exists = selectedSeats.find((s) => s.id === seat.id);

        const updatedSeats = exists
          ? selectedSeats.filter((s) => s.id !== seat.id)
          : [...selectedSeats, seat];

        set({
          selectedSeats: updatedSeats,
          totalPrice: updatedSeats.reduce(
            (sum, s) => sum + s.price + (s.extraPrice ?? 0),
            0,
          ),
        });
      },

      upsertSeat: (seat) => {
        const selectedSeats = get().selectedSeats;

        const exists = selectedSeats.find((s) => s.id === seat.id);

        const updatedSeats = exists
          ? selectedSeats.map((s) => (s.id === seat.id ? seat : s))
          : [...selectedSeats, seat];

        set({
          selectedSeats: updatedSeats,
          totalPrice: updatedSeats.reduce(
            (sum, s) => sum + s.price + (s.extraPrice ?? 0),
            0,
          ),
        });
      },

      clearSeats: () => {
        set({
          selectedSeats: [],
          totalPrice: 0,
        });
      },

      resetBooking: () => {
        set({
          selectedShowtimeId: null,
          tickets: [],
          selectedSeats: [],
          totalPrice: 0,
        });
      },

      selectedTab: "detail",
      setTab: (tab) => set({ selectedTab: tab }),

      search: "",

      setSearch: (search) => set({ search }),

      status: "all",

      setStatus: (status) => set({ status }),
    }),
    {
      name: "booking-storage",
    },
  ),
);
