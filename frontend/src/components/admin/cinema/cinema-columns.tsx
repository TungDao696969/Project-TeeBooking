"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Cinema } from "@/types/cinema.type";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MapPin, Clock, Eye } from "lucide-react";
import Link from "next/link";
import { DeleteCinemaDialog } from "./delete-cinema-dialog";
export const cinemaColumns: ColumnDef<Cinema>[] = [
  {
    accessorKey: "name",
    header: "Rạp",
    cell: ({ getValue }) => (
      <span className="text-white font-medium text-[13px]">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "hotline",
    header: "Hotline",
    cell: ({ getValue }) => (
      <span className="font-mono text-[12px] text-zinc-500 tracking-wide">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "province",
    header: "Tỉnh/TP",
    cell: ({ getValue }) => (
      <span className="inline-flex items-center gap-1 bg-[#1e1e1e] border border-[#2a2a2a] px-2.5 py-0.5 rounded-full text-[11px] text-zinc-400">
        <MapPin className="w-3 h-3" />
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "district",
    header: "Quận/Huyện",
    cell: ({ getValue }) => (
      <span className="text-zinc-500 text-[12px]">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
    cell: ({ getValue }) => (
      <span className="text-zinc-600 text-[12px] truncate block max-w-[200px]">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "openingHours",
    header: "Giờ mở cửa",
    cell: ({ getValue }) => (
      <span className="inline-flex items-center gap-1.5 text-[12px] text-zinc-500">
        <Clock className="w-3.5 h-3.5 text-[#E31E24]" />
        {getValue<string>()}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => {
      const cinema = row.original;

      return (
        <div className="flex gap-1.5">
          {/* View */}
          <Link href={`/admin/cinema/${cinema.id}`}>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 bg-[#1e1e1e] hover:bg-[#1b2230] hover:text-blue-400 text-zinc-600"
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Link href={`/admin/cinema/${cinema.id}/edit`}>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 bg-[#1e1e1e] hover:bg-[#2a2a2a] hover:text-[#E31E24] text-zinc-600"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          </Link>

          <DeleteCinemaDialog cinemaId={cinema.id} cinemaName={cinema.name} />
        </div>
      );
    },
  },
];
