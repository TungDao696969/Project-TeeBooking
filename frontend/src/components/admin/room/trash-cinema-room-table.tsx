"use client";

import dayjs from "dayjs";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  Tv2,
  Building2,
  ArmchairIcon,
  CalendarX,
  RotateCcw,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import RestoreCinemaRoomDialog from "./restore-cinema-room-dialog";

import { TrashCinemaRoom } from "@/types/admin/room.type";

interface Props {
  rooms: TrashCinemaRoom[];
}

export default function TrashCinemaRoomTable({ rooms }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#1f1f1f] bg-[#0d0d0d]">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-3 border-b border-[#1f1f1f] px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Trash2 className="h-[18px] w-[18px] text-[#c8102e]" />
          <div>
            <h2 className="font-['Bebas_Neue',sans-serif] text-xl tracking-[2px] text-[#f0f0f0]">
              Thùng Rác Phòng Chiếu
            </h2>
            <p className="text-[11px] tracking-[0.3px] text-[#444]">
              Các phòng chiếu đã bị xóa
            </p>
          </div>
          <span className="rounded border border-[rgba(200,16,46,0.25)] bg-[rgba(200,16,46,0.12)] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#c8102e]">
            {rooms.length} phòng
          </span>
        </div>

        <Link
          href="/admin/room"
          className="inline-flex items-center gap-1.5 rounded border border-[#2a2a2a] bg-transparent px-3.5 py-[7px] text-[11px] font-semibold uppercase tracking-[0.8px] text-[#777] transition-colors hover:border-[#444] hover:bg-[#161616] hover:text-[#ccc]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Quay lại
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#1f1f1f] hover:bg-transparent">
            {["Phòng chiếu", "Rạp", "Số ghế", "Ngày xóa", "Hành động"].map(
              (h, i) => (
                <TableHead
                  key={i}
                  className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#444]"
                >
                  {h}
                </TableHead>
              ),
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rooms.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={5}
                className="py-14 text-center text-[13px] tracking-wide text-[#333]"
              >
                Không có phòng chiếu nào trong thùng rác
              </TableCell>
            </TableRow>
          ) : (
            rooms.map((room) => (
              <TableRow
                key={room.id}
                className="border-b border-[#161616] transition-colors hover:bg-[#161616]"
              >
                {/* Room name */}
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded border border-[#2a2a2a] bg-[#1a1a1a]">
                      <Tv2 className="h-3.5 w-3.5 text-[#555]" />
                    </div>
                    <span className="text-[13.5px] font-semibold text-[#f0f0f0]">
                      {room.roomName}
                    </span>
                  </div>
                </TableCell>

                {/* Cinema */}
                <TableCell className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-[13px] text-[#aaa]">
                    <Building2 className="h-3.5 w-3.5 text-[#444]" />
                    {room.cinema.name}
                  </span>
                </TableCell>

                {/* Seats */}
                <TableCell className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 rounded border border-[#222] bg-[#161616] px-2.5 py-[3px] text-[12px] text-[#666]">
                    <ArmchairIcon className="h-3 w-3" />
                    {room.totalSeats} ghế
                  </span>
                </TableCell>

                {/* Deleted At */}
                <TableCell className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-[12px] text-[#555]">
                    <CalendarX className="h-3 w-3" />
                    {dayjs(room.deletedAt).format("DD/MM/YYYY HH:mm")}
                  </span>
                </TableCell>

                {/* Action */}
                <TableCell className="px-4 py-3">
                  {/* <RestoreRoomDialog roomId={room.id} /> */}
                  <button className="inline-flex cursor-pointer items-center gap-1.5 rounded  bg-transparent px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.8px] text-[#777] transition-colors hover:border-[rgba(200,16,46,0.4)] hover:bg-[rgba(200,16,46,0.06)] hover:text-[#c8102e]">
                    <RestoreCinemaRoomDialog roomId={room.id} />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
