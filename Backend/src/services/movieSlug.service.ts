import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";

export const getMovieDetailService = async (slug: string) => {
  const cacheKey = `movie:detail:${slug}`;

  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const movie = await prisma.movie.findUnique({
    where: {
      slug,
    },
    include: {
      genres: {
        include: {
          genre: true,
        },
      },

      casts: {
        include: {
          person: true,
        },
      },

      reviews: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              avatarUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      },
    },
  });

  if (!movie) {
    throw new Error("Movie not found");
  }

  const averageRating =
    movie.reviews.length > 0
      ? movie.reviews.reduce((sum, review) => sum + review.rating, 0) /
        movie.reviews.length
      : 0;

  const result = {
    success: true,

    data: {
      movie: {
        id: movie.id,
        title: movie.title,
        slug: movie.slug,
        originalTitle: movie.originalTitle,
        description: movie.description,
        durationMinutes: movie.durationMinutes,
        releaseDate: movie.releaseDate,
        endDate: movie.endDate,
        ageRating: movie.ageRating,
        language: movie.language,
        subtitle: movie.subtitle,
        trailerUrl: movie.trailerUrl,
        posterUrl: movie.posterUrl,
        bannerUrl: movie.bannerUrl,
        status: movie.status,
        country: movie.country,
        producer: movie.producer,
      },

      genres: movie.genres.map((genre) => ({
        id: genre.genre.id,
        name: genre.genre.name,
        slug: genre.genre.slug,
      })),

      casts: movie.casts.map((cast) => ({
        id: cast.person.id,
        fullName: cast.person.fullName,
        avatarUrl: cast.person.avatarUrl,
        nationality: cast.person.nationality,
        roleType: cast.roleType,
        characterName: cast.characterName,
      })),

      ratings: {
        averageRating: Number(averageRating.toFixed(1)),
        totalReviews: movie.reviews.length,
      },

      reviews: movie.reviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,

        user: {
          id: review.user.id,
          fullName: review.user.fullName,
          avatarUrl: review.user.avatarUrl,
        },
      })),
    },
  };

  await redis.set(cacheKey, JSON.stringify(result), "EX", 300);

  return result;
};
