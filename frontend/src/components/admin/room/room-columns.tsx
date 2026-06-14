"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import { Eye, Pencil, Armchair } from "lucide-react";

import { Button } from "@/components/ui/button";

import DeleteRoomDialog from "./delete-room-dialog";

import { Room } from "@/types/admin/room.type";
export const columns: ColumnDef<Room>[] = [
  
  {
    accessorKey: "roomName",
    header: "ROOM",
  },

  {
    accessorKey: "roomType",
    header: "TYPE",
  },

  {
    accessorKey: "screenType",
    header: "SCREEN",
  },

  {
    accessorKey: "soundSystem",
    header: "SOUND",
  },

  {
    accessorKey: "totalSeats",
    header: "TOTAL SEATS",
  },

  {
    id: "seatCount",

    header: "CREATED SEATS",

    cell: ({ row }) => row.original.seats.length,
  },

  {
    accessorKey: "createdAt",

    header: "CREATED",

    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("vi-VN"),
  },

  

  {
    id: "actions",

    header: "ACTION",
    
    cell: ({ row }) => (
      <div className="flex flex-wrap items-center gap-2">
        {/* Generate Seats */}
        <Link href={`/admin/room/${row.original.id}/generate-seats`}>
          <Button
            size="icon"
            variant="outline"
            className="
            h-8 w-8
            border-cyan-500
            bg-[#111]
            text-cyan-400
            hover:bg-cyan-500
            hover:text-white
            hover:border-cyan-500
          "
            title="Generate Seats"
          >
            <Armchair className="h-4 w-4" />
          </Button>
        </Link>

        {/* View */}
        <Link href={`/admin/room/${row.original.id}`}>
          <Button
            size="sm"
            variant="outline"
            className="
            border-[#2a2a2a]
            text-[#f5f5f5]
            hover:border-[#e50000]
            hover:text-white
          "
          >
            <Eye className="h-4 w-4" />
          </Button>
        </Link>

        {/* Edit */}
        <Link href={`/admin/room/${row.original.id}/edit`}>
          <Button
            size="icon"
            variant="outline"
            className="
            h-8 w-8
            border-[#2a2a2a]
            bg-[#111]
            text-[#f5c518]
            hover:bg-[#1a1a1a]
            hover:text-white
            hover:border-[#f5c518]
          "
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>

        <DeleteRoomDialog roomId={row.original.id} />
      </div>
    ),
  },
];
