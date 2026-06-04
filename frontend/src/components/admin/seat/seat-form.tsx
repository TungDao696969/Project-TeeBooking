"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useRooms } from "@/hooks/admin/room/use-room";
import { useCreateSeat } from "@/hooks/admin/seat/use-create-seat";
import type { Room } from "@/types/admin/room.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createSeatSchema,
  CreateSeatFormData,
} from "@/schemas/admin/seat.schema";

const inputClass = `
  w-full h-10 px-3 rounded-md text-sm text-white
  bg-[#111111] border border-[#2a2a2a]
  placeholder:text-[#444]
  focus:outline-none focus:border-[#e50000] focus:ring-1 focus:ring-[#e50000]/40
  transition-all duration-150
  [&:not(:placeholder-shown)]:border-[#3a3a3a]
`;

const labelClass =
  "text-[11px] font-semibold tracking-[0.1em] uppercase text-[#888] mb-1.5 block";

const seatTypes = [
  { value: "standard", label: "Standard", icon: "🪑" },
  { value: "vip", label: "VIP", icon: "⭐" },
  { value: "couple", label: "Couple", icon: "💑" },
];

export default function SeatForm() {
  const { data: rooms } = useRooms();
  const createMutation = useCreateSeat();
  const roomOptions: Room[] = rooms?.data ?? [];

  const form = useForm<CreateSeatFormData>({
    resolver: zodResolver(createSeatSchema),
    defaultValues: {
      seatRow: "",
      seatNumber: 1,
      seatCode: "",
      seatType: "standard",
      roomId: "",
    },
  });

  const onSubmit = (values: CreateSeatFormData) => {
    const payload = {
      ...values,
      seatCode: values.seatCode || `${values.seatRow}${values.seatNumber}`,
    };

    console.log("Create seat payload:", payload);
    createMutation.mutate(payload);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#0d0d0d] shadow-[0_0_40px_rgba(0,0,0,0.6)]">
      {/* Header */}
      <div className="px-5 py-3 bg-linear-to-r from-[#1a0000] to-[#0d0d0d] border-b border-[#3a1010] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#e50000]" />
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#e50000]">
          Tạo ghế mới
        </span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 space-y-5">
          {/* Row + Number side by side */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="seatRow"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className={labelClass}>Hàng ghế</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="A"
                      value={field.value}
                      onChange={(event) => {
                        field.onChange(event);
                        const row = event.target.value;
                        const number = form.getValues("seatNumber");
                        if (row && typeof number === "number") {
                          form.setValue("seatCode", `${row}${number}`);
                        } else {
                          form.setValue("seatCode", "");
                        }
                      }}
                      className={inputClass}
                    />
                  </FormControl>
                  <FormMessage className="text-[#e50000] text-xs mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seatNumber"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className={labelClass}>Số ghế</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(event) => {
                        const value = event.target.value;
                        const parsed = value === "" ? undefined : Number(value);
                        field.onChange(parsed);

                        const row = form.getValues("seatRow");
                        if (
                          row &&
                          typeof parsed === "number" &&
                          !Number.isNaN(parsed)
                        ) {
                          form.setValue("seatCode", `${row}${parsed}`);
                        } else {
                          form.setValue("seatCode", "");
                        }
                      }}
                      className={inputClass}
                    />
                  </FormControl>
                  <FormMessage className="text-[#e50000] text-xs mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Seat Type — button group */}
          <FormField
            control={form.control}
            name="seatType"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className={labelClass}>Loại ghế</FormLabel>
                <div className="grid grid-cols-3 gap-2">
                  {seatTypes.map(({ value, label, icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => field.onChange(value)}
                      className={`
                        flex flex-col items-center gap-1 py-3 rounded-md border text-xs font-medium
                        transition-all duration-150
                        ${
                          field.value === value
                            ? "bg-[#1a0000] border-[#e50000] text-[#e50000] shadow-[0_0_10px_rgba(229,0,0,0.2)]"
                            : "bg-[#111] border-[#2a2a2a] text-[#666] hover:border-[#444] hover:text-[#999]"
                        }
                      `}
                    >
                      <span className="text-lg">{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>
                <FormMessage className="text-[#e50000] text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* Room */}
          <FormField
            control={form.control}
            name="seatCode"
            render={({ field }) => <input type="hidden" {...field} />}
          />

          <FormField
            control={form.control}
            name="roomId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Phòng chiếu</FormLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Chọn phòng chiếu" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="bg-[#111] border border-[#2a2a2a]">
                    {roomOptions.length ? (
                      roomOptions.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.roomName}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        Không có phòng chiếu
                      </div>
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Divider */}
          <div className="border-t border-[#1e1e1e]" />

          {/* Submit */}
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="
              w-full h-10 rounded-md text-sm font-semibold tracking-wide
              bg-[#e50000] text-white
              hover:bg-[#cc0000] active:scale-[0.98]
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-150
              shadow-[0_0_16px_rgba(229,0,0,0.3)]
            "
          >
            {createMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  />
                </svg>
                Đang tạo...
              </span>
            ) : (
              "Tạo ghế"
            )}
          </button>
        </form>
      </Form>
    </div>
  );
}
