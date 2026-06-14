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
import { Clock, Trash2, ArrowLeft } from "lucide-react";
import { Seat } from "@/types/admin/seat.type";
import Link from "next/link";
import RestoreSeatDialog from "@/components/admin/seat/restore-seat-dialog";

interface Props {
  seats: Seat[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SEAT_TYPE_STYLES: Record<string, string> = {
  VIP: "bg-purple-950 border border-purple-700/40 text-purple-300",
  Couple: "bg-rose-950 border border-rose-700/40 text-rose-300",
};

export default function TrashSeatTable({
  seats,
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-[#0d0d0d] font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-[#1a0000] to-[#2d0000] border-b border-red-950">
        <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_6px_#ef4444aa] shrink-0" />
        <h2
          className="flex-1 text-white tracking-[2px] uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px" }}
        >
          Thùng Rác — Ghế Ngồi
        </h2>
        <Link
          href="/admin/seat"
          className="flex items-center gap-1.5 bg-green-500 border border-green-700/40 text-white text-sm font-medium px-3.5 py-1.5 rounded-lg hover:bg-red-900/50 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Quay lại
        </Link>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-[#161616] border-b border-neutral-800 hover:bg-[#161616]">
            {[
              "Mã ghế",
              "Hàng",
              "Số ghế",
              "Loại ghế",
              "Phòng chiếu",
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
          {seats.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={7} className="py-14 text-center">
                <Trash2 className="w-9 h-9 text-neutral-800 mx-auto mb-3" />
                <p className="text-neutral-600 text-sm">
                  Không có ghế nào trong thùng rác
                </p>
              </TableCell>
            </TableRow>
          ) : (
            seats.map((seat) => (
              <TableRow
                key={seat.id}
                className="border-b border-neutral-900 hover:bg-[#141414] transition-colors"
              >
                {/* Seat code */}
                <TableCell
                  className="text-white tracking-widest"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "16px",
                  }}
                >
                  {seat.seatCode}
                </TableCell>

                {/* Row badge */}
                <TableCell>
                  <span className="bg-red-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-md">
                    {seat.seatRow}
                  </span>
                </TableCell>

                {/* Seat number */}
                <TableCell className="text-neutral-300 text-sm">
                  {seat.seatNumber}
                </TableCell>

                {/* Type */}
                <TableCell>
                  <span
                    className={`text-[11px] px-2.5 py-1 rounded-md border font-medium ${
                      SEAT_TYPE_STYLES[seat.seatType] ??
                      "bg-neutral-900 border-neutral-700 text-neutral-400"
                    }`}
                  >
                    {seat.seatType}
                  </span>
                </TableCell>

                {/* Room */}
                <TableCell>
                  <span className="text-neutral-300 text-sm font-medium block">
                    {seat.room.roomName}
                  </span>
                </TableCell>

                {/* Deleted at */}
                <TableCell>
                  <div className="flex items-center gap-1.5 text-neutral-500 text-xs">
                    <Clock className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    {dayjs(seat.deletedAt).format("DD/MM/YYYY HH:mm")}
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <RestoreSeatDialog seatId={seat.id} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 px-4 py-3.5 border-t border-neutral-900 bg-[#0d0d0d]">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-500 text-sm transition-colors hover:border-red-700 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ‹ Trước
        </button>
        <span className="px-3.5 py-1.5 rounded-lg bg-red-600 text-white text-sm font-semibold min-w-[36px] text-center">
          {page}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-500 text-sm transition-colors hover:border-red-700 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Sau ›
        </button>
      </div>
    </div>
  );
}
