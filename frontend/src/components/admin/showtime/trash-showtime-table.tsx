"use client";

import dayjs from "dayjs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { TrashShowtime } from "@/types/admin/showtime.type";
import { Clock, Trash2, CalendarDays, Film } from "lucide-react";
import RestoreShowtimeButton from "./restore-showtime-button";
interface Props {
  showtimes: TrashShowtime[];
}

export default function TrashShowtimeTable({ showtimes }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-[#0d0d0d]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-[#1a0000] to-[#2d0000] border-b border-red-950">
        <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_6px_#ef4444aa] shrink-0" />
        <h2
          className="flex-1 text-white tracking-[2px] uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px" }}
        >
          Thùng Rác — Lịch Chiếu
        </h2>
        <Link
          href="/admin/showtime"
          className="inline-flex items-center gap-1.5 rounded border border-[#2a2a2a] bg-transparent px-3.5 py-[7px] text-[11px] font-semibold uppercase tracking-[0.8px] text-[#777] transition-colors hover:border-[#444] hover:bg-[#161616] hover:text-[#ccc]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Quay lại
        </Link>

        <div className="flex items-center gap-1.5 bg-red-950/50 border border-red-700/40 text-red-400 text-xs font-medium px-3 py-1.5 rounded-lg">
          <Trash2 className="w-3.5 h-3.5" />
          {showtimes.length} suất chiếu
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-[#161616] border-b border-neutral-800 hover:bg-[#161616]">
            {[
              "Poster",
              "Phim",
              "Rạp",
              "Phòng",
              "Ngày chiếu",
              "Giờ chiếu",
              "Ngày xóa",
              "Hành động",
            ].map((h) => (
              <TableHead
                key={h}
                className="text-neutral-500 text-[11px] font-semibold tracking-[1.2px] uppercase py-3"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {showtimes.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={7} className="py-16 text-center">
                <Film className="w-10 h-10 text-neutral-800 mx-auto mb-3" />
                <p className="text-neutral-600 text-sm">
                  Không có lịch chiếu nào trong thùng rác
                </p>
              </TableCell>
            </TableRow>
          ) : (
            showtimes.map((showtime) => (
              <TableRow
                key={showtime.id}
                className="border-b border-neutral-900 hover:bg-[#141414] transition-colors group"
              >
                {/* Poster */}
                <TableCell className="py-3">
                  <div className="relative w-10 h-14 rounded-lg overflow-hidden border border-neutral-800 shrink-0">
                    <img
                      src={showtime.movie.posterUrl || ""}
                      alt={showtime.movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </TableCell>

                {/* Movie title */}
                <TableCell>
                  <span
                    className="text-white tracking-wide leading-tight block max-w-[180px] truncate"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "15px",
                    }}
                  >
                    {showtime.movie.title}
                  </span>
                </TableCell>

                {/* Cinema */}
                <TableCell>
                  <span className="text-neutral-300 text-sm">
                    {showtime.room.cinema?.name}
                  </span>
                </TableCell>

                {/* Room */}
                <TableCell>
                  <span className="bg-neutral-900 border border-neutral-700 text-neutral-400 text-[11px] font-medium px-2.5 py-1 rounded-md">
                    {showtime.room.roomName}
                  </span>
                </TableCell>

                {/* Show date */}
                <TableCell>
                  <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                    <CalendarDays className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    {dayjs(showtime.showDate).format("DD/MM/YYYY")}
                  </div>
                </TableCell>

                {/* Time range */}
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Clock className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span className="text-white font-medium">
                      {dayjs(showtime.startTime).format("HH:mm")}
                    </span>
                    <span className="text-neutral-600">—</span>
                    <span className="text-neutral-400">
                      {dayjs(showtime.endTime).format("HH:mm")}
                    </span>
                  </div>
                </TableCell>

                {/* Deleted at */}
                <TableCell>
                  <div className="flex items-center gap-1.5 text-neutral-600 text-xs">
                    <Trash2 className="w-3 h-3 text-red-900 shrink-0" />
                    {dayjs(showtime.deletedAt).format("DD/MM/YYYY HH:mm")}
                  </div>
                </TableCell>

                <TableCell>
                  <RestoreShowtimeButton id={showtime.id} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
