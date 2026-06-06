"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

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
    <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
      {/* Search */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e1e1e]">
        {/* Search */}
        <div className="flex items-center gap-2.5 flex-1">
          <Search className="w-4 h-4 text-zinc-600 shrink-0" />

          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Tìm kiếm rạp, địa chỉ, tỉnh thành..."
            className="bg-transparent border-none outline-none text-sm text-zinc-300 placeholder:text-zinc-600 w-full"
          />
        </div>

        {/* Trash Button */}
        <Link href="/admin/cinema/trash">
          <Button
            size="sm"
            variant="outline"
            className="ml-4 border-red-900/50 text-red-500 hover:bg-red-950/30 hover:text-red-400"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Thùng rác
          </Button>
        </Link>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow
              key={hg.id}
              className="bg-[#161616] border-b border-[#252525] hover:bg-[#161616]"
            >
              {hg.headers.map((h) => (
                <TableHead
                  key={h.id}
                  className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold py-3"
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="border-b border-[#1a1a1a] hover:bg-[#171717] transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="py-3 text-zinc-400 text-[13px]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="relative flex items-center justify-center px-4 py-4 border-t border-[#1e1e1e]">
        {/* Left */}
        <span className="absolute left-4 text-xs text-muted-foreground">
          Hiển thị {data.length} / {pagination.total} rạp
        </span>

        {/* Center Pagination */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={pagination.page === 1}
            onClick={() => onPageChange?.(pagination.page - 1)}
          >
            Trước
          </Button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <Button
                key={pageNumber}
                size="sm"
                variant={pageNumber === pagination.page ? "default" : "outline"}
                onClick={() => onPageChange?.(pageNumber)}
                className={
                  pageNumber === pagination.page
                    ? "bg-[#E8001D] hover:bg-[#c4001a]"
                    : ""
                }
              >
                {pageNumber}
              </Button>
            ),
          )}

          <Button
            size="sm"
            variant="outline"
            disabled={pagination.page === pagination.totalPages}
            onClick={() => onPageChange?.(pagination.page + 1)}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
