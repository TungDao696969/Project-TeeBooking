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
import { useState } from "react";
import { useDebounce } from "use-debounce";

import { useMovieSuggestions } from "@/hooks/use-search-movies";
import { Movie } from "@/types/movie.type";
export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const displayName = user?.fullName || user?.name || user?.email || "User";
  const avatarUrl =
    user?.avatarUrl ||
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}`;

  const [isFocused, setIsFocused] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data: suggestions, isLoading } = useMovieSuggestions(debouncedSearch);

  const handleLogout = () => {
    logout();

    router.replace("/login");
  };
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
        <div className="relative hidden w-[350px] xl:flex">
          <div className="relative w-full">
            <Input
              placeholder="Tìm phim..."
              value={search}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setTimeout(() => setIsFocused(false), 200);
              }}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push(`/movies?q=${encodeURIComponent(search)}`);
                }
              }}
              className="rounded-full bg-white py-6 pl-5 pr-12 text-base text-black"
            />

            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

            {isFocused && search.trim() && (
              <div
                className="
          absolute top-full mt-2 w-full
          overflow-hidden rounded-xl
          border border-gray-200
          bg-white shadow-2xl
          z-[9999]
        "
              >
                {isLoading && (
                  <div className="p-4 text-sm text-gray-500">
                    Đang tìm kiếm...
                  </div>
                )}

                {!isLoading && suggestions?.data?.length === 0 && (
                  <div className="p-4 text-sm text-gray-500">
                    Không tìm thấy phim
                  </div>
                )}

                {!isLoading &&
                  suggestions?.data?.map((movie: Movie) => (
                    <Link
                      key={movie.id}
                      href={`/movies/${movie.slug}`}
                      className="
                flex items-center gap-3
                border-b border-gray-100
                p-3
                hover:bg-gray-50
                transition
              "
                    >
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="
                  h-16 w-12
                  rounded-md
                  object-cover
                "
                      />

                      <div className="flex-1">
                        <h4 className="font-medium text-black line-clamp-1">
                          {movie.title}
                        </h4>

                        {movie.releaseDate && (
                          <p className="text-xs text-gray-500">
                            {new Date(movie.releaseDate).getFullYear()}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}

                {!isLoading && suggestions?.data?.length > 0 && (
                  <button
                    onClick={() =>
                      router.push(
                        `/movies/search?q=${encodeURIComponent(search)}`,
                      )
                    }
                    className="
                w-full
                bg-gray-50
                p-3
                text-sm
                font-medium
                text-blue-600
                hover:bg-gray-100
              "
                  >
                    Xem tất cả kết quả
                  </button>
                )}
              </div>
            )}
          </div>
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
                  onClick={handleLogout}
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
