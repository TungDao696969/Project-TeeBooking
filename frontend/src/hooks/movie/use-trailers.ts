"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export interface Trailer {
  id: string;
  movieId: string;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string | null;
  type: "teaser" | "official" | "final" | "clip" | "behind_the_scenes";
  isActive: boolean;
  sortOrder?: number;
}

interface TrailersResponse {
  success: boolean;
  data: Trailer[];
}

export const getTrailersByMovie = async (movieId: string): Promise<Trailer[]> => {
  const response = await api.get<TrailersResponse>(`/trailer/${movieId}`);
  return response.data.data;
};

export const useTrailers = (movieId: string | null | undefined) => {
  return useQuery({
    queryKey: ["trailers", movieId],
    queryFn: () => getTrailersByMovie(movieId!),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 5,
  });
};
