import { prisma } from "../utils/prisma";
import { generateSlug2 } from "../utils/slug";

export const createGenreService = async (name: string) => {
  const slug = generateSlug2(name);

  const existingGenre = await prisma.genre.findUnique({
    where: { slug },
  });

  if (existingGenre) {
    throw new Error("Genre already exists");
  }

  return prisma.genre.create({
    data: {
      name,
      slug,
    },
  });
};

export const getGenresService = async (
  page: number,
  limit: number,
  search?: string,
) => {
  const skip = (page - 1) * limit;

  const whereClause = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            slug: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }
    : {};

  const [genres, total] = await Promise.all([
    prisma.genre.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.genre.count({
      where: whereClause,
    }),
  ]);

  return {
    data: genres,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getGenreByIdService = async (id: string) => {
  const genre = await prisma.genre.findUnique({
    where: { id },
    include: {
      movies: true,
    },
  });

  if (!genre) {
    throw new Error("Genre not found");
  }

  return genre;
};

export const updateGenreService = async (id: string, name: string) => {
  const slug = generateSlug2(name);

  return prisma.genre.update({
    where: { id },
    data: {
      name,
      slug,
    },
  });
};

export const deleteGenreService = async (id: string) => {
  return prisma.genre.delete({
    where: { id },
  });
};
