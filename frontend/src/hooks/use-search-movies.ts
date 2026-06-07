"use client";

import { useQuery } from "@tanstack/react-query";

import {
  searchMovies,
  SearchMovieParams,
  getMovieSuggestions,
} from "@/services/admin/movie.service";

export const useSearchMovies = (params: SearchMovieParams) => {
  return useQuery({
    queryKey: ["movies-search", params],

    queryFn: () => searchMovies(params),

    staleTime: 1000 * 60 * 5,
  });
};

export const useMovieSuggestions = (q: string) => {
  return useQuery({
    queryKey: ["movie-suggestions", q],
    queryFn: () => getMovieSuggestions(q),
    enabled: q.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });
};
