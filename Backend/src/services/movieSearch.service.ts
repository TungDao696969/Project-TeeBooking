import { title } from "node:process";
import { redis } from "../utils/redis";
import { prisma } from "../utils/prisma";

type SearchParams = {
  q?: string;
  genre?: string;
  status?: string;
  minRating?: number;
  year?: number;
  sort?: string;
  page?: number;
  limit?: number;
};

const generateCacheKey = (params: SearchParams) => {
  return `movies:list:${JSON.stringify(params)}`;
};

export const searchMoviesService = async (params: SearchParams) => {
  const cacheKey = generateCacheKey(params);

  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const {
    q,
    genre,
    status,
    minRating,
    year,
    sort = "latest",
    page = 1,
    limit = 10,
  } = params;

  const skip = (page - 1) * limit;

  const where: any = {};

  if (q) {
    where.OR = [
      {
        title: {
          contains: q,
          mode: "insensitive",
        },
      },
      {
        originalTitle: {
          contains: q,
          mode: "insensitive",
        },
      },
    ];
  }
  if (status) {
    where.status = status;
  }

  if (year) {
    where.releaseDate = {
      gte: new Date(`${year}-01-01`),
      lte: new Date(`${year}-12-31`),
    };
  }

  if (genre) {
    where.genres = {
      some: {
        genre: {
          slug: genre,
        },
      },
    };
  }

  const orderByMap: Record<string, any> = {
    latest: {
      releaseDate: "desc",
    },
    oldest: {
      releaseDate: "asc",
    },
    title_asc: {
      title: "asc",
    },
    title_desc: {
      title: "desc",
    },
  };

  const [movies, total] = await Promise.all([
    prisma.movie.findMany({
      where,
      skip,
      take: limit,
      orderBy: orderByMap[sort] || {
        releaseDate: "desc",
      },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        reviews: true,
        trailers: true,
      },
    }),

    prisma.movie.count({ where }),
  ]);

  let filteredMovies = movies;

  if (minRating) {
    filteredMovies = movies.filter((movie) => {
      const avg =
        movie.reviews.reduce((sum, review) => sum + review.rating, 0) /
        (movie.reviews.length || 1);

      return avg >= minRating;
    });
  }

  if (sort === "rating_desc") {
    filteredMovies.sort((a, b) => {
      const avgA =
        a.reviews.reduce((sum, r) => sum + r.rating, 0) /
        (a.reviews.length || 1);

      const avgB =
        b.reviews.reduce((sum, r) => sum + r.rating, 0) /
        (b.reviews.length || 1);

      return avgB - avgA;
    });
  }

  if (sort === "rating_asc") {
    filteredMovies.sort((a, b) => {
      const avgA =
        a.reviews.reduce((sum, r) => sum + r.rating, 0) /
        (a.reviews.length || 1);

      const avgB =
        b.reviews.reduce((sum, r) => sum + r.rating, 0) /
        (b.reviews.length || 1);

      return avgA - avgB;
    });
  }

  const result = {
    success: true,
    data: filteredMovies.map((movie) => ({
      ...movie,
      averageRating: Number(
        (
          movie.reviews.reduce((sum, review) => sum + review.rating, 0) /
          (movie.reviews.length || 1)
        ).toFixed(1),
      ),
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };

  await redis.set(cacheKey, JSON.stringify(result), "EX", 60 * 30);

  return result;
};
