"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";

import Link from "next/link";

import { columns } from "./room-columns";
import { Room, RoomListResponse } from "@/types/admin/room.type";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Props {
  data: Room[];
  pagination: RoomListResponse["pagination"];
  onPageChange: (page: number) => void;
}

export function RoomTable({ data, pagination, onPageChange }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#0d0d0d] shadow-[0_0_40px_rgba(0,0,0,0.6)]">
      {/* Header */}
      <div className="flex justify-between px-5 py-3 bg-gradient-to-r from-[#1a0000] to-[#0d0d0d] border-b border-[#3a1010] flex items-center gap-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#e50000]">
          <span className="w-2 h-2 rounded-full bg-[#e50000]" />
          Quản lý phòng chiếu
        </span>

        <div className="">
          <Link href="/admin/room/trash">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white mr-2"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Thùng rác
            </Button>
          </Link>
          <Link href="/admin/room/create">
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
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-[#2a2a2a] hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="
                    px-5 py-3
                    text-[11px] font-bold tracking-[0.12em] uppercase
                    text-[#f5c518]
                    bg-[#111111]
                    border-r border-[#1e1e1e] last:border-r-0
                    whitespace-nowrap
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
          {table.getRowModel().rows.length === 0 ? (
            <TableRow className="hover:bg-transparent border-0">
              <TableCell
                colSpan={columns.length}
                className="text-center py-16 text-[#555] text-sm italic"
              >
                Không có dữ liệu phòng chiếu
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                className={`
                  border-b border-[#1e1e1e] last:border-b-0
                  transition-colors duration-150
                  hover:bg-[#1a0a0a]
                  ${index % 2 === 0 ? "bg-[#0d0d0d]" : "bg-[#101010]"}
                  group
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="
                      px-5 py-3
                      text-sm text-[#cccccc]
                      border-r border-[#1a1a1a] last:border-r-0
                      group-hover:text-white
                      transition-colors duration-150
                    "
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Footer */}
      <div className="border-t border-[#1e1e1e] bg-[#0a0a0a]">
        <div className="flex items-center justify-between px-5 py-3">
          {/* Info */}
          <span className="text-[11px] tracking-wide text-[#555]">
            <span className="text-[#888]">
              {(pagination.page - 1) * pagination.limit + 1}
              {/* {Math.min(pagination.page * pagination.limit, pagination.total)} */}
            </span>{" "}
            / {pagination.total} phòng
          </span>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            {/* Prev */}
            <button
              disabled={pagination.page === 1}
              onClick={() => onPageChange(pagination.page - 1)}
              className="flex items-center gap-1 px-3 h-8 rounded-md text-xs font-medium
          border border-[#2a2a2a] text-[#888]
          transition-all duration-150
          hover:border-[#e50000] hover:text-[#e50000] hover:bg-[#1a0000]
          disabled:opacity-30 disabled:cursor-not-allowed
          disabled:hover:border-[#2a2a2a] disabled:hover:text-[#888] disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Trước
            </button>

            {/* First + ellipsis */}
            {Math.max(0, pagination.page - 3) > 0 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className="w-8 h-8 rounded-md text-xs border border-[#2a2a2a] text-[#888]
              hover:border-[#e50000] hover:text-[#e50000] hover:bg-[#1a0000]
              transition-all duration-150"
                >
                  1
                </button>
                {Math.max(0, pagination.page - 3) > 1 && (
                  <span className="w-8 h-8 flex items-center justify-center text-[#444] text-xs">
                    ···
                  </span>
                )}
              </>
            )}

            {/* Page numbers */}
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .slice(
                Math.max(0, pagination.page - 3),
                Math.min(pagination.totalPages, pagination.page + 2),
              )
              .map((page) =>
                page === pagination.page ? (
                  <button
                    key={page}
                    className="w-8 h-8 rounded-md text-xs font-bold
                bg-[#e50000] text-white border border-[#e50000]
                shadow-[0_0_12px_rgba(229,0,0,0.35)]"
                  >
                    {page}
                  </button>
                ) : (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className="w-8 h-8 rounded-md text-xs
                border border-[#2a2a2a] text-[#888]
                hover:border-[#e50000] hover:text-[#e50000] hover:bg-[#1a0000]
                transition-all duration-150"
                  >
                    {page}
                  </button>
                ),
              )}

            {/* Ellipsis + last */}
            {Math.min(pagination.totalPages, pagination.page + 2) <
              pagination.totalPages && (
              <>
                {Math.min(pagination.totalPages, pagination.page + 2) <
                  pagination.totalPages - 1 && (
                  <span className="w-8 h-8 flex items-center justify-center text-[#444] text-xs">
                    ···
                  </span>
                )}
                <button
                  onClick={() => onPageChange(pagination.totalPages)}
                  className="w-8 h-8 rounded-md text-xs border border-[#2a2a2a] text-[#888]
              hover:border-[#e50000] hover:text-[#e50000] hover:bg-[#1a0000]
              transition-all duration-150"
                >
                  {pagination.totalPages}
                </button>
              </>
            )}

            {/* Next */}
            <button
              disabled={pagination.page === pagination.totalPages}
              onClick={() => onPageChange(pagination.page + 1)}
              className="flex items-center gap-1 px-3 h-8 rounded-md text-xs font-medium
          border border-[#2a2a2a] text-[#888]
          transition-all duration-150
          hover:border-[#e50000] hover:text-[#e50000] hover:bg-[#1a0000]
          disabled:opacity-30 disabled:cursor-not-allowed
          disabled:hover:border-[#2a2a2a] disabled:hover:text-[#888] disabled:hover:bg-transparent"
            >
              Sau
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
