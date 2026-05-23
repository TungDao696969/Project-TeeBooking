import { CinemaDetail } from "@/types/cinema.type";

interface Props {
  cinema: CinemaDetail;
}

export default function CinemaInfo({ cinema }: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#101935] p-8">
      <h2 className="text-3xl font-bold">Thông tin rạp</h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <div>
            <p className="text-sm text-white/60">Tên rạp</p>

            <p className="mt-1 text-lg font-semibold">{cinema.name}</p>
          </div>

          <div>
            <p className="text-sm text-white/60">Hotline</p>

            <p className="mt-1 text-lg font-semibold">{cinema.hotline}</p>
          </div>

          <div>
            <p className="text-sm text-white/60">Giờ mở cửa</p>

            <p className="mt-1 text-lg font-semibold">{cinema.openingHours}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-white/60">Địa chỉ</p>

          <p className="mt-1 text-lg font-semibold leading-8">
            {cinema.address}, {cinema.ward}, {cinema.district},{" "}
            {cinema.province}
          </p>
        </div>
      </div>
    </div>
  );
}
