"use client";

import { useEffect, useRef } from "react";

import { releaseSeat } from "@/services/showtime-seat.api";

import { useBookingStore } from "@/store/booking.store";

export default function BookingSeatCleanup() {
  const { selectedSeats, resetBooking } = useBookingStore();

  const seatsRef = useRef(selectedSeats);

  useEffect(() => {
    seatsRef.current = selectedSeats;
  }, [selectedSeats]);

  useEffect(() => {
    return () => {
      const nextPath = window.location.pathname;
      const isNavigatingToPayment = nextPath.includes("/payment");

      if (isNavigatingToPayment) {
        return;
      }

      const seats = seatsRef.current;

      if (seats.length) {
        void Promise.allSettled(seats.map((seat) => releaseSeat(seat.id)));
      }

      resetBooking();

    };
  }, [resetBooking]);

  return null;
}
