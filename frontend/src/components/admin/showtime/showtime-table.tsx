"use client";

import dayjs from "dayjs";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2, Plus, Search, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Showtime } from "@/types/admin/showtime.type";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ShowtimeTableProps {
  data: Showtime[];
  page: number;
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

export default function ShowtimeTable({
  data,
  page,
  pagination,
  onPageChange,
}: ShowtimeTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-red-900/30 bg-zinc-950 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-2">
        <div>
          <h1
            className="text-xl font-bold tracking-widest text-[#E8001D]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TEE<span className="text-foreground text-white">STAR</span>
          </h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
            <span className="inline-block w-0.5 h-4 bg-[#E8001D] rounded-full" />
            Quản lý phim
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm phim..."
              className="pl-8 h-8 text-sm w-44"
            />
          </div>
          <Link href="/admin/showtime/create">
            <Button
              size="sm"
              className="h-8 bg-[#E8001D] text-white hover:bg-[#c4001a]"
            >
              <Plus className="h-3.5 w-3.5" />
              Thêm mới
            </Button>
          </Link>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-red-900/30 bg-gradient-to-r from-red-950 to-black hover:bg-transparent">
            <TableHead className="text-red-400">Movie</TableHead>
            <TableHead className="text-red-400">Room</TableHead>
            <TableHead className="text-red-400">Date</TableHead>
            <TableHead className="text-red-400">Start</TableHead>
            <TableHead className="text-red-400">End</TableHead>
            <TableHead className="text-red-400">Price</TableHead>
            <TableHead className="text-red-400">Format</TableHead>
            <TableHead className="text-red-400">Status</TableHead>
            <TableHead className=" text-red-400">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((showtime) => (
            <TableRow
              key={showtime.id}
              className="border-zinc-800 transition-all hover:bg-red-950/20"
            >
              <TableCell>
                <div>
                  <p className="font-semibold text-white">
                    {showtime.movie?.title}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <span className="rounded-lg bg-zinc-900 px-3 py-1 text-zinc-300">
                  {showtime.room?.roomName}
                </span>
              </TableCell>

              <TableCell className="text-zinc-300">
                {dayjs(showtime.showDate).format("DD/MM/YYYY")}
              </TableCell>

              <TableCell className="font-medium text-white">
                {dayjs(showtime.startTime).format("HH:mm")}
              </TableCell>

              <TableCell className="font-medium text-white">
                {dayjs(showtime.endTime).format("HH:mm")}
              </TableCell>

              <TableCell>
                <span className="font-bold text-yellow-400">
                  {showtime.basePrice.toLocaleString()}đ
                </span>
              </TableCell>

              <TableCell>
                <span className="rounded-full border border-red-800 bg-red-950 px-3 py-1 text-xs font-medium text-red-300">
                  {showtime.format}
                </span>
              </TableCell>

              <TableCell>
                {showtime.isActive ? (
                  <span className="rounded-full border border-green-700 bg-green-950 px-3 py-1 text-xs font-medium text-green-400">
                    ● Active
                  </span>
                ) : (
                  <span className="rounded-full border border-red-700 bg-red-950 px-3 py-1 text-xs font-medium text-red-400">
                    ● Inactive
                  </span>
                )}
              </TableCell>

              <TableCell>
                <div className=" gap-2">
                  <Link href={`/admin/showtime/${showtime.id}/edit`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="
                    border-red-700
                    bg-transparent
                    text-red-400
                    hover:bg-red-950
                    hover:text-white
                  "
                    >
                      Edit
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    className="
                  bg-red-600
                  text-white
                  hover:bg-red-700
                "
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Footer */}
      <div className="flex flex-col gap-4 border-t border-zinc-800 px-4 py-4 md:flex-row md:items-center md:justify-between">
        {/* Left */}
        <span className="text-xs text-muted-foreground">
          Hiển thị {data.length} / {pagination.total} suất chiếu
        </span>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            Trước
          </Button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
            .filter(
              (p) =>
                p === 1 ||
                p === pagination.totalPages ||
                (p >= page - 1 && p <= page + 1),
            )
            .map((pageNumber, index, arr) => (
              <div key={pageNumber} className="flex items-center gap-2">
                {index > 0 && arr[index - 1] !== pageNumber - 1 && (
                  <span className="text-zinc-500">...</span>
                )}

                <Button
                  size="sm"
                  variant={pageNumber === page ? "default" : "outline"}
                  onClick={() => onPageChange(pageNumber)}
                  className={
                    pageNumber === page ? "bg-[#E8001D] hover:bg-[#c4001a]" : ""
                  }
                >
                  {pageNumber}
                </Button>
              </div>
            ))}

          <Button
            size="sm"
            variant="outline"
            disabled={page === pagination.totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
