"use client";

import { useEffect, useRef, useState } from "react";
import { releaseSeat } from "@/services/showtime-seat.api";

import { useBookingStore } from "@/store/booking.store";
interface Props {
  lockedUntil: string;
}

export default function ReserveTimer({ lockedUntil }: Props) {
  const [timeLeft, setTimeLeft] = useState("00:00");

  const { selectedSeats, clearSeats } = useBookingStore();
  const selectedSeatsRef = useRef(selectedSeats);
  const clearSeatsRef = useRef(clearSeats);

  useEffect(() => {
    selectedSeatsRef.current = selectedSeats;
  }, [selectedSeats]);

  useEffect(() => {
    clearSeatsRef.current = clearSeats;
  }, [clearSeats]);

  // useEffect(() => {
  //   return () => {
  //     const seatsToRelease = selectedSeatsRef.current;

  //     if (seatsToRelease.length) {
  //       void Promise.allSettled(
  //         seatsToRelease.map((seat) => releaseSeat(seat.id)),
  //       );
  //     }

  //     clearSeatsRef.current();
  //   };
  // }, []);

  const activeLockedUntil = selectedSeats[0]?.lockedUntil ?? lockedUntil;

  useEffect(() => {
    if (!selectedSeats.length) return;

    if (!activeLockedUntil) return;

    const calculateTime = async () => {
      const difference = new Date(activeLockedUntil).getTime() - Date.now();

      if (difference <= 0) {
        setTimeLeft("00:00");

        await Promise.allSettled(
          selectedSeatsRef.current.map((seat) => releaseSeat(seat.id)),
        );

        clearSeatsRef.current();

        return;
      }

      const minutes = Math.floor(difference / 1000 / 60);

      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0",
        )}`,
      );
    };

    calculateTime();

    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [selectedSeats.length, activeLockedUntil]);

  if (!selectedSeats.length) {
    return null;
  }

  return (
    <div className="rounded-xl bg-yellow-500 p-3 text-base text-black">
      Thời gian giữ ghế:
      <div className="text-xl font-bold">{timeLeft}</div>
    </div>
  );
}
