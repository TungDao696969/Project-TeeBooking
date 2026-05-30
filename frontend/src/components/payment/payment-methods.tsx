"use client";

import { CreditCard, Wallet } from "lucide-react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type PaymentMethod = "vnpay" | "momo";

interface Props {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

export default function PaymentMethods({ value, onChange }: Props) {
  return (
    <RadioGroup value={value} onValueChange={onChange}>
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-yellow-400">
          <Label
            htmlFor="vnpay"
            className="flex flex-1 cursor-pointer items-center gap-4"
          >
            <CreditCard className="h-5 w-5 text-yellow-400" />

            <div>
              <p className="font-semibold text-white">Nhập thông tin & OTP</p>

              <p className="text-sm text-white/50">
                Thanh toán qua thẻ/ATM, xác thực OTP ngân hàng
              </p>
            </div>
          </Label>

          <RadioGroupItem value="vnpay" id="vnpay" />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-pink-400">
          <Label
            htmlFor="momo"
            className="flex flex-1 cursor-pointer items-center gap-4"
          >
            <Wallet className="h-5 w-5 text-pink-400" />

            <div>
              <p className="font-semibold text-white">Quét mã QR</p>

              <p className="text-sm text-white/50">
                Mở app MoMo và quét mã QR để thanh toán
              </p>
            </div>
          </Label>

          <RadioGroupItem value="momo" id="momo" />
        </div>
      </div>
    </RadioGroup>
  );
}
