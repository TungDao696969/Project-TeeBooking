"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  updateSeatTypeSchema,
  UpdateSeatTypeFormData,
} from "@/schemas/admin/seat.schema";
import { useUpdateSeatType } from "@/hooks/admin/seat/use-update-seat-type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SeatType } from "@/types/seat.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SEAT_TYPES = [
  { value: "standard", label: "Standard", dot: "bg-blue-400" },
  { value: "vip", label: "VIP", dot: "bg-yellow-400" },
  { value: "couple", label: "Couple", dot: "bg-pink-400" },
];

export function SeatTypeConfig({ roomId }: { roomId: string }) {
  const mutation = useUpdateSeatType();

  const form = useForm<UpdateSeatTypeFormData>({
    resolver: zodResolver(updateSeatTypeSchema),
    defaultValues: {
      roomId,
      startRow: "",
      endRow: "",
      seatType: "vip",
    },
  });

  const onSubmit = (values: UpdateSeatTypeFormData) => {
    mutation.mutate(values, {
      onSuccess: () => {
        form.reset({
          roomId,
          startRow: "",
          endRow: "",
          seatType: values.seatType,
        });
      },
    });
  };

  return (
    <Card className="border border-white/10 bg-[#1a1a1a] shadow-lg shadow-black/40">
      <CardHeader className="pb-3 border-b border-white/10">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-[#E31E24] flex items-center gap-2">
          <span className="inline-flex h-1.5 w-6 rounded-full bg-[#E31E24]" />
          Cấu hình loại ghế
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Từ hàng
              </Label>
              <Input
                placeholder="Ví dụ: G"
                className="h-10 uppercase rounded-lg border border-white/10 bg-[#111] text-sm text-white placeholder:text-zinc-600
                           focus-visible:ring-1 focus-visible:ring-[#E31E24]/60 focus-visible:border-[#E31E24]/50"
                {...form.register("startRow", {
                  setValueAs: (v) => v.toUpperCase(),
                })}
              />
              {form.formState.errors.startRow && (
                <p className="text-[11px] text-red-500">
                  {form.formState.errors.startRow.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Đến hàng
              </Label>
              <Input
                placeholder="Ví dụ: G"
                className="h-10 uppercase rounded-lg border border-white/10 bg-[#111] text-sm text-white placeholder:text-zinc-600
                           focus-visible:ring-1 focus-visible:ring-[#E31E24]/60 focus-visible:border-[#E31E24]/50"
                {...form.register("endRow", {
                  setValueAs: (v) => v.toUpperCase(),
                })}
              />
              {form.formState.errors.endRow && (
                <p className="text-[11px] text-red-500">
                  {form.formState.errors.endRow.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Loại ghế cần gán
            </Label>
            <Select
              value={form.watch("seatType")}
              onValueChange={(value) =>
                form.setValue("seatType", value as SeatType)
              }
            >
              <SelectTrigger
                className="h-10 rounded-lg border border-white/10 bg-[#111] text-sm text-white
                           focus:ring-1 focus:ring-[#E31E24]/60 data-[placeholder]:text-zinc-500"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border border-white/10 bg-[#1a1a1a] text-white">
                {SEAT_TYPES.map((t) => (
                  <SelectItem
                    key={t.value}
                    value={t.value}
                    className="focus:bg-white/10 focus:text-white"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${t.dot}`}
                      />
                      {t.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-11 mt-2 rounded-xl bg-blue-600 text-sm font-bold uppercase tracking-widest text-white
                       hover:bg-blue-700 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed
                       shadow-lg shadow-blue-600/20 transition-all"
          >
            {mutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Đang lưu...
              </span>
            ) : (
              "Lưu cấu hình"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
