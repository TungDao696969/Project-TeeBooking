"use client";

import dayjs from "dayjs";
import { ArrowLeft, Clock, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { User } from "@/types/admin/user.type";
import RestoreUserDialog from "./restore-user-dialog";
import Link from "next/link";
interface Props {
  users: User[];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(-2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function TrashUserTable({ users }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#1f1f1f] bg-[#0d0d0d]">
      {/* Table header bar */}
      <div className="flex items-center gap-2.5 border-b border-[#1f1f1f] px-5 py-4">
        <Trash2 className="h-[18px] w-[18px] text-[#c8102e]" />

        <h2 className="font-['Bebas_Neue',sans-serif] text-xl tracking-[2px] text-[#f0f0f0]">
          Thùng Rác Người Dùng
        </h2>

        <span className="rounded border border-[rgba(200,16,46,0.25)] bg-[rgba(200,16,46,0.12)] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#c8102e]">
          {users.length} người dùng
        </span>

        <div className="ml-auto">
          <Link href="/admin/user">
            <button
              className="
          flex items-center gap-2
          rounded-lg
          border border-[#2a2a2a]
          bg-[#161616]
          px-3 py-2
          text-xs font-medium
          text-[#d4d4d4]
          transition-all
          hover:border-[#c8102e]
          hover:text-white
        "
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại danh sách
            </button>
          </Link>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#1f1f1f] hover:bg-transparent">
            <TableHead className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#555]">
              Họ tên
            </TableHead>
            <TableHead className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#555]">
              Email
            </TableHead>
            <TableHead className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#555]">
              Vai trò
            </TableHead>
            <TableHead className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#555]">
              Ngày xóa
            </TableHead>
            <TableHead className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#555]">
              Hành động
            </TableHead>
            <TableHead className="px-4 py-2.5" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={5}
                className="py-12 text-center text-[13px] tracking-wide text-[#3a3a3a]"
              >
                Không có người dùng nào trong thùng rác
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow
                key={user.id}
                className="border-b border-[#161616] transition-colors hover:bg-[#161616]"
              >
                {/* Name + Avatar */}
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#1a1a1a] text-[11px] font-semibold tracking-wide text-[#888]">
                      {getInitials(user.fullName)}
                    </div>
                    <span className="text-[13.5px] font-medium text-[#f0f0f0]">
                      {user.fullName}
                    </span>
                  </div>
                </TableCell>

                {/* Email */}
                <TableCell className="px-4 py-3 text-[13.5px] text-[#ccc]">
                  {user.email}
                </TableCell>

                {/* Role */}
                <TableCell className="px-4 py-3">
                  {user.role === "admin" ? (
                    <span className="inline-flex items-center rounded border border-[rgba(200,16,46,0.2)] bg-[rgba(200,16,46,0.1)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#e8405a]">
                      Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded border border-[#2a2a2a] bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#666]">
                      User
                    </span>
                  )}
                </TableCell>

                {/* Deleted At */}
                <TableCell className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-[12.5px] text-[#555]">
                    <Clock className="h-3 w-3" />
                    {dayjs(user.deletedAt).format("DD/MM/YYYY HH:mm")}
                  </span>
                </TableCell>

                {/* Action */}
                <TableCell className="px-4 py-3">
                  <div className="flex items-center ml-6 gap-2">
                    <RestoreUserDialog userId={user.id} />
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
