"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Seat } from "@/types/admin/seat.type";

export const columns: ColumnDef<Seat>[] = [
  {
    accessorKey: "seatCode",
    header: "Code",
  },
  {
    accessorKey: "seatRow",
    header: "Row",
  },
  {
    accessorKey: "seatNumber",
    header: "Number",
  },
  {
    accessorKey: "seatType",
    header: "Type",
  },
  {
    header: "Room",
    cell: ({ row }) => row.original.room.roomName,
  },
  {
    header: "Cinema",
    cell: ({ row }) => row.original.room.cinema.name,
  },
  {
    header: "Showtime Count",
    cell: ({ row }) => row.original.showtimeSeats.length,
  },
];
