"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateRoomSchema,
  UpdateRoomFormData,
} from "@/schemas/admin/room.schema";
import { RoomDetail } from "@/types/admin/room.type";
import { useUpdateRoom } from "@/hooks/admin/room/use-update-room";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DoorOpen,
  Tv,
  Volume2,
  Armchair,
  Hash,
  Check,
  Clapperboard,
} from "lucide-react";

interface Props {
  room: RoomDetail;
}

export default function UpdateRoomForm({ room }: Props) {
  const { mutate, isPending } = useUpdateRoom();

  const form = useForm<UpdateRoomFormData>({
    resolver: zodResolver(updateRoomSchema),
    defaultValues: {
      roomName: "",
      roomType: "",
      screenType: "",
      soundSystem: "",
      totalSeats: 1,
    },
  });

  useEffect(() => {
    if (room) {
      form.reset({
        roomName: room.roomName,
        roomType: room.roomType,
        screenType: room.screenType,
        soundSystem: room.soundSystem,
        totalSeats: room.totalSeats,
      });
    }
  }, [room, form]);

  const onSubmit = (data: UpdateRoomFormData) => {
    mutate({ id: room.id, payload: data });
  };

  return (
    <div className="max-w-lg mx-auto rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl font-sans">
      {/* Header */}
      <div className="bg-red-600 px-7 py-5 flex items-center gap-3">
        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shrink-0">
          <Clapperboard className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <p
            className="font-black text-white text-xl tracking-widest uppercase leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Cập nhật phòng chiếu
          </p>
          <p className="text-[11px] text-red-200 tracking-[0.15em] uppercase mt-0.5">
            Cinestar Admin · Quản lý phòng
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-7 py-6 space-y-5">
        {/* Room ID badge */}
        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5">
          <Hash className="w-3.5 h-3.5 text-red-500 shrink-0" />
          <span className="text-xs text-neutral-500">Mã phòng:</span>
          <span className="text-xs text-neutral-300 font-medium ml-0.5">
            {room?.id ?? "—"}
          </span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Tên phòng */}
            <FormField
              control={form.control}
              name="roomName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
                    Tên phòng
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DoorOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                      <Input
                        placeholder="VD: Phòng 1 — IMAX"
                        className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus-visible:ring-red-600 focus-visible:border-red-600 h-11"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Màn hình + Âm thanh */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="roomType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
                      Loại phòng
                    </FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Tv className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <Input
                          placeholder="2D / IMAX / 3D"
                          className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus-visible:ring-red-600 focus-visible:border-red-600 h-11"
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <p className="text-[11px] text-neutral-600 mt-1">
                      IMAX, 2D, 3D, 4DX...
                    </p>

                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="screenType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
                      Loại màn hình
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Tv className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <Input
                          placeholder="IMAX / 2D / 3D"
                          className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus-visible:ring-red-600 focus-visible:border-red-600 h-11"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <p className="text-[11px] text-neutral-600 mt-1">
                      IMAX, IMAX Laser
                    </p>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="soundSystem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
                      Âm thanh
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Volume2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <Input
                          placeholder="Dolby Atmos"
                          className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus-visible:ring-red-600 focus-visible:border-red-600 h-11"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <p className="text-[11px] text-neutral-600 mt-1">
                      Dolby, DTS, Auro...
                    </p>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Số ghế */}
            <FormField
              control={form.control}
              name="totalSeats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
                    Tổng số ghế
                  </FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Armchair className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />

                      <Input
                        type="number"
                        min={1}
                        className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus-visible:ring-red-600 focus-visible:border-red-600 h-11 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </div>
                  </FormControl>

                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="border-t border-neutral-800 pt-5">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-black tracking-widest uppercase text-base transition-all rounded-lg"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "18px",
                }}
              >
                <Check className="w-4 h-4 mr-2" />
                {isPending ? "Đang cập nhật..." : "Cập nhật phòng chiếu"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
