import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import { moviesListInput } from "../validations/movieList.validation";

export const getMoviesListService = async (query: moviesListInput) => {
  const page = Math.max(parseInt(query.page as string) || 1, 1);

  const limit = Math.min(
    Math.max(parseInt(query.limit as string) || 12, 1),
    50,
  );

  const skip = (page - 1) * limit;

  const search = query.search || "";

  const genre = query.genre;
  const status = query.status;
  const sortBy = query.sortBy || "releaseDate";
  const order = query.order || "desc";

  const cacheKey = `movies:list:${JSON.stringify(query)}`;

  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  //   const whereClause: any = {
  //     AND: [
  //       search
  //         ? {
  //             OR: [
  //               { title: { contains: search, mode: "insensitive" } },
  //               { originalTitle: { contains: search, mode: "insensitive" } },
  //               { description: { contains: search, mode: "insensitive" } },
  //             ],
  //           }
  //         : {},
  //       status ? { status } : {},
  //       genre ? { genres: { some: { genre: { slug: genre } } } } : {},
  //     ],
  //   };
  const conditions = [];

  if (search) {
    conditions.push({
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { originalTitle: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    });
  }

  if (status) {
    conditions.push({ status });
  }

  if (genre) {
    conditions.push({
      genres: {
        some: {
          genre: {
            slug: genre,
          },
        },
      },
    });
  }

  const whereClause: any = conditions.length > 0 ? { AND: conditions } : {};

  const [movies, total] = await Promise.all([
    prisma.movie.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { [sortBy]: order },
      include: {
        genres: { include: { genre: true } },
        reviews: { select: { rating: true } },
      },
    }),
    prisma.movie.count({ where: whereClause }),
  ]);

  const formattedMovies = movies.map((movie) => {
    const averageRating =
      movie.reviews.length > 0
        ? movie.reviews.reduce(
            (sum: number, r: { rating: number }) => sum + r.rating,
            0,
          ) / movie.reviews.length
        : 0;
    return {
      id: movie.id,
      title: movie.title,
      slug: movie.slug,
      originalTitle: movie.originalTitle,
      description: movie.description,
      durationMinutes: movie.durationMinutes,
      releaseDate: movie.releaseDate,
      ageRating: movie.ageRating,
      language: movie.language,
      subtitle: movie.subtitle,
      trailerUrl: movie.trailerUrl,
      posterUrl: movie.posterUrl,
      bannerUrl: movie.bannerUrl,
      status: movie.status,
      country: movie.country,
      producer: movie.producer,
      genres: movie.genres.map((g: any) => g.genre.name),
      averageRating: Number(averageRating.toFixed(1)),
    };
  });

  const result = {
    success: true,
    data: formattedMovies,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
  await redis.set(cacheKey, JSON.stringify(result), "EX", 300);

  return result;
};
