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
        },
        select: {
          id: true,
          title: true,
          slug: true,
          posterUrl: true,
          durationMinutes: true,
          ageRating: true,
          status: true,
        },
        take: 8,
        orderBy: {
          releaseDate: "desc",
        },
      }),

      prisma.movie.findMany({
        where: {
          status: "coming_soon",
        },
        select: {
          id: true,
          title: true,
          slug: true,
          posterUrl: true,
          releaseDate: true,
          status: true,
        },
        take: 8,
        orderBy: {
          releaseDate: "asc",
        },
      }),

      prisma.cinema.findMany({
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

  return {
    banners,
    nowShowing,
    comingSoon,
    cinemas,
    promotions,
    blogs,
  };
};
