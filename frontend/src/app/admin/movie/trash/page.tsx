"use client";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import TrashMovieTable from "@/components/admin/movie/trash-movie-table";

import { useTrashMovies } from "@/hooks/admin/movie/use-trash-movies";

export default function TrashMoviePage() {
  const { data, isLoading, error } = useTrashMovies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Failed to load trash movies</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Trash Movies</h1>

          <p className="text-sm text-muted-foreground">
            Movies that have been soft deleted
          </p>
        </div>

        <Link href="/admin/movie">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <TrashMovieTable movies={data?.data || []} />
    </div>
  );
}
