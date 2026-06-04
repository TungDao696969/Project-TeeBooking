"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createRoomSchema,
  CreateRoomFormData,
} from "@/schemas/admin/room.schema";
import { useCreateRoom } from "@/hooks/admin/room/use-create-room";
import { useCinemas } from "@/hooks/admin/cinema/use-cinemas";
import type { Cinema } from "@/types/admin/cinema.type";

const inputClass = `
  w-full h-10 px-3 rounded-md text-sm text-white
  bg-[#111111] border border-[#2a2a2a]
  placeholder:text-[#444]
  focus:outline-none focus:border-[#e50000] focus:ring-1 focus:ring-[#e50000]/40
  transition-all duration-150
`;

const labelClass =
  "text-[11px] font-semibold tracking-[0.1em] uppercase text-[#888] mb-1.5 block";

const selectTriggerClass = `
  w-full h-10 px-3 rounded-md text-sm text-white
  bg-[#111111] border border-[#2a2a2a]
  focus:outline-none focus:border-[#e50000] focus:ring-1 focus:ring-[#e50000]/40
  transition-all duration-150
  data-[placeholder]:text-[#444]
`;

const roomTypes = [
  { value: "2D", label: "2D", desc: "Tiêu chuẩn" },
  { value: "3D", label: "3D", desc: "Không gian" },
  { value: "IMAX", label: "IMAX", desc: "Siêu màn hình" },
];

export default function RoomForm() {
  const createMutation = useCreateRoom();
  const { data: cinemas } = useCinemas();
  const cinemaOptions: Cinema[] = cinemas?.data ?? [];

  const form = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      cinemaId: "",
      roomName: "",
      roomType: "2D",
      totalSeats: 50,
      screenType: "Standard",
      soundSystem: "Dolby Atmos",
    },
  });

  const onSubmit = (values: CreateRoomFormData) => {
    createMutation.mutate(values);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#0d0d0d] shadow-[0_0_40px_rgba(0,0,0,0.6)]">
      {/* Header */}
      <div className="px-5 py-3 bg-gradient-to-r from-[#1a0000] to-[#0d0d0d] border-b border-[#3a1010] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#e50000]" />
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#e50000]">
          Tạo phòng chiếu mới
        </span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 space-y-5">
          {/* Cinema */}
          <FormField
            control={form.control}
            name="cinemaId"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className={labelClass}>Rạp chiếu</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Chọn rạp chiếu" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] border border-[#2a2a2a] text-white rounded-md">
                    {cinemaOptions.map((cinema) => (
                      <SelectItem
                        key={cinema.id}
                        value={cinema.id}
                        className="text-sm text-[#ccc] hover:bg-[#1a0000] hover:text-white focus:bg-[#1a0000] focus:text-white cursor-pointer"
                      >
                        {cinema.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[#e50000] text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* Room Name + Total Seats */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="roomName"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className={labelClass}>Tên phòng</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phòng 1"
                      {...field}
                      className={inputClass}
                    />
                  </FormControl>
                  <FormMessage className="text-[#e50000] text-xs mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalSeats"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className={labelClass}>Tổng số ghế</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value ?? ""}
                      onChange={(event) => {
                        const value = event.target.value;
                        const parsed = value === "" ? undefined : Number(value);

                        field.onChange(
                          Number.isNaN(parsed) ? undefined : parsed,
                        );
                      }}
                      className={inputClass}
                    />
                  </FormControl>
                  <FormMessage className="text-[#e50000] text-xs mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Room Type — button group */}
          <FormField
            control={form.control}
            name="roomType"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className={labelClass}>Loại phòng</FormLabel>
                <div className="grid grid-cols-3 gap-2">
                  {roomTypes.map(({ value, label, desc }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => field.onChange(value)}
                      className={`
                        flex flex-col items-center gap-0.5 py-3 rounded-md border text-xs font-medium
                        transition-all duration-150
                        ${
                          field.value === value
                            ? "bg-[#1a0000] border-[#e50000] text-[#e50000] shadow-[0_0_10px_rgba(229,0,0,0.2)]"
                            : "bg-[#111] border-[#2a2a2a] text-[#666] hover:border-[#444] hover:text-[#999]"
                        }
                      `}
                    >
                      <span className="text-base font-bold">{label}</span>
                      <span
                        className={`text-[10px] ${field.value === value ? "text-[#e50000]/70" : "text-[#444]"}`}
                      >
                        {desc}
                      </span>
                    </button>
                  ))}
                </div>
                <FormMessage className="text-[#e50000] text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* Screen Type + Sound System */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="screenType"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className={labelClass}>Loại màn hình</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Standard"
                      {...field}
                      className={inputClass}
                    />
                  </FormControl>
                  <FormMessage className="text-[#e50000] text-xs mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="soundSystem"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className={labelClass}>
                    Hệ thống âm thanh
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Dolby Atmos"
                      {...field}
                      className={inputClass}
                    />
                  </FormControl>
                  <FormMessage className="text-[#e50000] text-xs mt-1" />
                </FormItem>
              )}
            />
          </div>

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
              "Tạo phòng chiếu"
            )}
          </button>
        </form>
      </Form>
    </div>
  );
}
