"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSeatsByShowtime } from "@/services/seat.api";
import { io, Socket } from "socket.io-client";

// Get base URL for Socket by stripping /api from the REST API URL
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001';

export const useSeats = (showtimeId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!showtimeId) return;

    const socket: Socket = io(NEXT_PUBLIC_API_URL, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      socket.emit("joinShowtime", showtimeId);
    });

    socket.on("seatUpdate", (updatedSeat) => {
      queryClient.setQueryData(["showtime-seats", showtimeId], (oldData: any) => {
        if (!oldData || !oldData.data || !oldData.data.seatRows) return oldData;

        // Immutably update the cache
        const newData = { ...oldData };
        newData.data = { ...oldData.data };
        newData.data.seatRows = oldData.data.seatRows.map((row: any) => ({
          ...row,
          seats: row.seats.map((seat: any) =>
            seat.id === updatedSeat.id
              ? { ...seat, status: updatedSeat.status, lockedUntil: updatedSeat.lockedUntil }
              : seat
          ),
        }));

        return newData;
      });
    });

    return () => {
      socket.emit("leaveShowtime", showtimeId);
      socket.disconnect();
    };
  }, [showtimeId, queryClient]);

  return useQuery({
    queryKey: ["showtime-seats", showtimeId],
    queryFn: () => getSeatsByShowtime(showtimeId),
    enabled: !!showtimeId,
  });
};

