"use client";

import Image from "next/image";
import dayjs from "dayjs";
import { Clock, Film, CalendarX } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Movie } from "@/types/movie.type";
import RestoreMovieDialog from "./restore-movie-dialog";

interface Props {
  movies: Movie[];
}

export default function TrashMovieTable({ movies }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#1f1f1f] bg-[#0d0d0d]">
      {/* Header bar */}
      <div className="flex items-center gap-2.5 border-b border-[#1f1f1f] px-5 py-4">
        {/* Film strip dots */}
        <div className="flex gap-1 mr-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c8102e] opacity-70" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#c8102e] opacity-70" />
        </div>
        <Film className="h-[18px] w-[18px] text-[#c8102e]" />
        <h2 className="font-['Bebas_Neue',sans-serif] text-xl tracking-[2px] text-[#f0f0f0]">
          Thùng Rác Phim
        </h2>
        <span className="rounded border border-[rgba(200,16,46,0.25)] bg-[rgba(200,16,46,0.12)] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#c8102e]">
          {movies.length} phim
        </span>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#1f1f1f] hover:bg-transparent">
            <TableHead className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#444]">
              Poster
            </TableHead>
            <TableHead className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#444]">
              Tên phim
            </TableHead>
            <TableHead className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#444]">
              Thời lượng
            </TableHead>
            <TableHead className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#444]">
              Ngày xóa
            </TableHead>
            <TableHead className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#444]">
              Hành động
            </TableHead>
            <TableHead className="px-4 py-2.5" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {movies.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={5}
                className="py-14 text-center text-[13px] tracking-wide text-[#333]"
              >
                Không có phim nào trong thùng rác
              </TableCell>
            </TableRow>
          ) : (
            movies.map((movie) => (
              <TableRow
                key={movie.id}
                className="border-b border-[#161616] transition-colors hover:bg-[#161616]"
              >
                {/* Poster */}
                <TableCell className="px-4 py-3">
                  <div className="h-[60px] w-[42px] overflow-hidden rounded border border-[#2a2a2a] bg-[#1a1a1a]">
                    <Image
                      src={movie.posterUrl || "/no-image.jpg"}
                      alt={movie.title}
                      width={42}
                      height={60}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>

                {/* Title + slug */}
                <TableCell className="px-4 py-3">
                  <p className="text-[13.5px] font-semibold text-[#f0f0f0]">
                    {movie.title}
                  </p>
                  <p className="mt-0.5 text-[11px] tracking-[0.3px] text-[#444]">
                    {movie.slug}
                  </p>
                </TableCell>

                {/* Duration */}
                <TableCell className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-[12px] text-[#666]">
                    <Clock className="h-3 w-3" />
                    {movie.duration} phút
                  </span>
                </TableCell>

                {/* Deleted At */}
                <TableCell className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-[12px] text-[#555]">
                    <CalendarX className="h-3 w-3" />
                    {dayjs(movie.deletedAt).format("DD/MM/YYYY HH:mm")}
                  </span>
                </TableCell>

                {/* Action */}
                <TableCell className="px-4 py-3">
                  <RestoreMovieDialog movieId={movie.id} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
