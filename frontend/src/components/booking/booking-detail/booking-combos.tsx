import { Card } from "@/components/ui/card";
import { BookingCombo } from "@/types/booking-detail";
type Props = {
  combos: BookingCombo[];
};
export default function BookingCombos({ combos }: Props) {
  return (
    <Card className="p-4 space-y-2">
      <h3 className="font-semibold">Combo</h3>

      {combos.map((c) => (
        <div key={c.id} className="flex justify-between text-sm">
          <span>
            {c.combo.name} x{c.quantity}
          </span>
          <span>{c.totalPrice.toLocaleString()} VND</span>
        </div>
      ))}
    </Card>
  );
}
