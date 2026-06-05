"use client";

import Image from "next/image";
import dayjs from "dayjs";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { User } from "@/types/admin/user.type";
import Pagination from "@/components/admin/user/pagination";
import { useUserStore } from "@/store/admin/user.store";
import { useUsers } from "@/hooks/admin/user/use-users";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
interface Props {
  users: User[];
}

// ── Badge helpers ──────────────────────────────────────────────
const ROLE_STYLES: Record<string, string> = {
  ADMIN: "bg-purple-950/60 text-purple-400 border border-purple-900/50",
  STAFF: "bg-yellow-950/50 text-yellow-500 border border-yellow-900/40",
  USER: "bg-blue-950/60 text-blue-400 border border-blue-900/50",
};

function RoleBadge({ role }: { role: string }) {
  const cls =
    ROLE_STYLES[role.toUpperCase()] ??
    "bg-zinc-800 text-zinc-400 border border-zinc-700";
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${cls}`}
    >
      {role}
    </span>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return active ? (
    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-green-950/60 text-green-400 border border-green-900/50">
      Active
    </span>
  ) : (
    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-red-950/60 text-red-400 border border-red-900/50">
      Inactive
    </span>
  );
}

function VerifiedBadge({ verified }: { verified: boolean }) {
  return verified ? (
    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-sky-950/60 text-sky-400 border border-sky-900/50">
      Verified
    </span>
  ) : (
    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-zinc-800/60 text-zinc-500 border border-zinc-700/50">
      Pending
    </span>
  );
}

// ── Avatar ─────────────────────────────────────────────────────
function Avatar({ src, name }: { src?: string | null; name: string }) {
  const initials = name
    .split(" ")
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return src ? (
    <Image
      src={src}
      alt={name}
      width={34}
      height={34}
      className="rounded-full border border-yellow-900/40 object-cover shrink-0"
    />
  ) : (
    <div
      className="w-[34px] h-[34px] rounded-full border border-yellow-900/40 flex items-center justify-center shrink-0 text-[13px] font-bold"
      style={{
        background: "#241f14",
        color: "#c9a84c",
        fontFamily: "'Bebas Neue', sans-serif",
      }}
    >
      {initials}
    </div>
  );
}

// ── Action button ──────────────────────────────────────────────
function ActionBtn({
  icon,
  danger,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  danger?: boolean;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={[
        "w-[30px] h-[30px] rounded-lg border inline-flex items-center justify-center transition-colors",
        danger
          ? "bg-red-950/40 border-red-900/50 text-red-500 hover:bg-red-950/70 hover:border-red-500"
          : "border-yellow-900/30 text-zinc-500 hover:border-yellow-500/60 hover:text-yellow-500",
      ].join(" ")}
      style={{ background: danger ? undefined : "#13120e" }}
    >
      {icon}
    </button>
  );
}

// ── Table ──────────────────────────────────────────────────────
const TH_CLASS =
  "px-3 py-2.5 text-left text-[10px] font-semibold tracking-widest uppercase whitespace-nowrap";

export default function UserTable({ users }: Props) {
  const { page, limit, setPage } = useUserStore();
  const { data, isLoading } = useUsers(page, limit);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "#0d0d0f", fontFamily: "'Barlow', sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-zinc-800/60">
        <div
          className="w-1.5 h-8 rounded-full shrink-0"
          style={{ background: "#c9a84c" }}
        />
        <div>
          <h2
            className="text-xl tracking-widest m-0 leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#c9a84c" }}
          >
            Quản lý người dùng
          </h2>
          <p className="text-[11px] tracking-widest uppercase mt-0.5 text-zinc-600">
            Cinestar Cinema · Admin Panel
          </p>
        </div>
        <span
          className="ml-auto text-xs px-3 py-1 rounded-full border"
          style={{
            background: "#1a1710",
            borderColor: "#3a3020",
            color: "#c9a84c",
          }}
        >
          {users.length} thành viên
        </span>

        <Link href="/admin/user/create">
          <Button
            size="sm"
            className="h-8 bg-[#E8001D] text-white hover:bg-[#c4001a]"
          >
            <Plus className="h-3.5 w-3.5" />
            Thêm mới
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: "#111009" }}>
              <th className={TH_CLASS} style={{ color: "#5a5248" }}>
                Người dùng
              </th>
              <th className={TH_CLASS} style={{ color: "#5a5248" }}>
                Điện thoại
              </th>
              <th className={TH_CLASS} style={{ color: "#5a5248" }}>
                Vai trò
              </th>
              <th className={TH_CLASS} style={{ color: "#5a5248" }}>
                Trạng thái
              </th>
              <th className={TH_CLASS} style={{ color: "#5a5248" }}>
                Xác thực
              </th>
              <th className={TH_CLASS} style={{ color: "#5a5248" }}>
                Ngày tạo
              </th>
              <th className={TH_CLASS} />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b transition-colors hover:bg-zinc-900/30"
                style={{ borderColor: "#191714" }}
              >
                {/* User */}
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar src={user.avatarUrl} name={user.fullName} />
                    <div>
                      <p
                        className="text-sm font-medium leading-tight"
                        style={{ color: "#e8e0d0" }}
                      >
                        {user.fullName}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#6a6050" }}
                      >
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td
                  className="px-3 py-2.5 text-sm"
                  style={{ color: "#9a9080" }}
                >
                  {user.phone}
                </td>

                <td className="px-3 py-2.5">
                  <RoleBadge role={user.role} />
                </td>

                <td className="px-3 py-2.5">
                  <StatusBadge active={user.isActive} />
                </td>

                <td className="px-3 py-2.5">
                  <VerifiedBadge verified={user.isVerified} />
                </td>

                <td
                  className="px-3 py-2.5 text-xs tabular-nums"
                  style={{ color: "#5a5248" }}
                >
                  {dayjs(user.createdAt).format("DD/MM/YYYY HH:mm")}
                </td>

                <td className="px-3 py-2.5">
                  <div className="flex gap-1.5">
                    <Link href={`/admin/user/${user.id}`}>
                      <ActionBtn icon={<Eye size={14} />} label="Xem" />
                    </Link>
                    <Link href={`/admin/user/${user.id}/edit`}>
                      <ActionBtn icon={<Pencil size={14} />} label="Sửa" />
                    </Link>
                    <ActionBtn icon={<Trash2 size={14} />} label="Xoá" danger />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          page={data?.pagination.page || 1}
          totalPages={data?.pagination.totalPages || 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
