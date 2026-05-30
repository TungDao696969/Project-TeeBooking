import { Card } from "@/components/ui/card";
import { Payment } from "@/types/booking.type";

type Props = {
  payments: Payment[];
};

export default function BookingPayment({ payments }: Props) {
  return (
    <Card className="p-4">
      <h3 className="font-semibold">Thanh toán</h3>

      {payments.map((p) => (
        <div key={p.id} className="text-sm mt-2">
          <p>
            {p.paymentMethod} - {p.status}
          </p>

          {p.paidAt && (
            <p className="text-gray-500">
              {new Date(p.paidAt).toLocaleString()}
            </p>
          )}
        </div>
      ))}
    </Card>
  );
}
