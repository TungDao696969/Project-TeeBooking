import UpdateRoomForm from "@/components/admin/room/update-room-form";

import { getRoomDetail } from "@/services/admin/room.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function UpdateRoomPage({ params }: Props) {
  const { id } = await params;

  const room = await getRoomDetail(id);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Cập nhật phòng chiếu</h1>

        <p className="text-sm text-zinc-500">Chỉnh sửa thông tin phòng chiếu</p>
      </div>

      <UpdateRoomForm room={room} />
    </div>
  );
}
