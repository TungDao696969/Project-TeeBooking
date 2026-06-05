"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { seatSchema, SeatFormData } from "@/schemas/admin/seat.schema";
import { useRooms } from "@/hooks/admin/room/use-room";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateSeat } from "@/hooks/admin/seat/use-create-seat";
import { toast } from "sonner";

interface Props {
  roomId?: string;
}

const fieldClass =
  "bg-[#0b1633] border border-white/10 text-white placeholder:text-white/30 focus:border-[#e8192c] focus:ring-[#e8192c] rounded-lg h-10";

const labelClass = "text-white/60 text-sm font-medium mb-1.5";

export default function SeatForm({ roomId }: Props) {
  const createSeatMutation = useCreateSeat();
  const roomsQuery = useRooms(1);

  const form = useForm<SeatFormData>({
    resolver: zodResolver(seatSchema),
    defaultValues: {
      roomId: roomId ?? "",
      seatRow: "",
      seatNumber: 1,
      seatType: "standard",
      extraPrice: 0,
    },
  });

  useEffect(() => {
    if (roomId) form.setValue("roomId", roomId);
  }, [roomId, form]);

  const onSubmit = async (values: SeatFormData) => {
    try {
      await createSeatMutation.mutateAsync(values);
      toast.success("Tạo ghế thành công");
      form.reset({
        roomId: roomId ?? "",
        seatRow: "",
        seatNumber: 1,
        seatType: "standard",
        extraPrice: 0,
      });
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message ?? "Tạo ghế thất bại");
    }
  };

  return (
    <div className="bg-[#0b1633] min-h-screen p-6 flex items-start justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-[#e8192c] rounded-full" />
          <h2 className="text-white text-lg font-semibold">Thêm ghế ngồi</h2>
        </div>

        <div className="bg-[#0f1d40] border border-white/10 rounded-2xl p-6 space-y-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Room field */}
              {roomId ? (
                <>
                  <input
                    type="hidden"
                    {...form.register("roomId")}
                    value={roomId}
                  />
                  <div className="flex items-center gap-3 bg-[#0b1633] border border-white/10 rounded-lg px-4 py-3">
                    <span className="text-white/40 text-xs uppercase tracking-widest">
                      Phòng
                    </span>
                    <span className="text-white font-medium text-sm ml-auto">
                      {roomId}
                    </span>
                  </div>
                </>
              ) : (
                <FormField
                  control={form.control}
                  name="roomId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Phòng chiếu</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className={fieldClass}>
                            <SelectValue placeholder="Chọn phòng chiếu" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0f1d40] border border-white/10 text-white">
                            {roomsQuery.data?.data.map((room) => (
                              <SelectItem
                                key={room.id}
                                value={room.id}
                                className="focus:bg-[#e8192c]/20 focus:text-white"
                              >
                                {room.roomName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[#e8192c] text-xs" />
                    </FormItem>
                  )}
                />
              )}

              {/* Row + Number side by side */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="seatRow"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Hàng ghế</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="A"
                          {...field}
                          className={fieldClass}
                        />
                      </FormControl>
                      <FormMessage className="text-[#e8192c] text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seatNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Số ghế</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-[#e8192c] text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Seat type */}
              <FormField
                control={form.control}
                name="seatType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Loại ghế</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={fieldClass}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0f1d40] border border-white/10 text-white">
                        {[
                          {
                            value: "standard",
                            label: "Standard",
                            dot: "bg-[#1a9e5c]",
                          },
                          { value: "vip", label: "VIP", dot: "bg-violet-500" },
                          {
                            value: "couple",
                            label: "Couple",
                            dot: "bg-pink-500",
                          },
                        ].map(({ value, label, dot }) => (
                          <SelectItem
                            key={value}
                            value={value}
                            className="focus:bg-[#e8192c]/20 focus:text-white"
                          >
                            <span className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${dot}`} />
                              {label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[#e8192c] text-xs" />
                  </FormItem>
                )}
              />

              {/* Extra price */}
              <FormField
                control={form.control}
                name="extraPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Phụ thu (VNĐ)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className={`${fieldClass} pr-14`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-xs font-medium">
                          VNĐ
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage className="text-[#e8192c] text-xs" />
                  </FormItem>
                )}
              />

              {/* Divider */}
              <div className="border-t border-white/10" />

              {/* Submit */}
              <Button
                type="submit"
                disabled={createSeatMutation.isPending}
                className="w-full h-11 bg-[#e8192c] hover:bg-[#c9151f] active:bg-[#a81019] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createSeatMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeOpacity="0.3"
                      />
                      <path
                        d="M12 2a10 10 0 0 1 10 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Đang tạo...
                  </span>
                ) : (
                  "Tạo ghế"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
