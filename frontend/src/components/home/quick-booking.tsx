"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function QuickBooking() {
  return (
    <section className="w-full mt-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 rounded-md bg-[#E5E7EE] px-6 py-4 lg:flex-row">
        {/* Title */}
        <div className="min-w-[220px]">
          <h2 className="text-2xl font-extrabold uppercase tracking-wide text-[#3A2A1E]">
            Đặt Vé Nhanh
          </h2>
        </div>

        {/* Selects */}
        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Chọn rạp */}
          <Select>
            <SelectTrigger className="h-14 rounded-xl border border-gray-400 bg-white text-lg font-bold text-[#6A35A6]">
              <SelectValue placeholder="1. Chọn Rạp" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="cgv">CGV</SelectItem>
              <SelectItem value="lotte">Lotte Cinema</SelectItem>
              <SelectItem value="beta">Beta Cinema</SelectItem>
            </SelectContent>
          </Select>

          {/* Chọn phim */}
          <Select>
            <SelectTrigger className="h-14 rounded-xl border border-gray-400 bg-white text-lg font-bold text-[#6A35A6]">
              <SelectValue placeholder="2. Chọn Phim" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="movie-1">Avengers</SelectItem>
              <SelectItem value="movie-2">Batman</SelectItem>
              <SelectItem value="movie-3">Spider-Man</SelectItem>
            </SelectContent>
          </Select>

          {/* Chọn ngày */}
          <Select>
            <SelectTrigger className="h-14 rounded-xl border border-gray-400 bg-white text-lg font-bold text-[#6A35A6]">
              <SelectValue placeholder="3. Chọn Ngày" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="tomorrow">Ngày mai</SelectItem>
              <SelectItem value="weekend">Cuối tuần</SelectItem>
            </SelectContent>
          </Select>

          {/* Chọn suất */}
          <Select>
            <SelectTrigger className="h-14 rounded-xl border border-gray-400 bg-white text-lg font-bold text-[#6A35A6]">
              <SelectValue placeholder="4. Chọn Suất" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="8h">08:00</SelectItem>
              <SelectItem value="14h">14:00</SelectItem>
              <SelectItem value="20h">20:00</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Button */}
        <Button className="h-14 rounded-xl bg-[#6A35A6] px-8 text-lg font-extrabold uppercase hover:bg-[#582c8d]">
          Đặt Ngay
        </Button>
      </div>
    </section>
  );
}
