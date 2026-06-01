"use client";

import { useParams } from "next/navigation";

import MovieUpdateForm from "@/components/admin/movie/movie-update-form";

export default function EditMoviePage() {
  const params = useParams();

  return <MovieUpdateForm movieId={params.id as string} />;
}
