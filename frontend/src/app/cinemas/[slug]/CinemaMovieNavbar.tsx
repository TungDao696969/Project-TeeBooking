"use client";

import { Clapperboard, Clock3, Sparkles, Ticket } from "lucide-react";

type MovieTab =
  | "now_showing"
  | "coming_soon"
  | "special_showtime"
  | "ticket_price";

interface Props {
  activeTab: MovieTab;
  setActiveTab: (value: MovieTab) => void;
  data: {
    nowShowingCount: number;
    comingSoonCount: number;
    specialShowtimeCount: number;
  };
}

const tabClass = (isActive: boolean) =>
  `group relative flex items-center justify-center gap-3 px-4 py-5 transition-all duration-300 ${
    isActive
      ? "bg-white/5 text-yellow-400"
      : "text-white hover:bg-white/5 hover:text-yellow-400"
  }`;

const activeBarClass = (isActive: boolean) =>
  `absolute bottom-0 left-0 h-[4px] w-full bg-yellow-400 transition-all ${
    isActive ? "opacity-100" : "opacity-0"
  }`;

export default function CinemaMovieNavbar({
  activeTab,
  setActiveTab,
  data,
}: Props) {
  return (
    <div className="overflow-hidden rounded-t-xl border border-white/10 bg-gradient-to-r from-[#24164F] to-[#071226]">
      <div className="grid grid-cols-2 md:grid-cols-4">
        <button
          onClick={() => setActiveTab("now_showing")}
          className={tabClass(activeTab === "now_showing")}
        >
          <Clapperboard className="h-5 w-5" />
          <div className="flex flex-col items-center">
            <span className="text-sm font-extrabold tracking-wide lg:text-lg">
              PHIM ĐANG CHIẾU
            </span>
          </div>
          <div className={activeBarClass(activeTab === "now_showing")} />
        </button>

        <button
          onClick={() => setActiveTab("coming_soon")}
          className={tabClass(activeTab === "coming_soon")}
        >
          <Clock3 className="h-5 w-5" />
          <div className="flex flex-col items-center">
            <span className="text-sm font-extrabold tracking-wide lg:text-lg">
              PHIM SẮP CHIẾU
            </span>
          </div>
          <div className={activeBarClass(activeTab === "coming_soon")} />
        </button>

        <button
          onClick={() => setActiveTab("special_showtime")}
          className={tabClass(activeTab === "special_showtime")}
        >
          <Sparkles className="h-5 w-5" />
          <div className="flex flex-col items-center">
            <span className="text-sm font-extrabold tracking-wide lg:text-lg">
              SUẤT CHIẾU ĐẶC BIỆT
            </span>
          </div>
          <div className={activeBarClass(activeTab === "special_showtime")} />
        </button>

        <button
          onClick={() => setActiveTab("ticket_price")}
          className={tabClass(activeTab === "ticket_price")}
        >
          <Ticket className="h-5 w-5" />
          <span className="text-sm font-extrabold tracking-wide lg:text-lg">
            BẢNG GIÁ VÉ
          </span>
          <div className={activeBarClass(activeTab === "ticket_price")} />
        </button>
      </div>
    </div>
  );
}
