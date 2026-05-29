"use client";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function VoucherForm({ value, onChange }: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="mb-4 text-lg font-semibold text-white">Mã khuyến mãi</h3>

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Nhập voucher..."
        className="border-white/10 bg-black/30 text-white"
      />
    </div>
  );
}
