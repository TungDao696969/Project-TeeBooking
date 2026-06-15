"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Play, ExternalLink, Film } from "lucide-react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Trailer {
  id: string;
  movieId: string;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string | null;
  type: string;
  isActive: boolean;
  sortOrder?: number;
}

interface Props {
  movieId: string;
  movieTitle: string;
}

const TYPES = [
  { value: "official", label: "Official Trailer" },
  { value: "teaser", label: "Teaser" },
  { value: "final", label: "Final Trailer" },
  { value: "clip", label: "Clip" },
  { value: "behind_the_scenes", label: "Hậu trường" },
];

/** Extract YouTube video ID from any URL */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]+)/,
    /youtu\.be\/([A-Za-z0-9_-]+)/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]+)/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]+)/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m?.[1]) return m[1];
  }
  return null;
}

function YouTubeThumbnail({ url }: { url: string }) {
  const id = extractYouTubeId(url);
  if (!id) return <div className="w-full h-full bg-zinc-800 flex items-center justify-center"><Film className="w-8 h-8 text-zinc-600" /></div>;
  return (
    <img
      src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
      alt="thumbnail"
      className="w-full h-full object-cover"
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
    />
  );
}

export default function MovieTrailerManager({ movieId, movieTitle }: Props) {
  const qc = useQueryClient();
  const [form, setForm] = useState({ title: "", videoUrl: "", type: "official" });
  const [error, setError] = useState("");

  const { data: trailers = [], isLoading } = useQuery<Trailer[]>({
    queryKey: ["trailers-admin", movieId],
    queryFn: async () => {
      const res = await api.get(`/trailer/${movieId}`);
      return res.data.data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (data: { title: string; videoUrl: string; type: string }) => {
      const res = await api.post("/trailer", { ...data, movieId });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trailers-admin", movieId] });
      qc.invalidateQueries({ queryKey: ["trailers", movieId] });
      setForm({ title: "", videoUrl: "", type: "official" });
      setError("");
    },
    onError: (e: any) => {
      setError(e?.response?.data?.message || "Lỗi khi thêm trailer");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/trailer/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trailers-admin", movieId] });
      qc.invalidateQueries({ queryKey: ["trailers", movieId] });
    },
  });

  const handleAdd = () => {
    setError("");
    if (!form.title.trim()) { setError("Vui lòng nhập tên trailer"); return; }
    if (!form.videoUrl.trim()) { setError("Vui lòng nhập URL video"); return; }

    const ytId = extractYouTubeId(form.videoUrl);
    if (!ytId && !form.videoUrl.match(/\.(mp4|webm|ogg)$/i)) {
      setError("URL không hợp lệ. Vui lòng nhập URL YouTube (VD: https://www.youtube.com/watch?v=XXXXX) hoặc file video trực tiếp.");
      return;
    }

    addMutation.mutate(form);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase text-red-500 mb-3">
        Quản lý Trailer
        <span className="flex-1 h-px bg-yellow-500/15" />
      </div>

      {/* Add form */}
      <div className="rounded-xl border border-yellow-500/20 bg-[#0e0e16] p-4 space-y-3">
        <p className="text-xs font-semibold text-white/70 mb-2">Thêm Trailer Mới</p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            placeholder="Tên trailer (VD: Trailer chính thức)"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            className="bg-zinc-900 border-zinc-700 text-white text-sm"
          />

          <Select value={form.type} onValueChange={(v) => setForm((p) => ({ ...p, type: v }))}>
            <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Input
          placeholder="URL YouTube (VD: https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
          value={form.videoUrl}
          onChange={(e) => setForm((p) => ({ ...p, videoUrl: e.target.value }))}
          className="bg-zinc-900 border-zinc-700 text-white text-sm font-mono"
        />

        {error && (
          <p className="text-red-400 text-xs">{error}</p>
        )}

        <div className="flex items-center gap-2">
          <Button
            onClick={handleAdd}
            disabled={addMutation.isPending}
            className="bg-yellow-400 text-black font-bold hover:bg-yellow-300 text-xs"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            {addMutation.isPending ? "Đang thêm..." : "Thêm Trailer"}
          </Button>

          <p className="text-zinc-500 text-[11px]">
            Hỗ trợ: youtube.com/watch?v=... · youtu.be/... · file .mp4/.webm
          </p>
        </div>
      </div>

      {/* Trailer list */}
      {isLoading ? (
        <div className="text-zinc-500 text-sm text-center py-4">Đang tải...</div>
      ) : trailers.length === 0 ? (
        <div className="text-center py-8 text-zinc-500 text-sm border border-dashed border-zinc-700 rounded-xl">
          <Film className="w-8 h-8 mx-auto mb-2 opacity-40" />
          Chưa có trailer. Hãy thêm trailer bên trên.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {trailers.map((t) => (
            <div
              key={t.id}
              className="flex gap-3 items-start rounded-xl border border-zinc-700/50 bg-[#0e0e16] p-3"
            >
              {/* Thumbnail */}
              <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
                <YouTubeThumbnail url={t.videoUrl} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{t.title}</p>
                <p className="text-[11px] text-yellow-400 mb-1">
                  {TYPES.find((tp) => tp.value === t.type)?.label ?? t.type}
                </p>
                <p className="text-[10px] text-zinc-500 truncate font-mono">{t.videoUrl}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <a
                  href={t.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-7 h-7 rounded-md bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 transition"
                  title="Xem video"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => deleteMutation.mutate(t.id)}
                  disabled={deleteMutation.isPending}
                  className="flex items-center justify-center w-7 h-7 rounded-md bg-red-600/20 text-red-400 hover:bg-red-600/40 transition disabled:opacity-40"
                  title="Xóa trailer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
