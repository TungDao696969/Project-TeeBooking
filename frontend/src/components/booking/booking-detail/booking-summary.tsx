import { Card } from "@/components/ui/card";
import { BookingSummaryType } from "@/types/booking-detail";

type Props = {
  booking: BookingSummaryType;
};

export default function BookingSummary({ booking }: Props) {
  return (
    <Card className="p-4 space-y-2">
      <h3 className="font-bold">Tổng kết</h3>

      <div className="flex justify-between">
        <span>Ticket</span>
        <span>{booking.totalTicketPrice.toLocaleString()}</span>
      </div>

      <div className="flex justify-between">
        <span>Combo</span>
        <span>{booking.totalComboPrice.toLocaleString()}</span>
      </div>

      <div className="border-t pt-2 flex justify-between font-bold">
        <span>Total</span>
        <span>{booking.finalAmount.toLocaleString()}</span>
      </div>
    </Card>
  );
}
