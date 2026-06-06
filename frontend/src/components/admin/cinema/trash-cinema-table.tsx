"use client";

import dayjs from "dayjs";
import { Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Cinema } from "@/types/admin/cinema.type";
import RestoreCinemaButton from "./restore-cinema-button";
import Link from "next/link";

interface Props {
  cinemas: Cinema[];
}

export default function TrashCinemaTable({ cinemas }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#1f1f1f] bg-[#0d0d0d]">
      <div className="flex flex-col gap-3 border-b border-[#1f1f1f] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <Trash2 className="h-[18px] w-[18px] text-[#c8102e]" />

          <div>
            <h2 className="font-['Bebas_Neue',sans-serif] text-xl tracking-[2px] text-[#f0f0f0]">
              Thùng Rác Rạp
            </h2>
            <p className="text-sm text-[#888]">Các rạp đã bị xoá mềm</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded border border-[rgba(200,16,46,0.25)] bg-[rgba(200,16,46,0.12)] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#c8102e]">
            {cinemas.length} rạp
          </span>
          <Link href="/admin/cinema">
            <button className="rounded border border-[#2a2a2a] bg-[#161616] px-3 py-2 text-xs font-medium text-[#d4d4d4] transition hover:border-[#c8102e] hover:text-white">
              Quay lại danh sách
            </button>
          </Link>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#1f1f1f] hover:bg-transparent">
            <TableHead className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#444]">
              Tên rạp
            </TableHead>
            <TableHead className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#444]">
              Địa chỉ
            </TableHead>
            <TableHead className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#444]">
              Ngày xóa
            </TableHead>
            <TableHead className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#444] text-right">
              Hành động
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cinemas.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={4}
                className="py-14 text-center text-[13px] tracking-wide text-[#3a3a3a]"
              >
                Không có dữ liệu trong thùng rác
              </TableCell>
            </TableRow>
          ) : (
            cinemas.map((cinema) => (
              <TableRow
                key={cinema.id}
                className="border-b border-[#161616] transition-colors hover:bg-[#161616]"
              >
                <TableCell className="px-4 py-3 text-[13.5px] font-semibold text-[#f0f0f0]">
                  {cinema.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-[13px] text-[#ccc]">
                  {cinema.address}
                </TableCell>
                <TableCell className="px-4 py-3 text-[12.5px] text-[#555]">
                  {cinema.deletedAt
                    ? dayjs(cinema.deletedAt).format("DD/MM/YYYY HH:mm")
                    : "-"}
                </TableCell>
                <TableCell className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <RestoreCinemaButton cinemaId={cinema.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
