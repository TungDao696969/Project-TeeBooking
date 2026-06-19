"use client";

import Image from "next/image";
import Link from "next/link";
import {
  User,
  Popcorn,
  Search,
  Ticket,
  UserCircle2,
  LogOut,
  Menu,
  X,
  MapPin,
  CalendarDays,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "./navbar";
import { useAuthStore } from "@/store/auth.store";
import { useState, useEffect } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data: suggestions, isLoading } = useMovieSuggestions(debouncedSearch);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  // Close mobile menu when route changes or on resize
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-white/10 bg-[#0b1633] text-white shadow-md">
        {/* Top Header */}
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden block text-white hover:text-yellow-400"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-7 w-7" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <h2
                className="text-3xl md:text-4xl tracking-widest text-[#E8001D]"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                }}
              >
                TEE
                <span className="text-white">STAR</span>
              </h2>
            </Link>
          </div>

          {/* Action Buttons (Desktop) */}
          <div className="hidden items-center gap-4 lg:flex">
            <Button
              className="rounded-md bg-yellow-400 px-4 py-5 text-base font-bold text-black hover:bg-yellow-500 transition-all"
              onClick={() => router.push("/movies")}
            >
              <Ticket className="mr-2 h-5 w-5" />
              <span className="text-sm">ĐẶT VÉ NGAY</span>
            </Button>

            <Button
              className="rounded-md bg-purple-600 px-4 py-5 text-base font-bold text-white hover:bg-purple-700 transition-all"
              onClick={() => router.push("/showtimes")}
            >
              <Popcorn className="mr-2 h-5 w-5" />
              <span className="text-sm">ĐẶT BẮP NƯỚC</span>
            </Button>
          </div>

          {/* Search (Desktop) */}
          <div className="relative hidden w-[350px] xl:block">
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
                  if (e.key === "Enter" && search.trim()) {
                    router.push(`/movies?q=${encodeURIComponent(search)}`);
                  }
                }}
                className="rounded-full bg-white py-5 pl-5 pr-12 text-sm text-black border-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              />

              <button
                onClick={() => {
                  if (search.trim()) {
                    router.push(`/movies?q=${encodeURIComponent(search)}`);
                  }
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-black"
              >
                <Search className="h-5 w-5" />
              </button>

              {isFocused && search.trim() && (
                <div className="absolute top-full mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl z-[9999]">
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
                        className="flex items-center gap-3 border-b border-gray-100 p-3 hover:bg-gray-50 transition"
                      >
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="h-16 w-12 rounded-md object-cover"
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
                      className="w-full bg-gray-50 p-3 text-sm font-medium text-blue-600 hover:bg-gray-100"
                    >
                      Xem tất cả kết quả
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            {user ? (
              <div className="group relative">
                {/* Avatar + Name */}
                <button 
                  onClick={() => router.push("/profile")}
                  className="flex items-center gap-2 lg:gap-3 transition hover:text-yellow-400"
                >
                  <Image
                    src={avatarUrl}
                    alt={displayName}
                    width={40}
                    height={40}
                    className="h-8 w-8 lg:h-10 lg:w-10 rounded-full object-cover border-2 border-white/20"
                  />
                  <span className="hidden font-medium md:block">
                    {displayName}
                  </span>
                </button>

                {/* Dropdown */}
                <div className="invisible absolute right-0 top-12 z-[1000] bg-[#0b1633] text-white w-56 rounded-xl border border-gray-700 p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white transition hover:bg-white/10"
                  >
                    <User className="h-4 w-4" />
                    <span>Thông tin cá nhân</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
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
                <UserCircle2 className="h-7 w-7 lg:h-8 lg:w-8" />
                <span className="hidden font-medium lg:block text-sm">Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>

        {/* Navbar (Desktop Only) */}
        <div className="hidden lg:block">
          <Navbar />
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute left-0 top-0 h-full w-4/5 max-w-sm bg-[#0b1633] shadow-2xl transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full flex-col overflow-y-auto">
            {/* Header of Drawer */}
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <h2
                  className="text-3xl tracking-widest text-[#E8001D]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  TEE<span className="text-white">STAR</span>
                </h2>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Content */}
            <div className="flex-1 p-4 space-y-6">
              {/* Mobile Search */}
              <div className="relative">
                <Input
                  placeholder="Tìm phim..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && search.trim()) {
                      router.push(`/movies?q=${encodeURIComponent(search)}`);
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="w-full rounded-full bg-white/10 py-5 pl-5 pr-12 text-sm text-white border-white/20 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-yellow-400"
                />
                <button
                  onClick={() => {
                    if (search.trim()) {
                      router.push(`/movies?q=${encodeURIComponent(search)}`);
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="flex flex-col items-center justify-center gap-2 h-auto py-3 rounded-xl bg-yellow-400 text-black hover:bg-yellow-500"
                  onClick={() => {
                    router.push("/movies");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Ticket className="h-6 w-6" />
                  <span className="text-xs font-bold">MUA VÉ</span>
                </Button>
                <Button
                  className="flex flex-col items-center justify-center gap-2 h-auto py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
                  onClick={() => {
                    router.push("/showtimes");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Popcorn className="h-6 w-6" />
                  <span className="text-xs font-bold">BẮP NƯỚC</span>
                </Button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-2 border-t border-white/10 pt-4">
                <Link
                  href="/cinemas"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-yellow-400 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MapPin className="h-5 w-5" />
                  Hệ thống rạp
                </Link>
                <Link
                  href="/showtimes"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-yellow-400 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <CalendarDays className="h-5 w-5" />
                  Lịch chiếu
                </Link>
                <Link
                  href="/promotions"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-yellow-400 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Ticket className="h-5 w-5" />
                  Khuyến mãi
                </Link>
              </div>

              {/* User Section for Mobile */}
              {!user ? (
                <div className="border-t border-white/10 pt-6">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-6 border-white/20 bg-transparent hover:bg-white/10 text-white"
                    onClick={() => {
                      router.push("/login");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <UserCircle2 className="h-5 w-5" />
                    Đăng nhập / Đăng ký
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 border-t border-white/10 pt-4">
                  <div className="mb-2 flex items-center gap-3 px-3 py-2">
                    <Image
                      src={avatarUrl}
                      alt={displayName}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover border-2 border-white/20"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white line-clamp-1">{displayName}</span>
                      <span className="text-xs text-gray-400 line-clamp-1">{user.email}</span>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-yellow-400 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    Thông tin tài khoản
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
                  >
                    <LogOut className="h-5 w-5" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

