"use client";

import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPages: number;
  total?: number;
  currentCount?: number;

  onPageChange: (page: number) => void;
}

export default function ShowtimePagination({
  page,
  totalPages,
  total,
  currentCount,
  onPageChange,
}: Props) {
  return (
    <div className="relative border-t border-zinc-800 px-6 py-4">
      {/* Left */}
      <span className="absolute left-6 text-xs text-zinc-500">
        Hiển thị {currentCount ?? 0}
        {typeof total === "number" && ` / ${total}`} suất chiếu
      </span>

      {/* Center Pagination */}
      <div className="mx-auto flex max-w-full items-center justify-center gap-2 overflow-x-auto pb-1">
        <Button
          size="sm"
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="
            border-zinc-700
            bg-zinc-900
            text-zinc-300
            hover:bg-red-950
            hover:text-white
          "
        >
          Trước
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <Button
              key={pageNumber}
              size="sm"
              variant={pageNumber === page ? "default" : "outline"}
              onClick={() => onPageChange(pageNumber)}
              className={
                pageNumber === page
                  ? "bg-[#E8001D] hover:bg-[#c4001a]"
                  : `
                  border-zinc-700
                  bg-zinc-900
                  text-zinc-300
                  hover:bg-red-950
                  hover:text-white
                `
              }
            >
              {pageNumber}
            </Button>
          ),
        )}

        <Button
          size="sm"
          variant="outline"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="
            border-zinc-700
            bg-zinc-900
            text-zinc-300
            hover:bg-red-950
            hover:text-white
          "
        >
          Sau
        </Button>
      </div>
    </div>
  );
}
