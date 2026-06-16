"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";

import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r w-full from-[#5B3BB7] to-[#3D5ED7] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* TOP */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* LEFT */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-6">
              <Link href="/">
                <h2
                  className="text-4xl tracking-widest text-[#E8001D]"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                  }}
                >
                  TEE
                  <span className="text-white">STAR</span>
                </h2>
              </Link>

              <p className="mt-3 text-xl font-black uppercase">
                Be Happy, Be A Star
              </p>
            </div>

            {/* Buttons */}
            <div className="mb-6 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-11 min-w-[155px] rounded-md bg-yellow-400 text-base font-black uppercase text-black hover:bg-yellow-300"
              >
                <Link href="/movies">Đặt Vé</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-11 min-w-[155px] rounded-md border-yellow-400 bg-transparent text-base font-black uppercase text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                <Link href="/showtimes">Đặt Bắp Nước</Link>
              </Button>
            </div>

            {/* Social */}
            <div className="mb-5 flex items-center gap-3">
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#5B3BB7] transition hover:scale-110"
              >
                <FaFacebookF className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#5B3BB7] transition hover:scale-110"
              >
                <FaYoutube className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#5B3BB7] transition hover:scale-110"
              >
                <FaTiktok className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white p-1 transition hover:scale-110"
              >
                <span className="text-xs font-black text-[#5B3BB7]">Zalo</span>
              </Link>
            </div>

            {/* Language */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-medium">Ngôn ngữ:</span>

              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500">
                  <span className="text-xs font-bold">★</span>
                </div>

                <span className="text-2xl font-medium">VN</span>
              </div>
            </div>
          </div>

          {/* Column 1 */}
          <div>
            <h3 className="mb-5 text-2xl font-black uppercase">Tài Khoản</h3>

            <ul className="space-y-4 text-lg">
              <li>
                <Link href="/login" className="hover:text-yellow-300">
                  Đăng nhập
                </Link>
              </li>

              <li>
                <Link
                  href="/login?mode=register"
                  className="hover:text-yellow-300"
                >
                  Đăng ký
                </Link>
              </li>

              <li>
                <Link href="/profile" className="hover:text-yellow-300">
                  Membership
                </Link>
              </li>
            </ul>

            <h3 className="mb-5 mt-10 text-2xl font-black uppercase">
              Xem Phim
            </h3>

            <ul className="space-y-4 text-lg">
              <li>
                <Link href="/movies/showing" className="hover:text-yellow-300">
                  Phim đang chiếu
                </Link>
              </li>

              <li>
                <Link
                  href="/movies/comingsoon"
                  className="hover:text-yellow-300"
                >
                  Phim sắp chiếu
                </Link>
              </li>

              <li>
                <Link href="/showtimes" className="hover:text-yellow-300">
                  Suất chiếu đặc biệt
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="mb-5 text-2xl font-black uppercase">Thuê Sự Kiện</h3>

            <ul className="space-y-4 text-lg">
              <li>
                <Link href="/cinemas" className="hover:text-yellow-300">
                  Thuê rạp
                </Link>
              </li>

              <li>
                <Link href="/cinemas" className="hover:text-yellow-300">
                  Các loại hình cho thuê khác
                </Link>
              </li>
            </ul>

            <h3 className="mb-5 mt-10 text-2xl font-black uppercase">
              Cinestar
            </h3>

            <ul className="space-y-4 text-lg">
              <li>
                <Link href="/about" className="hover:text-yellow-300">
                  Giới thiệu
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-yellow-300">
                  Liên hệ
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-yellow-300">
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="mb-5 text-2xl font-black uppercase">Dịch Vụ Khác</h3>

            <ul className="space-y-4 text-lg">
              <li>
                <Link href="#" className="hover:text-yellow-300">
                  Nhà hàng
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-yellow-300">
                  Kidzone
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-yellow-300">
                  Bowling
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-yellow-300">
                  Billiards
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-yellow-300">
                  Gym
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-yellow-300">
                  Nhà hát Opera
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-yellow-300">
                  Coffee
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/30" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <p className="text-lg font-medium">
            © 2025 Cinestar. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-lg">
            <Link href="#" className="hover:text-yellow-300">
              Chính sách bảo mật
            </Link>

            <Link href="/promotions" className="hover:text-yellow-300">
              Tin điện ảnh
            </Link>

            <Link href="#" className="hover:text-yellow-300">
              Hỏi và đáp
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
