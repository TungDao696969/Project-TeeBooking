"use client";

import { Input } from "@/components/ui/input";
import { useSeatStore } from "@/store/admin/seat.store";

export default function SeatFilter() {
  const { keyword, setKeyword } = useSeatStore();

  return (
    <Input
      placeholder="Search seat..."
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
}
