"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
interface BannerTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
}

export default function BannerTable<TData>({
  columns,
  data,
}: BannerTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="overflow-hidden rounded-xl bg-[#1c1c1c]">
      {/* Card header */}
      <div className="flex items-center justify-between border-b border-[#2a2a2a] px-5 py-4">
        <div>
          <p className="text-xl font-bold text-white">
            <span className="text-[#c8000a]">CINE</span>STAR
          </p>
          <p className="mt-1 border-l-[3px] border-[#c8000a] pl-2 text-sm text-[#aaa]">
            Quản lý banner
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] px-3 py-2">
            <Search className="h-4 w-4 text-[#666]" />
            <span className="text-sm text-[#666]">Tìm kiếm banner...</span>
          </div>
          <Button
            variant="outline"
            className="border-[#555] bg-transparent text-[#ccc] hover:bg-[#2a2a2a]"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Thùng rác
          </Button>
          <Link href={"/admin/banner/create"}>
            <Button className="bg-[#c8000a] text-white hover:bg-[#a00008]">
              <Plus className="mr-2 h-4 w-4" /> Thêm banner
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow
              key={group.id}
              className="border-b-0 bg-[#6b0000] hover:bg-[#6b0000]"
            >
              {group.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="py-3 px-4 text-[11px] font-semibold tracking-[.12em] uppercase text-[#ff4444]"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-b border-[#2a2a2a] last:border-0 hover:bg-[#1f1f1f] transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-3 text-sm text-[#e0e0e0]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="py-10 text-center text-sm text-[#666]"
              >
                Không có dữ liệu.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Footer / Pagination */}
      {data.length > 0 && (
        <div className="flex items-center justify-between px-5 py-4 border-t border-[#2a2a2a]">
          <div className="text-sm text-[#666]">
            Hiển thị trang {table.getState().pagination.pageIndex + 1} của {table.getPageCount()}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-[#555] bg-transparent text-[#ccc] hover:bg-[#2a2a2a] disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-[#555] bg-transparent text-[#ccc] hover:bg-[#2a2a2a] disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Sau
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
