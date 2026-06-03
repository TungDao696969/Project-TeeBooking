"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import dayjs from "dayjs";

import {
  ShowtimeFormData,
  createShowtimeSchema,
} from "@/schemas/admin/showtime.schema";

import { useShowtimeByID } from "@/hooks/admin/showtime/use-showtime-detail";

import { useUpdateShowtime } from "@/hooks/admin/showtime/use-update-showtime";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  id: string;
}

export default function EditShowtimeForm({ id }: Props) {
  const { data } = useShowtimeByID(id);

  const updateMutation = useUpdateShowtime();

  const form = useForm<ShowtimeFormData>({
    resolver: zodResolver(createShowtimeSchema),
  });

  useEffect(() => {
    if (!data) return;
    form.reset({
      movieId: data.movie.id,
      roomId: data.room.id,
      showDate: dayjs(data.showDate).format("YYYY-MM-DD"),
      startTime: dayjs(data.startTime).format("YYYY-MM-DDTHH:mm"),
      endTime: dayjs(data.endTime).format("YYYY-MM-DDTHH:mm"),
      basePrice: data.basePrice,
      format: data.format || "2D",
      language: data.language || "English",
      subtitle: data.subtitle || "Tiếng Việt",
    });
  }, [data, form]);

  const onSubmit = (values: ShowtimeFormData) => {
    updateMutation.mutate({
      id,
      payload: {
        ...values,
        showDate: new Date(values.showDate).toISOString(),
        startTime: new Date(values.startTime).toISOString(),
        endTime: new Date(values.endTime).toISOString(),
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-[#0f0b0b] border border-[#2a1d1d] rounded-3xl p-8 shadow-2xl space-y-7 max-w-3xl mx-auto"
    >
      {" "}
      {/* Header */}{" "}
      <div className="border-b border-[#241818] pb-5">
        {" "}
        <h2 className="text-2xl font-semibold tracking-wide text-[#f5e6dc]">
          {" "}
          Chỉnh sửa suất chiếu{" "}
        </h2>{" "}
        <p className="text-xs uppercase tracking-[0.3em] text-[#7c6464] mt-2">
          {" "}
          CineStar Admin Dashboard{" "}
        </p>{" "}
      </div>{" "}
      {/* Movie & Room */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {" "}
        <div className="space-y-2">
          {" "}
          <label className="text-xs uppercase tracking-[0.25em] text-[#8a6e6e]">
            {" "}
            Movie ID{" "}
          </label>{" "}
          <Input
            {...form.register("movieId")}
            placeholder="movie_xxxxxx"
            className="h-11 bg-[#1a1313] border-[#332323] text-[#f5e6dc] placeholder:text-[#5f4a4a] focus-visible:ring-0 focus-visible:border-red-700"
          />{" "}
        </div>{" "}
        <div className="space-y-2">
          {" "}
          <label className="text-xs uppercase tracking-[0.25em] text-[#8a6e6e]">
            {" "}
            Room ID{" "}
          </label>{" "}
          <Input
            {...form.register("roomId")}
            placeholder="room_xxxxxx"
            className="h-11 bg-[#1a1313] border-[#332323] text-[#f5e6dc] placeholder:text-[#5f4a4a] focus-visible:ring-0 focus-visible:border-red-700"
          />{" "}
        </div>{" "}
      </div>{" "}
      {/* Schedule */}{" "}
      <div className="space-y-5">
        {" "}
        <div className="flex items-center gap-3">
          {" "}
          <h3 className="text-sm uppercase tracking-[0.3em] text-[#f5e6dc]">
            {" "}
            Lịch chiếu{" "}
          </h3>{" "}
          <div className="flex-1 h-px bg-[#241818]" />{" "}
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {" "}
          <div className="space-y-2">
            {" "}
            <label className="text-xs uppercase tracking-[0.25em] text-[#8a6e6e]">
              {" "}
              Ngày chiếu{" "}
            </label>{" "}
            <Input
              type="date"
              {...form.register("showDate")}
              className="h-11 bg-[#1a1313] border-[#332323] text-[#f5e6dc] focus-visible:ring-0 focus-visible:border-red-700 [color-scheme:dark]"
            />{" "}
          </div>{" "}
          <div className="space-y-2">
            {" "}
            <label className="text-xs uppercase tracking-[0.25em] text-[#8a6e6e]">
              {" "}
              Giờ bắt đầu{" "}
            </label>{" "}
            <Input
              type="datetime-local"
              {...form.register("startTime")}
              className="h-11 bg-[#1a1313] border-[#332323] text-[#f5e6dc] focus-visible:ring-0 focus-visible:border-red-700 [color-scheme:dark]"
            />{" "}
          </div>{" "}
          <div className="space-y-2">
            {" "}
            <label className="text-xs uppercase tracking-[0.25em] text-[#8a6e6e]">
              {" "}
              Giờ kết thúc{" "}
            </label>{" "}
            <Input
              type="datetime-local"
              {...form.register("endTime")}
              className="h-11 bg-[#1a1313] border-[#332323] text-[#f5e6dc] focus-visible:ring-0 focus-visible:border-red-700 [color-scheme:dark]"
            />{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Price */}{" "}
      <div className="space-y-2">
        {" "}
        <label className="text-xs uppercase tracking-[0.25em] text-[#8a6e6e]">
          {" "}
          Giá vé{" "}
        </label>{" "}
        <div className="relative">
          {" "}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 font-semibold">
            {" "}
            ₫{" "}
          </span>{" "}
          <Input
            type="number"
            {...form.register("basePrice", { valueAsNumber: true })}
            placeholder="75000"
            className="h-11 pl-7 bg-[#1a1313] border-[#332323] text-[#f5e6dc] placeholder:text-[#5f4a4a] focus-visible:ring-0 focus-visible:border-red-700"
          />{" "}
        </div>{" "}
      </div>{" "}
      {/* Submit */}{" "}
      <div className="pt-4 border-t border-[#241818] flex justify-end">
        {" "}
        <Button
          type="submit"
          disabled={updateMutation.isPending}
          className="bg-red-700 hover:bg-red-800 text-white h-11 px-7 rounded-xl tracking-wide shadow-lg shadow-red-900/20 transition-all"
        >
          {" "}
          {updateMutation.isPending
            ? "Đang cập nhật..."
            : "Cập nhật suất chiếu"}{" "}
        </Button>{" "}
      </div>{" "}
    </form>
  );
}
