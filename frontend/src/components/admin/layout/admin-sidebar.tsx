"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Film,
  Building2,
  Calendar,
  Ticket,
  Users,
  Armchair,
  DoorOpen,
  Presentation,
  Building,
} from "lucide-react";

const menus = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Movies",
    href: "/admin/movie",
    icon: Film,
  },

  {
    label: "Banners",
    href: "/admin/banner",
    icon: Presentation,
  },

  {
    label: "City",
    href: "/admin/city",
    icon: Building2,
  },
  {
    label: "Cinemas",
    href: "/admin/cinema",
    icon: Building,
  },

  {
    label: "Showtimes",
    href: "/admin/showtime",
    icon: Calendar,
  },

  {
    label: "Bookings",
    href: "/admin/booking",
    icon: Ticket,
  },

  {
    label: "Seat",
    href: "/admin/seat",
    icon: Armchair,
  },

  {
    label: "Room",
    href: "/admin/room",
    icon: DoorOpen,
  },

  {
    label: "Users",
    href: "/admin/user",
    icon: Users,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 bg-[#111827] text-white lg:block">
      <div className="border-b border-zinc-700 p-6">
        <h1 className="text-2xl font-bold">TEESTART ADMIN</h1>
      </div>

      <nav className="space-y-2 p-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          const active = pathname === menu.href;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                active
                  ? "bg-red-600 text-white"
                  : "text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <Icon size={20} />

              <span>{menu.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
