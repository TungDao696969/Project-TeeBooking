"use client";

import { CreditCard, Wallet } from "lucide-react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function PaymentMethods({ value, onChange }: Props) {
  return (
    <RadioGroup value={value} onValueChange={onChange}>
      <div className="space-y-4">
        <Label
          htmlFor="vnpay"
          className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-yellow-400"
        >
          <div className="flex items-center gap-4">
            <CreditCard className="h-5 w-5 text-yellow-400" />

            <div>
              <p className="font-semibold text-white">VNPay</p>

              <p className="text-sm text-white/50">ATM / Visa / QR Banking</p>
            </div>
          </div>

          <RadioGroupItem value="vnpay" id="vnpay" />
        </Label>

        <Label
          htmlFor="momo"
          className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-pink-400"
        >
          <div className="flex items-center gap-4">
            <Wallet className="h-5 w-5 text-pink-400" />

            <div>
              <p className="font-semibold text-white">MoMo</p>

              <p className="text-sm text-white/50">Ví điện tử MoMo</p>
            </div>
          </div>

          <RadioGroupItem value="momo" id="momo" />
        </Label>
      </div>
    </RadioGroup>
  );
}
