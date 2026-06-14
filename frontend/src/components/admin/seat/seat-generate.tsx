"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  generateSeatSchema,
  GenerateSeatFormData,
} from "@/schemas/admin/seat.schema";
import { generateRows } from "@/lib/generate-rows";
import { useGenerateSeats } from "@/hooks/admin/seat/use-generate-seats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SeatPreview } from "./seat-preview";
import { SeatType } from "@/types/seat.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



export default function GenerateSeatForm({ roomId }: { roomId: string }) {
  const mutation = useGenerateSeats();

  const form = useForm<GenerateSeatFormData>({
    resolver: zodResolver(generateSeatSchema),
    defaultValues: {
      roomId,
      rowCount: 8,
      seatsPerRow: 12,
    },
  });

  const rowCount = form.watch("rowCount");
  const seatsPerRow = form.watch("seatsPerRow");

  const rows = useMemo(() => generateRows(rowCount), [rowCount]);

  const onSubmit = (values: GenerateSeatFormData) => {
    mutation.mutate({
      roomId: values.roomId,
      rows,
      seatsPerRow: values.seatsPerRow,
    });
  };

  return (
    <div className="space-y-5">
      {/* Config card */}
      <Card className="border border-white/10 bg-[#1a1a1a] shadow-lg shadow-black/40">
        <CardHeader className="pb-3 border-b border-white/10">
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-[#E31E24] flex items-center gap-2">
            <span className="inline-flex h-1.5 w-6 rounded-full bg-[#E31E24]" />
            Cấu hình ghế ngồi
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5 space-y-5">
          {/* Row + Seats per row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Số hàng
              </Label>
              <Input
                type="number"
                min={1}
                max={26}
                className="h-10 rounded-lg border border-white/10 bg-[#111] text-sm text-white placeholder:text-zinc-600
                           focus-visible:ring-1 focus-visible:ring-[#E31E24]/60 focus-visible:border-[#E31E24]/50"
                {...form.register("rowCount", { valueAsNumber: true })}
              />
              <p className="text-[11px] text-zinc-600">
                Tối đa 26 hàng (A – Z)
              </p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Ghế / hàng
              </Label>
              <Input
                type="number"
                min={1}
                max={30}
                className="h-10 rounded-lg border border-white/10 bg-[#111] text-sm text-white placeholder:text-zinc-600
                           focus-visible:ring-1 focus-visible:ring-[#E31E24]/60 focus-visible:border-[#E31E24]/50"
                {...form.register("seatsPerRow", { valueAsNumber: true })}
              />
              <p className="text-[11px] text-zinc-600">Tối đa 30 ghế / hàng</p>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-blue-500/10 p-3">
            <p className="text-xs text-blue-400 font-medium">
              * Lưu ý: Toàn bộ ghế sẽ được khởi tạo mặc định với loại Standard.
              Sau khi tạo xong, bạn có thể vào mục Cấu hình loại ghế để gán các hàng VIP/Couple theo ý muốn.
            </p>
          </div>

          {/* Summary chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-zinc-300">
              {rowCount} hàng × {seatsPerRow} ghế
            </span>
            <span className="rounded-full border border-[#E31E24]/30 bg-[#E31E24]/10 px-3 py-1 text-[11px] font-semibold text-[#E31E24]">
              {rowCount * seatsPerRow} ghế tổng
            </span>
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-blue-400">
              Mặc định: Standard
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <SeatPreview rows={rows} seatsPerRow={seatsPerRow} seatType="standard" />

      {/* CTA */}
      <Button
        onClick={form.handleSubmit(onSubmit)}
        disabled={mutation.isPending}
        className="w-full h-11 rounded-xl bg-[#E31E24] text-sm font-bold uppercase tracking-widest text-white
                   hover:bg-[#c41a1f] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed
                   shadow-lg shadow-[#E31E24]/20 transition-all"
      >
        {mutation.isPending ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Đang tạo...
          </span>
        ) : (
          "Tạo sơ đồ ghế"
        )}
      </Button>
    </div>
  );
}
