"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-800 bg-gray-800 px-6 gap-4">
      {/* Left — greeting */}
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_6px_#ef4444aa]" />
        <p className="text-neutral-500 text-sm font-medium tracking-wide">
          Xin chào, <span className="text-white font-semibold">Admin</span>
        </p>
      </div>

      {/* Center — search */}
      {/* <div className="flex-1 max-w-sm relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none"
          size={14}
        />
        <Input
          placeholder="Tìm kiếm..."
          className="w-full pl-9 h-9 bg-white border-neutral-800 text-neutral-300 placeholder:text-neutral-600 text-sm rounded-xl focus-visible:ring-1 focus-visible:ring-red-700 focus-visible:border-red-800 transition-colors"
        />
      </div> */}

      {/* Right — actions + user */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-500 hover:text-white hover:border-neutral-700 transition-colors">
          <Bell size={15} />
          {/* notification dot */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-600" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-neutral-800" />

        {/* User */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-700 flex items-center justify-center shrink-0">
            <span
              className="text-white text-sm font-bold tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              A
            </span>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">Admin</p>
            <p className="text-[11px] text-neutral-500">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
