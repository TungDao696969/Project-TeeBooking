import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SeatType = "standard" | "vip" | "couple";

type Props = {
  rows: string[];
  seatsPerRow: number;
  seatType?: SeatType;
};

const SEAT_STYLES: Record<SeatType, string> = {
  standard:
    "bg-blue-900/60 text-blue-300 border border-blue-700/50 hover:bg-blue-800/80 hover:border-blue-500",
  vip: "bg-yellow-900/60 text-yellow-300 border border-yellow-700/50 hover:bg-yellow-800/80 hover:border-yellow-400",
  couple:
    "bg-pink-900/60 text-pink-300 border border-pink-700/50 hover:bg-pink-800/80 hover:border-pink-400",
};

const LEGEND = [
  {
    label: "Standard",
    swatch: "bg-blue-900/60 border border-blue-700/50",
    text: "text-blue-300",
  },
  {
    label: "VIP",
    swatch: "bg-yellow-900/60 border border-yellow-700/50",
    text: "text-yellow-300",
  },
  {
    label: "Couple",
    swatch: "bg-pink-900/60 border border-pink-700/50",
    text: "text-pink-300",
  },
  {
    label: "Đã đặt",
    swatch: "bg-zinc-700/60 border border-zinc-600",
    text: "text-zinc-400",
  },
  {
    label: "Đang chọn",
    swatch: "bg-[#E31E24]/80 border border-[#E31E24]",
    text: "text-red-300",
  },
];

export const SeatPreview = ({
  rows,
  seatsPerRow,
  seatType = "standard",
}: Props) => {
  const seatStyle = SEAT_STYLES[seatType];

  return (
    <Card className="overflow-hidden border border-white/10 bg-[#1a1a1a] shadow-lg shadow-black/40">
      <CardHeader className="border-b border-white/10 pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-[#E31E24] flex items-center gap-2">
          <span className="inline-flex h-1.5 w-6 rounded-full bg-[#E31E24]" />
          Xem trước sơ đồ
        </CardTitle>
        <span className="text-[11px] text-zinc-500">
          {rows.length} hàng · {seatsPerRow} ghế/hàng
        </span>
      </CardHeader>

      <CardContent className="p-5">
        {/* Screen */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="relative w-3/4">
            <div className="rounded-t-[40%] border-t-2 border-x-2 border-white/20 py-2 text-center text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-400 bg-white/5">
              Màn hình
            </div>
          </div>
          {/* Projection glow */}
          <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Seat grid */}
        <div className="overflow-x-auto pb-2">
          <div className="inline-block min-w-full">
            <div className="space-y-1.5">
              {rows.map((row) => (
                <div
                  key={row}
                  className="flex items-center gap-2 justify-center"
                >
                  <span className="w-5 shrink-0 text-center text-[11px] font-bold text-zinc-500">
                    {row}
                  </span>

                  <div className="flex gap-1">
                    {Array.from({ length: seatsPerRow }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex h-7 w-7 cursor-default items-center justify-center rounded text-[10px] font-medium transition-colors ${seatStyle}`}
                        title={`${row}${i + 1}`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  <span className="w-5 shrink-0 text-center text-[11px] font-bold text-zinc-500">
                    {row}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-4">
          {LEGEND.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`h-4 w-4 rounded ${item.swatch}`} />
              <span className={`text-[11px] ${item.text}`}>{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
