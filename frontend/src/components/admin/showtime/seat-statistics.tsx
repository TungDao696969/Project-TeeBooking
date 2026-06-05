interface Props {
  total: number;
  available: number;
  booked: number;
  locked: number;
}

const stats = [
  {
    key: "total",
    label: "Tổng ghế",
    color: "text-white",
    dot: "bg-white/40",
    bar: "bg-white/40",
  },
  {
    key: "available",
    label: "Còn trống",
    color: "text-[#1a9e5c]",
    dot: "bg-[#1a9e5c]",
    bar: "bg-[#1a9e5c]",
  },
  {
    key: "booked",
    label: "Đã đặt",
    color: "text-[#e8192c]",
    dot: "bg-[#e8192c]",
    bar: "bg-[#e8192c]",
  },
  {
    key: "locked",
    label: "Đang giữ",
    color: "text-amber-400",
    dot: "bg-amber-400",
    bar: "bg-amber-400",
  },
];

export default function SeatStatistics({
  total,
  available,
  booked,
  locked,
}: Props) {
  const values = { total, available, booked, locked };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map(({ key, label, color, dot, bar }) => {
        const value = values[key as keyof typeof values];
        const pct = total > 0 ? Math.round((value / total) * 100) : 0;

        return (
          <div
            key={key}
            className="bg-[#0b1633] border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 text-xs text-white/40 mb-1">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
              {label}
            </div>
            <div className={`text-2xl font-semibold ${color}`}>{value}</div>
            <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${bar}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
