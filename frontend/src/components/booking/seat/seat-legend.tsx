export default function SeatLegend() {
  return (
    <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80 bg-[#16192b]/40 py-4 px-8 rounded-xl border border-white/5 max-w-fit mx-auto">
      <div className="flex items-center gap-2">
        <div className="h-4 w-6 rounded bg-white" />
        <span className="text-xs font-semibold">Standard</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-6 rounded bg-[#ffd700]" />
        <span className="text-xs font-semibold">VIP</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-6 rounded bg-[#ff69b4]" />
        <span className="text-xs font-semibold">Couple</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-6 rounded bg-[#e2001a] shadow-[0_0_8px_rgba(226,0,26,0.6)]" />
        <span className="text-xs font-semibold">Đang chọn</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-6 rounded border border-white/20 bg-[#2a2d3e] opacity-40" />
        <span className="text-xs font-semibold">Đã bán</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-6 rounded border-2 border-[#10b981] bg-transparent" />
        <span className="text-xs font-semibold">Đang giữ</span>
      </div>
    </div>
  );
}
