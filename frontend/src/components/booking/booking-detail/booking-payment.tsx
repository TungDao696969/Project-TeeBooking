import { Payment } from "@/types/booking.type";
import { JSX } from "react";
type Props = {
  payments: Payment[];
};

const methodIcon: Record<string, JSX.Element> = {
  VNPAY: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#60A5FA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  MOMO: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F472B6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
};

const defaultPayIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#60A5FA"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const statusStyle: Record<string, string> = {
  SUCCESS: "bg-emerald-950 text-emerald-400 border border-emerald-800",
  PENDING: "bg-yellow-950 text-yellow-400 border border-yellow-800",
  FAILED: "bg-red-950 text-red-400 border border-red-800",
  REFUNDED: "bg-purple-950 text-purple-400 border border-purple-800",
};

const statusLabel: Record<string, string> = {
  SUCCESS: "Thành công",
  PENDING: "Đang xử lý",
  FAILED: "Thất bại",
  REFUNDED: "Đã hoàn tiền",
};

export default function BookingPayment({ payments }: Props) {
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
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        Thanh toán
      </p>

      <div className="flex flex-col gap-2">
        {payments.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between px-3 py-3 rounded-xl border border-zinc-700"
            style={{ background: "#1E1E24" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-900"
                style={{ background: "#0D1E2A" }}
              >
                {methodIcon[p.paymentMethod] ?? defaultPayIcon}
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  {p.paymentMethod}
                </p>
                {p.paidAt && (
                  <p className="text-xs text-zinc-500">
                    {new Date(p.paidAt).toLocaleString("vi-VN")}
                  </p>
                )}
              </div>
            </div>
            <span
              className={`text-[11px] font-semibold px-3 py-1 rounded-md ${statusStyle[p.status] ?? "bg-zinc-800 text-zinc-400 border border-zinc-700"}`}
            >
              {statusLabel[p.status] ?? p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
