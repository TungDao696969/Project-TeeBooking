import { Card } from "@/components/ui/card";
import { Booking } from "@/types/booking-detail";

type Props = {
  booking: Booking;
};

export default function BookingHeader({ booking }: Props) {
  return (
    <Card className="p-4 flex justify-between">
      <div>
        <h1 className="text-xl font-bold">Booking #{booking.bookingCode}</h1>

        <p className="text-sm text-gray-500">
          Status: {booking.status} | Payment: {booking.paymentStatus}
        </p>
      </div>

      <div className="text-right">
        <p className="font-bold text-lg">
          {booking.finalAmount.toLocaleString()} VND
        </p>
      </div>
    </Card>
  );
}
