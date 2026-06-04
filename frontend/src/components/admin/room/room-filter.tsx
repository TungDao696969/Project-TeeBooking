"use client";

import { Input } from "@/components/ui/input";
import { useRoomStore } from "@/store/admin/room.store";

export default function RoomFilter() {
  const keyword = useRoomStore((state) => state.keyword);

  const setKeyword = useRoomStore((state) => state.setKeyword);

  return (
    <Input
      placeholder="Search room..."
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      className="w-[300px]"
    />
  );
}
