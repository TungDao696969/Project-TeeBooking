"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  total?: number;
  limit?: number;
  onPageChange: (page: number) => void;
}

// ── Tạo danh sách page + ellipsis ─────────────────────────────
function getPageItems(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (current > 3) {
    pages.push("...");
  }

  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  ) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  pages.push(total);

  return pages;
}

export default function Pagination({
  page,
  totalPages,
  total = 0,
  limit = 10,
  onPageChange,
}: Props) {
  const items = getPageItems(page, totalPages);

  return (
    <div className="border-t border-[#1e1e1e] bg-[#0a0a0a]">
      <div className="flex items-center justify-between px-5 py-3">
        {/* Info */}
        <span className="text-[11px] tracking-wide text-[#555]">
          <span className="text-[#888]">
            {(page - 1) * limit + 1}–{Math.min(page * limit, total)}
          </span>{" "}
          / {total} mục
        </span>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          {/* Prev */}
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="
              flex items-center gap-1 px-3 h-8 rounded-md text-xs font-medium
              border border-[#2a2a2a] text-[#888]
              transition-all duration-150
              hover:border-[#e50000]
              hover:text-[#e50000]
              hover:bg-[#1a0000]
              disabled:opacity-30
              disabled:cursor-not-allowed
              disabled:hover:border-[#2a2a2a]
              disabled:hover:text-[#888]
              disabled:hover:bg-transparent
            "
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Trước
          </button>

          {/* Pages */}
          {items.map((item, index) =>
            item === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="
                  w-8 h-8 flex items-center
                  justify-center text-[#444]
                  text-xs
                "
              >
                ···
              </span>
            ) : item === page ? (
              <button
                key={item}
                className="
                  w-8 h-8 rounded-md text-xs font-bold
                  bg-[#e50000]
                  text-white
                  border border-[#e50000]
                  shadow-[0_0_12px_rgba(229,0,0,0.35)]
                "
              >
                {item}
              </button>
            ) : (
              <button
                key={item}
                onClick={() => onPageChange(item)}
                className="
                  w-8 h-8 rounded-md text-xs
                  border border-[#2a2a2a]
                  text-[#888]
                  hover:border-[#e50000]
                  hover:text-[#e50000]
                  hover:bg-[#1a0000]
                  transition-all duration-150
                "
              >
                {item}
              </button>
            ),
          )}

          {/* Next */}
          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="
              flex items-center gap-1 px-3 h-8 rounded-md text-xs font-medium
              border border-[#2a2a2a] text-[#888]
              transition-all duration-150
              hover:border-[#e50000]
              hover:text-[#e50000]
              hover:bg-[#1a0000]
              disabled:opacity-30
              disabled:cursor-not-allowed
              disabled:hover:border-[#2a2a2a]
              disabled:hover:text-[#888]
              disabled:hover:bg-transparent
            "
          >
            Sau
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
