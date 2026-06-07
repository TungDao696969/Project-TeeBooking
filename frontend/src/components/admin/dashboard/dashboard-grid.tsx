"use client";

import { useDashboardStats } from "@/hooks/admin/dashboard/use-dashboard-stats";
import {
  TrendingUp,
  DollarSign,
  CalendarDays,
  BarChart3,
  Ticket,
  Clock,
  XCircle,
  Users,
  Film,
  Building2,
  DoorOpen,
  Armchair,
  CalendarClock,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Variant = "revenue" | "booking" | "warning" | "users" | "infra";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  variant?: Variant;
  sub?: string;
  trend?: "up" | "down";
}

// ─── Variant config ───────────────────────────────────────────────────────────

const VARIANT: Record<
  Variant,
  {
    accent: string;
    iconBg: string;
    iconColor: string;
  }
> = {
  revenue: {
    accent: "from-red-700 to-red-500",
    iconBg: "bg-red-950",
    iconColor: "text-red-400",
  },

  booking: {
    accent: "from-teal-700 to-teal-500",
    iconBg: "bg-teal-950",
    iconColor: "text-teal-400",
  },

  warning: {
    accent: "from-amber-700 to-amber-500",
    iconBg: "bg-amber-950",
    iconColor: "text-amber-400",
  },

  users: {
    accent: "from-blue-700 to-blue-500",
    iconBg: "bg-blue-950",
    iconColor: "text-blue-400",
  },

  infra: {
    accent: "from-violet-700 to-violet-500",
    iconBg: "bg-violet-950",
    iconColor: "text-violet-400",
  },
};
// ─── StatsCard ────────────────────────────────────────────────────────────────

function StatsCard({
  label,
  value,
  icon,
  variant = "infra",
  sub,
  trend,
}: StatCardProps) {
  const v = VARIANT[variant];
  return (
    <div className="relative bg-[#111] border border-neutral-800/60 rounded-2xl p-4 overflow-hidden">
      {/* top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${v.accent}`}
      />

      {/* icon */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${v.iconBg} ${v.iconColor}`}
      >
        {icon}
      </div>

      {/* label */}
      <p className="text-[11px] font-medium text-neutral-500 tracking-wide uppercase mb-1">
        {label}
      </p>

      {/* value */}
      <p
        className="text-white leading-none"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "26px",
          letterSpacing: "1px",
        }}
      >
        {value}
      </p>

      {/* sub / trend */}
      {sub && (
        <p
          className={`flex items-center gap-1 text-[10px] mt-2 ${
            trend === "up"
              ? "text-green-600/70"
              : trend === "down"
                ? "text-red-600/70"
                : "text-neutral-600"
          }`}
        >
          {trend === "up" && <TrendingUp className="w-3 h-3" />}
          {trend === "down" && <TrendingUp className="w-3 h-3 rotate-180" />}
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3 mt-6 first:mt-0">
      <span className="text-[10px] font-semibold tracking-[2px] uppercase text-neutral-500 whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-neutral-800" />
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="h-[110px] bg-neutral-900 border border-neutral-800 rounded-2xl animate-pulse" />
  );
}

// ─── Dashboard Grid ───────────────────────────────────────────────────────────

export default function DashboardGrid() {
  const { data, isLoading } = useDashboardStats();

  return (
    <div
      className="bg-[#0a0a0a] rounded-2xl p-6"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Page heading */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#ef4444aa] shrink-0" />
        <h1
          className="text-white tracking-[3px] uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px" }}
        >
          Tổng Quan Hệ Thống
        </h1>
        <span className="ml-auto text-[11px] text-neutral-600 font-medium">
          {new Date().toLocaleDateString("vi-VN")}
        </span>
      </div>

      {/* ── Revenue ── */}
      <SectionLabel>Doanh thu</SectionLabel>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)
        ) : (
          <>
            <StatsCard
              label="Tổng doanh thu"
              value={`₫${data?.totalRevenue.toLocaleString("vi-VN")}`}
              icon={<DollarSign className="w-4 h-4" />}
              variant="revenue"
              sub="Toàn thời gian"
            />
            <StatsCard
              label="Doanh thu hôm nay"
              value={`₫${data?.todayRevenue.toLocaleString("vi-VN")}`}
              icon={<CalendarDays className="w-4 h-4" />}
              variant="revenue"
              sub="Toàn thời gian"
              trend="up"
            />
            <StatsCard
              label="Doanh thu tháng này"
              value={`₫${data?.monthlyRevenue.toLocaleString("vi-VN")}`}
              icon={<BarChart3 className="w-4 h-4" />}
              variant="revenue"
              sub="Toàn thời gian"
              trend="up"
            />
          </>
        )}
      </div>

      {/* ── Bookings ── */}
      <SectionLabel>Đặt vé</SectionLabel>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)
        ) : (
          <>
            <StatsCard
              label="Tổng đặt vé"
              value={data?.totalBookings ?? 0}
              icon={<Ticket className="w-4 h-4" />}
              variant="booking"
              sub="Toàn thời gian"
            />
            <StatsCard
              label="Đặt vé hôm nay"
              value={data?.todayBookings ?? 0}
              icon={<Clock className="w-4 h-4" />}
              variant="booking"
              sub="Toàn thời gian"
              trend="up"
            />
            <StatsCard
              label="Đặt vé đã hủy"
              value={data?.cancelledBookings ?? 0}
              icon={<XCircle className="w-4 h-4" />}
              variant="warning"
              sub="Toàn thời gian"
              trend="down"
            />
          </>
        )}
      </div>

      {/* ── Infrastructure ── */}
      <SectionLabel>Hạ tầng</SectionLabel>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} />)
        ) : (
          <>
            <StatsCard
              label="Người dùng"
              value={data?.totalUsers ?? 0}
              icon={<Users className="w-4 h-4" />}
              variant="users"
            />
            <StatsCard
              label="Phim"
              value={data?.totalMovies ?? 0}
              icon={<Film className="w-4 h-4" />}
              variant="infra"
            />
            <StatsCard
              label="Rạp chiếu"
              value={data?.totalCinemas ?? 0}
              icon={<Building2 className="w-4 h-4" />}
              variant="infra"
            />
            <StatsCard
              label="Phòng chiếu"
              value={data?.totalRooms ?? 0}
              icon={<DoorOpen className="w-4 h-4" />}
              variant="infra"
            />
            <StatsCard
              label="Tổng ghế"
              value={data?.totalSeats ?? 0}
              icon={<Armchair className="w-4 h-4" />}
              variant="infra"
            />
          </>
        )}
      </div>

      {/* ── Showtimes ── */}
      <SectionLabel>Lịch chiếu</SectionLabel>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {isLoading ? (
          <Skeleton />
        ) : (
          <StatsCard
            label="Tổng suất chiếu"
            value={data?.totalShowtimes ?? 0}
            icon={<CalendarClock className="w-4 h-4" />}
            variant="booking"
          />
        )}
      </div>
    </div>
  );
}
