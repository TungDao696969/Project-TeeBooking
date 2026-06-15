import { prisma } from "../../utils/prisma";

export const getHomeService = async () => {
  const [banners, nowShowing, comingSoon, cinemas, promotions, blogs] =
    await Promise.all([
      prisma.banner.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),

      prisma.movie.findMany({
        where: {
          status: "now_showing",
          deletedAt: null,
        },
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
        },
        take: 8,
        orderBy: {
          releaseDate: "desc",
        },
      }),

      prisma.movie.findMany({
        where: {
          status: "coming_soon",
          deletedAt: null,
        },
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
        },
        take: 8,
        orderBy: {
          releaseDate: "asc",
        },
      }),

      prisma.cinema.findMany({
        where: {
          deletedAt: null,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          address: true,
        },
        take: 6,
      }),

      prisma.promotion.findMany({
        where: {
          isActive: true,
        },
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true,
          type: true,
          discountValue: true,
          minOrderValue: true,
          maxDiscount: true,
          startDate: true,
          endDate: true,
        },
        take: 6,
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.blogPost.findMany({
        where: {
          publishedAt: {
            not: null,
          },
        },
        select: {
          id: true,
          title: true,
          slug: true,
          thumbnailUrl: true,
          createdAt: true,
        },
        take: 4,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

  const formatMovie = (movie: any) => ({
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
  });

  return {
    banners,
    nowShowing: nowShowing.map(formatMovie),
    comingSoon: comingSoon.map(formatMovie),
    cinemas,
    promotions,
    blogs,
  };
};
