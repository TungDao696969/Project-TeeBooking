"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, Trash2, Plus, Search, Clock } from "lucide-react";
import { Movie } from "@/types/movie.type";
import { cn } from "@/lib/utils";
import Link from "next/link";
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

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  showing: {
    label: "Đang chiếu",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  upcoming: {
    label: "Sắp chiếu",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  ended: {
    label: "Đã kết thúc",
    className: "bg-gray-100 text-gray-500 border-gray-200",
  },
};

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-gray-100 text-gray-500 border-gray-200",
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium rounded-full px-2.5 py-0.5 gap-1.5",
        config.className,
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-bold tracking-widest text-[#E8001D]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TEE<span className="text-foreground text-white">STAR</span>
          </h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
            <span className="inline-block w-0.5 h-4 bg-[#E8001D] rounded-full" />
            Quản lý phim
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm phim..."
              className="pl-8 h-8 text-sm w-44"
            />
          </div>
          <Link href="/admin/movie/create">
            <Button
              size="sm"
              className="h-8 bg-[#E8001D] text-white hover:bg-[#c4001a]"
            >
              <Plus className="h-3.5 w-3.5" />
              Thêm phim
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#E8001D] hover:bg-[#E8001D]">
              {[
                "Poster",
                "Tên phim",
                "Trạng thái",
                "Quốc gia",
                "Thời lượng",
                "Thao tác",
              ].map((h) => (
                <TableHead
                  key={h}
                  className="text-white text-[11px] font-medium uppercase tracking-widest"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {movies.map((movie) => (
              <TableRow
                key={movie.id}
                className="hover:bg-muted/40 transition-colors"
              >
                <TableCell>
                  {movie.posterUrl ? (
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="h-16 w-11 rounded object-cover"
                    />
                  ) : (
                    <div className="h-16 w-11 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
                      N/A
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  <p className="font-medium text-sm leading-snug">
                    {movie.title}
                  </p>
                  {movie.genres && movie.genres.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {movie.genres.map((genre) => genre.name).join(", ")}
                    </p>
                  )}
                </TableCell>

                <TableCell>
                  <StatusBadge status={movie.status} />
                </TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {movie.country}
                </TableCell>

                <TableCell>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {movie.durationMinutes} phút
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 hover:text-[#E8001D] hover:border-[#E8001D]"
                    >
                      <Link href={`/admin/movie/${movie.id}`}>
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 hover:text-[#E8001D] hover:border-[#E8001D]"
                    >
                      <Link href={`/admin/movie/${movie.id}/edit`}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 hover:text-destructive hover:border-destructive"
                    >
                      <DeleteMovieDialog movieId={movie.id} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="relative flex items-center justify-center">
        {/* Left */}
        <span className="absolute left-0 text-xs text-muted-foreground">
          Hiển thị {movies.length} / {pagination.total} phim
        </span>

        {/* Center Pagination */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            Trước
          </Button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <Button
                key={pageNumber}
                size="sm"
                variant={pageNumber === page ? "default" : "outline"}
                onClick={() => onPageChange(pageNumber)}
                className={
                  pageNumber === page ? "bg-[#E8001D] hover:bg-[#c4001a]" : ""
                }
              >
                {pageNumber}
              </Button>
            ),
          )}

          <Button
            size="sm"
            variant="outline"
            disabled={page === pagination.totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
