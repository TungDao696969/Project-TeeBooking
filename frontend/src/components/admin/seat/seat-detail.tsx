"use client";

import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { SeatDetail } from "@/types/admin/seat.type";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  seat: SeatDetail;
}

const seatTypeConfig: Record<
  string,
  { label: string; color: string; dot: string }
> = {
  standard: { label: "Standard", color: "text-[#1a9e5c]", dot: "bg-[#1a9e5c]" },
  vip: { label: "VIP", color: "text-violet-400", dot: "bg-violet-400" },
  couple: { label: "Couple", color: "text-pink-400", dot: "bg-pink-400" },
};

const statusConfig: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  available: {
    label: "Còn trống",
    bg: "bg-[#1a9e5c]/15",
    text: "text-[#1a9e5c]",
  },
  booked: { label: "Đã đặt", bg: "bg-[#e8192c]/15", text: "text-[#e8192c]" },
  locked: { label: "Đang giữ", bg: "bg-amber-400/15", text: "text-amber-400" },
};

export default function SeatDetailComponent({ seat }: Props) {
  const typeConf = seatTypeConfig[seat.seatType] ?? seatTypeConfig.standard;
  const router = useRouter();
  return (
    <div className="bg-[#0b1633] min-h-screen p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="
            border-white/10
            bg-[#0f1d40]
            text-white
            hover:bg-[#152852]
            hover:text-white
          "
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="w-1 h-6 bg-[#e8192c] rounded-full" />
        <h1 className="text-white text-lg font-semibold">Chi tiết ghế ngồi</h1>
        <span className="ml-auto text-white/30 text-sm font-mono">
          {seat.seatCode}
        </span>
      </div>

      {/* Seat hero badge */}
      <div className="bg-[#0f1d40] border border-white/10 rounded-2xl p-5 flex items-center gap-5">
        <div className="w-14 h-14 rounded-xl bg-[#e8192c]/10 border border-[#e8192c]/30 flex items-center justify-center flex-shrink-0">
          <span className={`text-lg font-bold ${typeConf.color}`}>
            {seat.seatRow}
          </span>
        </div>
        <div>
          <p className="text-white text-xl font-bold">{seat.seatCode}</p>
          <span className="inline-flex items-center gap-1.5 mt-1">
            <span className={`w-2 h-2 rounded-full ${typeConf.dot}`} />
            <span className={`text-sm font-medium ${typeConf.color}`}>
              {typeConf.label}
            </span>
          </span>
        </div>
        <div className="ml-auto text-right">
          <p className="text-white/40 text-xs mb-1">Phụ thu</p>
          <p className="text-[#e8192c] font-bold text-lg">
            {seat.extraPrice.toLocaleString()}đ
          </p>
        </div>
      </div>

      {/* Seat Information */}
      <Section title="Thông tin ghế">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Info label="Mã ghế" value={seat.seatCode} />
          <Info label="Hàng ghế" value={seat.seatRow} />
          <Info label="Số ghế" value={seat.seatNumber} />
          <Info
            label="Loại ghế"
            value={
              <span className={`flex items-center gap-1.5 ${typeConf.color}`}>
                <span className={`w-2 h-2 rounded-full ${typeConf.dot}`} />
                {typeConf.label}
              </span>
            }
          />
          <Info
            label="Phụ thu"
            value={
              <span className="text-[#e8192c] font-semibold">
                {seat.extraPrice.toLocaleString()}đ
              </span>
            }
          />
          <Info
            label="Ngày tạo"
            value={dayjs(seat.createdAt).format("DD/MM/YYYY HH:mm")}
          />
        </div>
      </Section>

      {/* Room Information */}
      <Section title="Phòng chiếu">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Info label="Tên phòng" value={seat.room.roomName} />
          <Info label="Loại phòng" value={seat.room.roomType} />
          <Info label="Màn hình" value={seat.room.screenType} />
          <Info label="Âm thanh" value={seat.room.soundSystem} />
          <Info label="Tổng ghế" value={seat.room.totalSeats} />
          <Info
            label="Trạng thái"
            value={
              seat.room.isActive ? (
                <span className="inline-flex items-center gap-1.5 text-[#1a9e5c]">
                  <span className="w-2 h-2 rounded-full bg-[#1a9e5c]" />
                  Hoạt động
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-white/40">
                  <span className="w-2 h-2 rounded-full bg-white/30" />
                  Ngừng hoạt động
                </span>
              )
            }
          />
        </div>
      </Section>

      {/* Showtime Usage */}
      <Section title="Lịch sử suất chiếu">
        {seat.showtimeSeats.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-4">
            Chưa có suất chiếu nào
          </p>
        ) : (
          <div className="space-y-2.5">
            {seat.showtimeSeats.map((item) => {
              const st = statusConfig[item.status] ?? statusConfig.available;
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[#0b1633] border border-white/10 rounded-xl px-4 py-3"
                >
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-0.5">
                      Suất chiếu
                    </p>
                    <p className="text-white text-sm font-mono">
                      {item.showtimeId}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${st.bg} ${st.text}`}
                    >
                      {st.label}
                    </span>
                    <span className="text-white font-semibold text-sm">
                      {item.finalPrice.toLocaleString()}đ
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0f1d40] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/10">
        <div className="w-1 h-4 bg-[#e8192c] rounded-full" />
        <h2 className="text-white font-semibold text-sm">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-white text-sm font-medium">{value}</p>
    </div>
  );
}
