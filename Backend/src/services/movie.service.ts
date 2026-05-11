import { Prisma } from "../generated/prisma/client";
import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import { generateSlug } from "../utils/slug";

const cache_ttl = Number(process.env.CACHE_TTL);

export const createMovieService = async (data: any) => {
  const slug = generateSlug(data.title);

  const movie = await prisma.movie.create({
    data: {
      ...data,
      slug,
      releaseDate: new Date(data.releaseDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });

  await redis.del("movies:list");

  return movie;
};

export const getMoviesService = async (
  page = 1,
  limit = 10,
  search?: string,
) => {
  const cacheKey = `movies:${page}:${limit}:${search}`;

  const cached = await redis.get(cacheKey);

  if (cached) return JSON.parse(cached);

  const skip = (page - 1) * limit;

  const where: Prisma.MovieWhereInput = search
    ? {
        OR: [
          {
            title: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }
    : {};

  const [movies, total] = await Promise.all([
    prisma.movie.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        genres: true,
      },
    }),
    prisma.movie.count({ where }),
  ]);

  const result = {
    data: movies,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };

  await redis.set(cacheKey, JSON.stringify(result), "EX", cache_ttl);

  return result;
};

export const getMovieByIdService = async (id: string) => {
  return prisma.movie.findUnique({
    where: { id },
    include: {
      genres: true,
      casts: true,
      showtimes: true,
      reviews: true,
    },
  });
};

export const updateMovieService = async (id: string, data: any) => {
  if (data.title) {
    data.slug = generateSlug(data.title);
  }

  const movie = await prisma.movie.update({
    where: { id },
    data,
  });

  await redis.flushall();

  return movie;
};

export const deleteMovieService = async (id: string) => {
  await prisma.movie.delete({
    where: { id },
  });

  await redis.flushall();

  return true;
};
