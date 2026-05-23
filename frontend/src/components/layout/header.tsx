"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  UserCircle2,
  MapPin,
  CalendarDays,
  ChevronDown,
  Ticket,
  Popcorn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className="w-full bg-[#0b1633] text-white  border-white/10 sticky top-0 z-50">
      {/* Top Header */}
      <div className="mx-auto flex max-w-[1320px] items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
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
        <div className="hidden lg:flex items-center gap-4">
          <Button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-md px-2 py-5 text-base"
            onClick={() => router.push("/movies")}
          >
            <Ticket className="mr-2 h-5 w-5" />
            <p className="text-sm">ĐẶT VÉ NGAY</p>
          </Button>

          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md px-2 py-5 text-base">
            <Popcorn className="mr-2 h-5 w-5" />
            <p className="text-sm">ĐẶT BẮP NƯỚC</p>
          </Button>
        </div>

        {/* Search */}
        <div className="hidden xl:flex items-center relative w-[300px]">
          <Input
            placeholder="Tìm phim, rạp"
            className="rounded-full bg-white text-black pl-5 pr-12 py-6 text-base"
          />
          <Search className="absolute right-4 text-gray-500 h-5 w-5" />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 hover:text-yellow-400 transition">
            <UserCircle2 className="w-7 h-7" />
            <span className="font-medium hidden md:block">Đăng nhập</span>
          </button>

          <button className="flex items-center gap-2 hover:text-yellow-400 transition">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image
                src="https://cinestar.com.vn/assets/images/footer-vietnam.svg"
                alt="VN"
                width={24}
                height={24}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <span className="font-medium">VN</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navbar */}
      <nav className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left */}
          <div className="flex items-center gap-10 py-4">
            <Link
              href="/cinemas"
              className="flex items-center gap-2 hover:text-yellow-400 transition font-medium"
            >
              <MapPin className="w-5 h-5" />
              Chọn rạp
            </Link>

            <Link
              href="/showtimes"
              className="flex items-center gap-2 hover:text-yellow-400 transition font-medium"
            >
              <CalendarDays className="w-5 h-5" />
              Lịch chiếu
            </Link>
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-10 py-4">
            <Link
              href="/promotions"
              className="hover:text-yellow-400 transition font-medium"
            >
              Khuyến mãi
            </Link>

            <Link
              href="/events"
              className="hover:text-yellow-400 transition font-medium"
            >
              Tổ chức sự kiện
            </Link>

            <Link
              href="/entertainment"
              className="hover:text-yellow-400 transition font-medium"
            >
              Dịch vụ giải trí khác
            </Link>

            <Link
              href="/about"
              className="hover:text-yellow-400 transition font-medium"
            >
              Giới thiệu
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
