"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { cinemaColumns } from "./cinema-columns";
import { Cinema } from "@/types/cinema.type";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Props {
  data: Cinema[];
  pagination: Pagination;

  onPageChange?: (page: number) => void;
}

export function CinemaTable({ data, pagination, onPageChange }: Props) {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns: cinemaColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Cinema Management</h1>

      <div className="rounded-3xl border border-red-900/40 bg-black overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h2
              className="text-2xl tracking-widest text-[#E8001D]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              TEE
              <span className="text-white">STAR</span>
            </h2>

            <div className="flex items-center gap-2 mt-1 text-white">
              <span className="w-[3px] h-6 bg-[#E8001D]" />
              <span>Quản lý rạp chiếu phim</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />

              <input
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Tìm kiếm rạp..."
                className="
                h-11
                w-[240px]
                rounded-md
                border
                border-zinc-600
                bg-transparent
                pl-10
                pr-4
                text-white
                placeholder:text-zinc-500
                outline-none
              "
              />
            </div>

            <Link href="/admin/cinema/trash">
              <Button
                variant="outline"
                className="
                border-zinc-500
                text-white
                bg-transparent
                hover:bg-zinc-900
              "
              >
                <Trash2 className="w-4 h-4" />
                Thùng rác
              </Button>
            </Link>

            <Button asChild className="border bg-red-600">
              <Link href="/admin/cinema/create">
                <Plus className="mr-2 h-4 w-4" />
                Thêm rạp
              </Link>
            </Button>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow
                key={hg.id}
                className="
                bg-[#350000]
                border-b
                border-red-950
                hover:bg-[#350000]
              "
              >
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="
                    text-red-300
                    text-sm
                    font-semibold
                    uppercase
                  "
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="
                border-zinc-800
                hover:bg-zinc-950
                transition-colors
              "
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="
                    py-4
                    text-white
                  "
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer */}
        <div className="relative flex items-center justify-center py-6">
          <span className="absolute left-6 text-sm text-zinc-400">
            Hiển thị {data.length} / {pagination.total} rạp
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={pagination.page === 1}
              onClick={() => onPageChange?.(pagination.page - 1)}
              className="
              border-zinc-600
              text-zinc-300
              bg-transparent
            "
            >
              <ChevronLeft className="w-4 h-4" />
              Trước
            </Button>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <Button
                  key={pageNumber}
                  onClick={() => onPageChange?.(pageNumber)}
                  className={
                    pageNumber === pagination.page
                      ? "bg-[#E8001D] hover:bg-red-700 text-white"
                      : "border border-zinc-600 bg-transparent text-zinc-300 hover:bg-zinc-900"
                  }
                >
                  {pageNumber}
                </Button>
              ),
            )}

            <Button
              variant="outline"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => onPageChange?.(pagination.page + 1)}
              className="
              border-zinc-600
              text-zinc-300
              bg-transparent
            "
            >
              Sau
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
