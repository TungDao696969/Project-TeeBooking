import { BookingCombo } from "@/types/booking-detail";

type Props = {
  combos: BookingCombo[];
};

export default function BookingCombos({ combos }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4">
      <p className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-zinc-500 mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#E8B84B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
        Combo đã chọn
      </p>

      <div className="flex flex-col gap-2">
        {combos.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between px-3 py-3 rounded-xl border border-zinc-700"
            style={{ background: "#1E1E24" }}
          >
            <div className="flex items-center gap-3">
              {/* Icon box */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border"
                style={{ background: "#1A1208", borderColor: "#3A2E0E" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E8B84B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  {c.combo.name}
                </p>
                <p className="text-xs text-zinc-500">× {c.quantity} phần</p>
              </div>
            </div>
            <p className="text-sm font-semibold" style={{ color: "#E8B84B" }}>
              {c.totalPrice.toLocaleString()} VND
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
