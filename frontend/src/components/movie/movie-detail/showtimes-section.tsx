// src/components/movie/showtimes-section.tsx

"use client";

import { useEffect, useMemo, useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/vi";

import { ChevronDown, ChevronUp, MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useShowtime } from "@/hooks/showtime/use-showtime";
import { useRouter } from "next/navigation";

dayjs.locale("vi");

interface Props {
  movieSlug: string;
}

export default function ShowtimesSection({ movieSlug }: Props) {
  const [manualSelectedDate, setManualSelectedDate] = useState<string | null>(
    null,
  );
  const [selectedProvince, setSelectedProvince] = useState<string>("ALL");
  const [collapsedCinemaIds, setCollapsedCinemaIds] = useState<Set<string>>(
    new Set(),
  );

  const { data, isLoading, isError, error } = useShowtime(movieSlug);

  const router = useRouter();
  // lấy tất cả date unique
  const availableDates = useMemo(() => {
    if (!data) return [];

    const dates = new Set<string>();

    data.forEach((cinema) => {
      cinema.dates.forEach((d) => {
        dates.add(d.date);
      });
    });

    return Array.from(dates).sort();
  }, [data]);

  const currentSelectedDate =
    manualSelectedDate && availableDates.includes(manualSelectedDate)
      ? manualSelectedDate
      : (availableDates[0] ?? null);

  const availableProvinces = useMemo(() => {
    if (!data) return [];
    const provinces = new Set<string>();
    data.forEach((c) => {
      const cityName = c.cinema.city?.name || c.cinema.province;
      if (cityName) provinces.add(cityName);
    });
    return Array.from(provinces).sort((a, b) => a.localeCompare(b, "vi"));
  }, [data]);

  const filteredCinemas = useMemo(() => {
    if (!data) return [];
    if (selectedProvince === "ALL") return data;
    return data.filter(
      (c) => (c.cinema.city?.name || c.cinema.province) === selectedProvince,
    );
  }, [data, selectedProvince]);

  // reset when navigating between movies
  // useEffect(() => {
  //   setSelectedDate(null);
  //   setSelectedProvince("ALL");
  //   setExpandedCinemaIds(new Set());
  // }, [movieSlug]);

  // default selected date (when data arrives)
  // useEffect(() => {
  //   if (!selectedDate && availableDates.length > 0) {
  //     setSelectedDate(availableDates[0]);
  //   }
  // }, [availableDates, selectedDate]);

  // // expand all cinemas by default (when data arrives)
  // useEffect(() => {
  //   if (!data) return;
  //   setExpandedCinemaIds(new Set(data.map((c) => c.cinema.id)));
  // }, [data]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-white">Đang tải lịch chiếu...</div>
    );
  }

  if (isError) {
    const message =
      error instanceof Error ? error.message : "Không thể tải lịch chiếu.";

    return (
      <div className="py-20 text-center text-white">
        <div className="text-xl font-semibold">Không tải được lịch chiếu</div>
        <div className="mt-2 text-sm text-white/80">{message}</div>
      </div>
    );
  }

  if (!data || data.length === 0 || availableDates.length === 0) {
    return (
      <section className="bg-[#3F3B97] py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-5xl font-black uppercase text-white">
              Lịch Chiếu
            </h2>
          </div>
          <div className="py-12 text-center text-white/90">
            Chưa có lịch chiếu cho phim này.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#3F3B97] py-16">
      <div className="container mx-auto px-4">
        {/* heading */}
        <div className="mb-10 text-center">
          <h2 className="text-5xl font-black uppercase text-white">
            Lịch Chiếu
          </h2>
        </div>

        {/* date tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-5">
          {availableDates.map((date) => {
            const isActive = currentSelectedDate === date;

            return (
              <button
                key={date}
                onClick={() => setManualSelectedDate(date)}
                className={`flex h-[140px] w-[120px] flex-col items-center justify-center rounded-md border text-center transition-all duration-200 ${
                  isActive
                    ? "border-yellow-400 bg-yellow-400 text-[#4A3FB4]"
                    : "border-yellow-400 bg-transparent text-yellow-300 hover:bg-yellow-400 hover:text-[#4A3FB4]"
                }`}
              >
                <span className="text-4xl font-black">
                  {dayjs(date).format("DD/MM")}
                </span>

                <span className="mt-3 text-xl font-semibold capitalize">
                  {dayjs(date).format("dddd")}
                </span>
              </button>
            );
          })}
        </div>

        {/* list heading + province filter */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="text-4xl font-black uppercase tracking-wide text-white">
            DANH SÁCH RẠP
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-yellow-300">
              <MapPin className="h-4 w-4" />
            </div>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="h-11 min-w-[220px] appearance-none rounded-md border border-yellow-400/70 bg-transparent pl-10 pr-10 text-sm font-semibold uppercase text-yellow-300 outline-none transition-colors focus:border-yellow-400"
            >
              <option value="ALL" className="text-black">
                Tất cả
              </option>
              {availableProvinces.map((p) => (
                <option key={p} value={p} className="text-black">
                  {p}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-yellow-300">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* cinema list */}
        <div className="space-y-6">
          {filteredCinemas.map((cinemaItem) => {
            const matchedDate = cinemaItem.dates.find(
              (d) => d.date === currentSelectedDate,
            );

            if (!matchedDate) return null;

            const isExpanded = !collapsedCinemaIds.has(cinemaItem.cinema.id);

            return (
              <Card
                key={cinemaItem.cinema.id}
                className="rounded-xl border-none bg-[#6A35A6]/90 p-6 text-white shadow-[0_12px_35px_rgba(0,0,0,0.25)]"
              >
                {/* cinema header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-yellow-300">
                      {cinemaItem.cinema.name} ({cinemaItem.cinema.city?.name || cinemaItem.cinema.province})
                    </h3>
                    <div className="mt-2 text-sm text-white/85">
                      {cinemaItem.cinema.address}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCollapsedCinemaIds((prev) => {
                        const next = new Set(prev);

                        if (next.has(cinemaItem.cinema.id)) {
                          next.delete(cinemaItem.cinema.id);
                        } else {
                          next.add(cinemaItem.cinema.id);
                        }

                        return next;
                      });
                    }}
                    className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white/90 transition-colors hover:bg-white/15"
                    aria-label={isExpanded ? "Thu gọn" : "Mở rộng"}
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-6 space-y-4">
                    {(() => {
                      const groups = new Map<
                        string,
                        typeof matchedDate.showtimes
                      >();
                      matchedDate.showtimes.forEach((s) => {
                        const key = s.format || "Standard";
                        const arr = groups.get(key) ?? [];
                        arr.push(s);
                        groups.set(key, arr);
                      });

                      return Array.from(groups.entries()).map(
                        ([format, items]) => (
                          <div key={format}>
                            <div className="mb-3 text-sm font-semibold text-white/90">
                              {format}
                            </div>

                            <div className="flex flex-wrap gap-3">
                              {items
                                .slice()
                                .sort(
                                  (a, b) =>
                                    dayjs(a.startTime).valueOf() -
                                    dayjs(b.startTime).valueOf(),
                                )
                                .map((showtime) => (
                                  <Button
                                    key={showtime.id}
                                    variant="outline"
                                    className="h-10 rounded-md border border-white/35 bg-transparent px-4 text-sm font-semibold text-white hover:bg-white/10"
                                    onClick={() =>
                                      router.push(`/booking/${showtime.id}`)
                                    }
                                  >
                                    {dayjs(showtime.startTime).format("HH:mm")}
                                  </Button>
                                ))}
                            </div>
                          </div>
                        ),
                      );
                    })()}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
