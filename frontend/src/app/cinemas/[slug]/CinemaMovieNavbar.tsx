"use client";

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

export default function CinemaMovieNavbar({
  activeTab,
  setActiveTab,
}: Props) {
  const tabs: { id: MovieTab; label: string }[] = [
    { id: "now_showing", label: "PHIM ĐANG CHIẾU" },
    { id: "coming_soon", label: "PHIM SẮP CHIẾU" },
    { id: "special_showtime", label: "SUẤT CHIẾU ĐẶC BIỆT" },
    { id: "ticket_price", label: "BẢNG GIÁ VÉ" },
  ];

  return (
    <div className="border-b border-white/10 bg-[#0B1528] mt-8">
      <div className="flex justify-center mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap justify-center md:justify-start gap-10 md:gap-20">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-4 px-2 text-sm md:text-base font-extrabold uppercase transition-colors duration-200 focus:outline-none ${
                  isActive
                    ? "text-yellow-400"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-yellow-400 rounded-t" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
