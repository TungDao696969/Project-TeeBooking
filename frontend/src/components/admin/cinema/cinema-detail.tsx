"use client";

import { MapPin, Phone, Clock, Building2, Calendar, Star } from "lucide-react";

import { useCinemaDetail } from "@/hooks/cinema/use-cinema-detail";
import { useRouter } from "next/navigation";
interface Props {
  cinemaId: string;
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className="mt-0.5 text-[#e50914] shrink-0">{icon}</div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.4px] text-[#555] mb-0.5">
          {label}
        </p>
        <p className="text-sm font-medium text-[#f0f0f0]">{value || "—"}</p>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl overflow-hidden">
      <div className="px-6 py-3.5 border-b border-[#222] flex items-center gap-2">
        <div className="w-1 h-4 bg-[#e50914] rounded-sm" />
        <h2
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          className="text-sm tracking-[1.5px] uppercase text-[#e50914]"
        >
          {title}
        </h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

export function CinemaDetail({ cinemaId }: Props) {
  const { data, isLoading } = useCinemaDetail(cinemaId);
  const router = useRouter();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;500;600;700&display=swap');
      `}</style>

      <div
        className="min-h-screen bg-[#0d0d0d]"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        {/* Header */}
        <div className="bg-[#111] border-b-[3px] border-[#e50914] px-8 py-4 flex items-center gap-3">
          <span
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            className="text-3xl text-[#e50914] tracking-[2px] leading-none"
          >
            CINE<span className="text-white">STAR</span>
          </span>
          <Star size={16} className="text-[#e50914] fill-[#e50914]" />
          <div className="ml-auto text-xs text-[#666] tracking-wide">
            Quản trị /{" "}
            <span className="text-[#e50914] font-semibold">
              Chi tiết rạp chiếu phim
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-4xl mx-auto px-8 py-8 space-y-5">
          {isLoading ? (
            <div className="flex items-center gap-3 text-[#666] py-12 justify-center">
              <div className="w-5 h-5 border-2 border-[#333] border-t-[#e50914] rounded-full animate-spin" />
              <span className="text-sm">Đang tải...</span>
            </div>
          ) : !data ? (
            <div className="flex items-center gap-2 text-[#e50914] py-12 justify-center text-sm">
              Không tìm thấy rạp
            </div>
          ) : (
            <>
              {/* Hero card */}
              <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl px-6 py-5 flex items-center justify-between">
                <div>
                  <h1
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    className="text-3xl text-white tracking-[2px]"
                  >
                    {data.name}
                  </h1>
                  <p className="text-xs text-[#555] mt-0.5 tracking-wide">
                    {data.slug}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e50914]/10 border border-[#e50914]/30 rounded-full text-[#e50914] text-xs font-semibold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] inline-block" />
                  Hoạt động
                </span>
              </div>

              {/* Info */}
              <SectionCard title="Thông tin rạp">
                <div className="grid md:grid-cols-2 gap-5">
                  <InfoItem
                    icon={<Building2 size={15} />}
                    label="Tên rạp"
                    value={data.name}
                  />
                  <InfoItem
                    icon={<Phone size={15} />}
                    label="Hotline"
                    value={data.hotline}
                  />
                  <InfoItem
                    icon={<MapPin size={15} />}
                    label="Tỉnh / Thành phố"
                    value={data.province}
                  />
                  <InfoItem
                    icon={<MapPin size={15} />}
                    label="Quận / Huyện"
                    value={data.district}
                  />
                  <InfoItem
                    icon={<MapPin size={15} />}
                    label="Phường / Xã"
                    value={data.ward}
                  />
                  <InfoItem
                    icon={<MapPin size={15} />}
                    label="Địa chỉ"
                    value={data.address}
                  />
                  <InfoItem
                    icon={<Clock size={15} />}
                    label="Giờ mở cửa"
                    value={data.openingHours}
                  />
                  <InfoItem
                    icon={<Calendar size={15} />}
                    label="Ngày tạo"
                    value={new Date(data.createdAt).toLocaleString("vi-VN")}
                  />
                </div>
              </SectionCard>

              {/* Coordinates */}
              <SectionCard title="Tọa độ bản đồ">
                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-[#0d0d0d] border border-[#2e2e2e] rounded-lg px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.4px] text-[#555] mb-1">
                      Vĩ độ (Latitude)
                    </p>
                    <p className="text-sm font-semibold text-[#f0f0f0] font-mono">
                      {data.latitude}
                    </p>
                  </div>
                  <div className="bg-[#0d0d0d] border border-[#2e2e2e] rounded-lg px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.4px] text-[#555] mb-1">
                      Kinh độ (Longitude)
                    </p>
                    <p className="text-sm font-semibold text-[#f0f0f0] font-mono">
                      {data.longitude}
                    </p>
                  </div>
                </div>
              </SectionCard>

              {/* Actions */}
              <div className="px-6 py-4 bg-[#111] border-t border-[#222] flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex items-center gap-2 px-5 py-2 bg-transparent border border-[#333] text-[#888] text-sm font-semibold rounded-md tracking-wide transition-colors hover:bg-[#1e1e1e] hover:text-[#ccc]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Hủy
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
