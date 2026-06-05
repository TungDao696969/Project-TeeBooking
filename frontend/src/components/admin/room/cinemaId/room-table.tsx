"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Eye, Pencil, Trash2 } from "lucide-react";

import { Room, Pagination } from "@/types/admin/room.type";

interface Props {
  cinemaId: string;
  data: Room[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

const SCREEN_BADGE: Record<string, string> = {
  "2D": "bg-blue-950 text-blue-400 border border-blue-800",
  "3D": "bg-purple-950 text-purple-400 border border-purple-800",
  "4DX": "bg-orange-950 text-orange-400 border border-orange-800",
  IMAX: "bg-emerald-950 text-emerald-400 border border-emerald-800",
};

const TYPE_BADGE: Record<string, string> = {
  Standard: "bg-zinc-900 text-zinc-400 border border-zinc-700",
  Premium: "bg-yellow-950 text-yellow-500 border border-yellow-800",
  "4DX": "bg-orange-950 text-orange-400 border border-orange-800",
  IMAX: "bg-emerald-950 text-emerald-400 border border-emerald-800",
};

function ScreenBadge({ type }: { type: string }) {
  const cls =
    SCREEN_BADGE[type] ?? "bg-zinc-900 text-zinc-400 border border-zinc-700";
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[11px] font-bold tracking-wide ${cls}`}
    >
      {type}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const cls =
    TYPE_BADGE[type] ?? "bg-zinc-900 text-zinc-400 border border-zinc-700";
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[11px] font-semibold ${cls}`}
    >
      {type}
    </span>
  );
}

export function RoomTable({ cinemaId, data, pagination, onPageChange }: Props) {
  const from = (pagination.page - 1) * pagination.limit + 1;
  const to = Math.min(pagination.page * pagination.limit, pagination.total);

  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);

  const router = useRouter();
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#111115]">
      <button
        onClick={() => router.back()}
        className="
            inline-flex items-center gap-2
            rounded-md
            px-4 py-2
            text-sm font-medium text-zinc-300
            transition-colors
            hover:border-zinc-500
            hover:bg-zinc-800
            hover:text-white
          "
      >
        <ChevronLeft className="h-4 w-4" />
        Quay lại
      </button>
      {/* TABLE */}
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#0d0d0f] border-b border-zinc-800">
            {["Phòng chiếu", "Loại phòng", "Màn hình", "Âm thanh", "Ghế"].map(
              (h, i) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-500 ${
                    i === 5 ? "text-right" : "text-left"
                  }`}
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-14 text-center text-sm text-zinc-600"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl">🎬</span>
                  Không tìm thấy phòng chiếu nào
                </div>
              </td>
            </tr>
          ) : (
            data.map((room, idx) => (
              <tr
                key={room.id}
                className={`border-b border-zinc-800/60 transition-colors hover:bg-zinc-900/60 ${
                  idx % 2 === 0 ? "bg-transparent" : "bg-[#0f0f13]/40"
                }`}
              >
                {/* Room name */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-1 rounded-sm bg-[#e8192c] flex-shrink-0" />
                    <span className="font-semibold text-white">
                      {room.roomName}
                    </span>
                  </div>
                </td>

                {/* Type */}
                <td className="px-4 py-3.5">
                  <TypeBadge type={room.roomType} />
                </td>

                {/* Screen */}
                <td className="px-4 py-3.5">
                  <ScreenBadge type={room.screenType} />
                </td>

                {/* Sound */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e8192c] flex-shrink-0" />
                    <span className="text-zinc-400 text-xs">
                      {room.soundSystem}
                    </span>
                  </div>
                </td>

                {/* Seats */}
                <td className="px-4 py-3.5">
                  <span className="font-semibold text-white">
                    {room.totalSeats}
                  </span>
                  <span className="text-zinc-600 text-xs ml-1">ghế</span>
                </td>

                {/* Actions */}
                {/* <td className="px-4 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/cinemas/${cinemaId}/rooms/${room.id}`}
                      className="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 p-1.5 text-zinc-400 transition-colors hover:border-[#e8192c] hover:text-[#e8192c] hover:bg-[#e8192c]/10"
                      title="Xem chi tiết"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      className="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 p-1.5 text-zinc-400 transition-colors hover:border-[#e8192c] hover:text-[#e8192c] hover:bg-[#e8192c]/10"
                      title="Chỉnh sửa"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      className="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 p-1.5 text-zinc-400 transition-colors hover:border-red-700 hover:text-red-500 hover:bg-red-950/40"
                      title="Xóa"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex items-center justify-between border-t border-zinc-800 bg-[#0d0d0f] px-4 py-3">
        {/* Info */}
        <p className="text-xs text-zinc-600">
          Hiển thị <span className="font-semibold text-zinc-400">{from}</span>
          {" – "}
          <span className="font-semibold text-zinc-400">{to}</span>
          {" / "}
          <span className="font-semibold text-zinc-400">
            {pagination.total}
          </span>{" "}
          phòng
        </p>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          <button
            disabled={pagination.page === 1}
            onClick={() => onPageChange(pagination.page - 1)}
            className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Prev
          </button>

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-8 w-8 rounded-md border text-xs font-semibold transition-colors ${
                page === pagination.page
                  ? "border-[#e8192c] bg-[#e8192c] text-white"
                  : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={pagination.page === pagination.totalPages}
            onClick={() => onPageChange(pagination.page + 1)}
            className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
