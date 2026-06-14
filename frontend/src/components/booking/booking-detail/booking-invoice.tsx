import { Booking } from "@/types/booking-detail";

type Props = {
  booking: Booking;
  timeLeft: string;
};

export default function BookingInvoice({ booking, timeLeft }: Props) {
  const showtime = booking.showtime;

  return (
    <div className="rounded-md overflow-hidden bg-[#3d68c8] text-white">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-black uppercase">
              {showtime.movie.title}
            </h2>

            <p className="mt-3 text-yellow-300 text-lg font-semibold">
              Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="uppercase text-xl font-bold">
              Thời gian giữ vé:
            </span>

            <div className="bg-yellow-300 text-black font-black px-4 py-2 rounded">
              {timeLeft}
            </div>
          </div>
        </div>

        {/* Cinema */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold">
            {showtime.room.cinema.name}
          </h3>

          <p className="mt-2 text-sm text-white/90">
            {showtime.room.cinema.address}
          </p>
        </div>

        {/* Showtime */}
        <p className="mt-2 text-2xl font-bold">
          {new Date(showtime.showDate).toLocaleString("vi-VN")}
        </p>

        {/* Info */}
        <div className="grid grid-cols-3 gap-10 mt-12">
          <div>
            <p className="text-yellow-300 text-lg">Phòng chiếu</p>

            <p className="text-lg font-bold mt-2">{showtime.room.roomName}</p>
          </div>

          <div>
            <p className="text-yellow-300 text-lg">Số vé</p>

            <p className="text-lg font-bold mt-2">{booking.tickets.length}</p>
          </div>

          <div>
            <p className="text-yellow-300 text-lg">Loại vé</p>

            <p className="text-lg font-medium mt-2">Người lớn</p>
          </div>
        </div>

        {/* Seats */}
        <div className="grid grid-cols-2 gap-10 mt-10">
          <div>
            <p className="text-yellow-300 text-lg">Loại ghế</p>

            <p className="text-lg font-bold mt-2">Ghế Thường</p>
          </div>

          <div>
            <p className="text-yellow-300 text-lg">Số ghế</p>

            <p className="text-lg font-bold mt-2">
              {booking.tickets
                .map((t) => t.showtimeSeat.seat.seatCode)
                .join(", ")}
            </p>
          </div>
        </div>

        {/* Combo */}
        {booking.combos.length > 0 && (
          <div className="mt-10">
            <p className="text-yellow-300 text-lg font-semibold">Bắp nước</p>

            <div className="mt-2 space-y-2">
              {booking.combos.map((combo, index) => (
                <p key={index} className="text-xl">
                  {combo.quantity} {combo.combo.name}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-dashed border-white/60 mt-12 pt-8">
          <div className="flex items-center justify-between">
            <span className="text-yellow-300 text-xl font-bold">
              SỐ TIỀN CẦN THANH TOÁN
            </span>

            <span className="text-xl font-black">
              {booking.finalAmount.toLocaleString()}
              VND
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
