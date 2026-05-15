import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";

type CreateTrailerPayload = {
  movieId: string;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  type: "teaser" | "official" | "final" | "clip" | "behind_the_scenes";
  sortOrder?: number;
};

type UpdateTrailerPayload = {
  title?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  type?: "teaser" | "official" | "final" | "clip" | "behind_the_scenes";
  isActive?: boolean;
  sortOrder?: number;
};

const cache_ttl = Number(process.env.CACHE_TTL);

const getTrailerCacheKey = (movieId: string) => `trailers:${movieId}`;

const getMovieDetailCacheKey = (movieId: string) => `movie:detail:${movieId}`;

const clearTrailerCache = async (movieId: string) => {
  await redis.del(getTrailerCacheKey(movieId));
};

const clearMovieDetailCache = async (movieId: string) => {
  await redis.del(getMovieDetailCacheKey(movieId));
};

const clearRelatedCache = async (movieId: string) => {
  await Promise.all([
    clearTrailerCache(movieId),
    clearMovieDetailCache(movieId),
  ]);
};

export const createTrailerService = async (payload: CreateTrailerPayload) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id: payload.movieId,
    },
  });

  if (!movie) {
    throw new Error("Movie not found");
  }

  const trailer = await prisma.trailer.create({
    data: {
      ...payload,
    },
  });

  await clearRelatedCache(payload.movieId);

  return {
    success: true,
    message: "Trailer created successfully",
    data: trailer,
  };
};

export const getTrailerByMovieService = async (movieId: string) => {
  const cacheKey = getTrailerCacheKey(movieId);

  const cachedTrailers = await redis.get(cacheKey);

  if (cachedTrailers) {
    return JSON.parse(cachedTrailers);
  }

  const trailers = await prisma.trailer.findMany({
    where: {
      movieId,
      isActive: true,
    },
    orderBy: [
      {
        sortOrder: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  const result = {
    success: true,
    data: trailers,
  };

  await redis.set(cacheKey, JSON.stringify(result), "EX", cache_ttl);

  return result;
};

export const getTrailerByIdService = async (id: string) => {
  const trailer = await prisma.trailer.findUnique({
    where: { id },
  });

  if (!trailer) {
    throw new Error("Trailer not found");
  }

  return {
    success: true,
    data: trailer,
  };
};

export const updateTrailerService = async (
  id: string,
  payload: UpdateTrailerPayload,
) => {
  const existingTrailer = await prisma.trailer.findUnique({
    where: { id },
  });

  if (!existingTrailer) {
    throw new Error("Trailer not found");
  }

  const updatedTrailer = await prisma.trailer.update({
    where: { id },
    data: payload,
  });

  await clearRelatedCache(existingTrailer.movieId);

  return {
    success: true,
    message: "Trailer updated successfully",
    data: updatedTrailer,
  };
};

export const deleteTrailerService = async (id: string) => {
  const existingTrailer = await prisma.trailer.findUnique({
    where: { id },
  });

  if (!existingTrailer) {
    throw new Error("Trailer not found");
  }

  await prisma.trailer.delete({
    where: { id },
  });

  await clearRelatedCache(existingTrailer.movieId);

  return {
    success: true,
    message: "Trailer deleted successfully",
  };
};
