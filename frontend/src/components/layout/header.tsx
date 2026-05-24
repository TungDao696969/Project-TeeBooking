"use client";

import Image from "next/image";
import Link from "next/link";
import {
  User,
  Popcorn,
  Search,
  Ticket,
  UserCircle2,
  KeyRound,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "./navbar";
import { useAuthStore } from "@/store/auth.store";

export default function Header() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const displayName = user?.fullName || user?.name || user?.email || "User";
  const avatarUrl =
    user?.avatarUrl ||
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}`;

  return (
    <header className="sticky top-0 z-50 w-full border-white/10 bg-[#0b1633] text-white">
      {/* Top Header */}
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://cinestar.com.vn/_next/image/?url=%2Fassets%2Fimages%2Fheader-logo.png&w=1920&q=75"
            alt="Cinestar"
            width={180}
            height={50}
            priority
            className="object-contain"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        {/* Action Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <Button
            className="rounded-md bg-yellow-400 px-2 py-5 text-base font-bold text-black hover:bg-yellow-500"
            onClick={() => router.push("/movies")}
          >
            <Ticket className="mr-2 h-5 w-5" />
            <span className="text-sm">ĐẶT VÉ NGAY</span>
          </Button>

          <Button className="rounded-md bg-purple-600 px-2 py-5 text-base font-bold text-white hover:bg-purple-700">
            <Popcorn className="mr-2 h-5 w-5" />
            <span className="text-sm">ĐẶT BẮP NƯỚC</span>
          </Button>
        </div>

        {/* Search */}
        <div className="relative hidden w-[300px] items-center xl:flex">
          <Input
            placeholder="Tìm phim, rạp"
            className="rounded-full bg-white py-6 pl-5 pr-12 text-base text-black"
          />
          <Search className="absolute right-4 h-5 w-5 text-gray-500" />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="group relative">
              {/* Avatar + Name */}
              <button className="flex items-center gap-3 transition hover:text-yellow-400">
                <Image
                  src={avatarUrl}
                  alt={displayName}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <span className="hidden font-medium md:block">
                  {displayName}
                </span>
              </button>

              {/* Dropdown */}
              <div className="invisible absolute right-0 top-14 z-1000 bg-[#0b1633] text-white w-56 rounded-xl border border-gray-200 p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {/* Profile */}
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white transition hover:bg-gray-600"
                >
                  <User className="h-4 w-4" />

                  <span>Thông tin cá nhân</span>
                </Link>

                {/* Change password */}
                <Link
                  href="/change-password"
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white transition hover:bg-gray-600"
                >
                  <KeyRound className="h-4 w-4" />

                  <span>Đổi mật khẩu</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-500 transition hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />

                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 transition hover:text-yellow-400"
            >
              <UserCircle2 className="h-7 w-7" />

              <span className="hidden font-medium md:block">Đăng nhập</span>
            </Link>
          )}
        </div>
      </div>

      {/* Navbar */}
      <Navbar />
    </header>
  );
}
