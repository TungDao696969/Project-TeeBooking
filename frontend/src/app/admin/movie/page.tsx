"use client";

import MovieTable from "@/components/admin/movie/movie-table";

import { useMovies } from "@/hooks/admin/movie/use-movie";

import { useMovieStore } from "@/store/admin/movie.store";
import { useState } from "react";

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMovies(page);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Movie Management</h1>

      <MovieTable
        movies={data?.data ?? []}
        pagination={data?.pagination}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
}
