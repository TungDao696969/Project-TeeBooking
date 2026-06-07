"use client";

import Link from "next/link";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  Search,
  Clock,
  Archive,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { Movie } from "@/types/movie.type";
import { cn } from "@/lib/utils";
import DeleteMovieDialog from "./movie-delete-dialog";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Props {
  movies: Movie[];
  pagination: Pagination;
  page: number;
  onPageChange: (page: number) => void;
}

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  showing: {
    label: "Active",
    className: "bg-green-950 text-green-400 border-green-600",
  },

  upcoming: {
    label: "Coming",
    className: "bg-yellow-950 text-yellow-400 border-yellow-600",
  },

  ended: {
    label: "Ended",
    className: "bg-red-950 text-red-400 border-red-600",
  },
};

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-zinc-900 text-zinc-400 border-zinc-700",
  };

  return (
    <Badge
      className={cn(
        "rounded-full border px-4 py-1 text-xs font-medium flex items-center gap-2",
        config.className,
      )}
    >
      <span className="w-2 h-2 rounded-full bg-current" />
      {config.label}
    </Badge>
  );
}

export default function MovieTable({
  movies,
  pagination,
  page,
  onPageChange,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-red-900/40 bg-black overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h2
              className="text-4xl tracking-widest text-[#E8001D]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              TEE
              <span className="text-white">STAR</span>
            </h2>

            <div className="flex items-center gap-2 mt-1 text-white">
              <span className="w-[3px] h-6 bg-[#E8001D]" />
              <span>Quản lý phim</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />

              <Input
                placeholder="Tìm kiếm phim..."
                className="
                  w-[240px]
                  bg-transparent
                  border-zinc-600
                  text-white
                  pl-10
                  h-11
                "
              />
            </div>

            <Link href="/admin/movie/trash">
              <Button
                variant="outline"
                className="
                  border-zinc-500
                  text-white
                  bg-transparent
                  hover:bg-zinc-900
                "
              >
                <Archive className="w-4 h-4" />
                Thùng rác
              </Button>
            </Link>

            <Link href="/admin/movie/create">
              <Button className="bg-[#E8001D] hover:bg-red-700 text-white">
                <Plus className="w-4 h-4" />
                Thêm phim
              </Button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-[#350000] hover:bg-[#350000] border-b border-red-950">
              <TableHead className="text-red-300">POSTER</TableHead>

              <TableHead className="text-red-300">TÊN PHIM</TableHead>

              <TableHead className="text-red-300">TRẠNG THÁI</TableHead>

              <TableHead className="text-red-300">QUỐC GIA</TableHead>

              <TableHead className="text-red-300">THỜI LƯỢNG</TableHead>

              <TableHead className="text-red-300">THAO TÁC</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {movies.map((movie) => (
              <TableRow
                key={movie.id}
                className="
                  border-zinc-800
                  hover:bg-zinc-950
                  transition-colors
                "
              >
                {/* Poster */}
                <TableCell>
                  {movie.posterUrl ? (
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="
                        h-20
                        w-14
                        rounded-md
                        object-cover
                      "
                    />
                  ) : (
                    <div className="h-20 w-14 bg-zinc-800 rounded-md flex items-center justify-center text-xs text-zinc-500">
                      N/A
                    </div>
                  )}
                </TableCell>

                {/* Name */}
                <TableCell>
                  <div>
                    <p className="font-semibold text-white">{movie.title}</p>

                    {movie.genres?.length > 0 && (
                      <p className="text-xs text-zinc-400 mt-1">
                        {movie.genres.map((genre) => genre.name).join(", ")}
                      </p>
                    )}
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <StatusBadge status={movie.status} />
                </TableCell>

                {/* Country */}
                <TableCell className="text-white">{movie.country}</TableCell>

                {/* Duration */}
                <TableCell>
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4" />
                    {movie.durationMinutes} phút
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/movie/${movie.id}`}>
                      <Button
                        size="icon"
                        className="
                          h-9
                          w-9
                          bg-amber-500
                          hover:bg-amber-600
                          text-white
                        "
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>

                    <Link href={`/admin/movie/${movie.id}/edit`}>
                      <Button
                        size="icon"
                        variant="outline"
                        className="
                          h-9
                          w-9
                          bg-blue-500
                          border-blue-500
                          text-white
                          hover:bg-blue-700
                        "
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>

                    <Button
                      size="icon"
                      variant="outline"
                      className="
                        h-9
                        w-9
                        border-red-600
                        text-red-600
                        hover:bg-red-600/10
                      "
                    >
                      <DeleteMovieDialog movieId={movie.id} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer */}
        <div className="relative flex items-center justify-center py-6">
          <span className="absolute left-6 text-sm text-zinc-400">
            Hiển thị {movies.length} phim
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              className="
                border-zinc-600
                text-zinc-300
                bg-transparent
              "
            >
              Trước
            </Button>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <Button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  className={
                    pageNumber === page
                      ? "bg-[#E8001D] hover:bg-red-700 text-white"
                      : "border border-zinc-600 bg-transparent text-zinc-300 hover:bg-zinc-900"
                  }
                >
                  {pageNumber}
                </Button>
              ),
            )}

            <Button
              variant="outline"
              disabled={page === pagination.totalPages}
              onClick={() => onPageChange(page + 1)}
              className="
                border-zinc-600
                text-zinc-300
                bg-transparent
              "
            >
              Sau
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
