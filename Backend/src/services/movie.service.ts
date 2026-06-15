import { Prisma } from "../generated/prisma/client";
import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import { generateSlug } from "../utils/slug";

const CACHE_TTL = 60;
const cache_ttl = Number(process.env.CACHE_TTL) || CACHE_TTL;

const clearMovieListCache = async () => {
  const keys = await redis.keys("movies:*");

  if (keys.length > 0) {
    await redis.del(...keys);
  }
};

export const createMovieService = async (data: any) => {
  const { genreIds, directors, actors, ...movieData } = data;
  const slug = generateSlug(movieData.title);

  const movie = await prisma.$transaction(async (tx) => {
    const createdMovie = await tx.movie.create({
      data: {
        ...movieData,
        slug,
        releaseDate: new Date(movieData.releaseDate),
        endDate: movieData.endDate ? new Date(movieData.endDate) : null,
      },
    });

    if (genreIds) {
      const genreIdList = String(genreIds)
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);
      if (genreIdList.length > 0) {
        await tx.movieGenre.createMany({
          data: genreIdList.map((genreId) => ({
            movieId: createdMovie.id,
            genreId,
          })),
        });
      }
    }

    if (directors) {
      const directorNames = String(directors)
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);
      for (const name of directorNames) {
        let person = await tx.person.findFirst({
          where: { fullName: name },
        });
        if (!person) {
          person = await tx.person.create({
            data: { fullName: name },
          });
        }
        await tx.movieCast.create({
          data: {
            movieId: createdMovie.id,
            personId: person.id,
            roleType: "director",
          },
        });
      }
    }

    if (actors) {
      const actorNames = String(actors)
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);
      for (const name of actorNames) {
        let person = await tx.person.findFirst({
          where: { fullName: name },
        });
        if (!person) {
          person = await tx.person.create({
            data: { fullName: name },
          });
        }
        await tx.movieCast.create({
          data: {
            movieId: createdMovie.id,
            personId: person.id,
            roleType: "actor",
          },
        });
      }
    }

    return createdMovie;
  });

  await clearMovieListCache();

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

  const where: Prisma.MovieWhereInput = {
    deletedAt: null,

    ...(search && {
      OR: [
        {
          title: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      ],
    }),
  };

  const [movies, total] = await Promise.all([
    prisma.movie.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
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
  return prisma.movie.findFirst({
    where: {
      id,
      deletedAt: null,
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
    },
  });
};

export const updateMovieService = async (id: string, data: any) => {
  const { genreIds, directors, actors, ...movieData } = data;

  if (movieData.title) {
    movieData.slug = generateSlug(movieData.title);
  }

  if (movieData.releaseDate) {
    movieData.releaseDate = new Date(movieData.releaseDate);
  }

  if (movieData.endDate) {
    movieData.endDate = new Date(movieData.endDate);
  }

  const movie = await prisma.$transaction(async (tx) => {
    const updatedMovie = await tx.movie.update({
      where: { id },
      data: movieData,
    });

    if (genreIds !== undefined) {
      await tx.movieGenre.deleteMany({
        where: { movieId: id },
      });

      const genreIdList = String(genreIds)
        .split(",")
        .map((gid) => gid.trim())
        .filter(Boolean);
      if (genreIdList.length > 0) {
        await tx.movieGenre.createMany({
          data: genreIdList.map((genreId) => ({
            movieId: id,
            genreId,
          })),
        });
      }
    }

    if (directors !== undefined) {
      await tx.movieCast.deleteMany({
        where: { movieId: id, roleType: "director" },
      });

      const directorNames = String(directors)
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);
      for (const name of directorNames) {
        let person = await tx.person.findFirst({
          where: { fullName: name },
        });
        if (!person) {
          person = await tx.person.create({
            data: { fullName: name },
          });
        }
        await tx.movieCast.create({
          data: {
            movieId: id,
            personId: person.id,
            roleType: "director",
          },
        });
      }
    }

    if (actors !== undefined) {
      await tx.movieCast.deleteMany({
        where: { movieId: id, roleType: "actor" },
      });

      const actorNames = String(actors)
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);
      for (const name of actorNames) {
        let person = await tx.person.findFirst({
          where: { fullName: name },
        });
        if (!person) {
          person = await tx.person.create({
            data: { fullName: name },
          });
        }
        await tx.movieCast.create({
          data: {
            movieId: id,
            personId: person.id,
            roleType: "actor",
          },
        });
      }
    }

    return updatedMovie;
  });

  await clearMovieListCache();
  await redis.del(`movie:detail:${movie.slug}`);
  await redis.del(`movie:detail:${id}`);

  return movie;
};

export const deleteMovieService = async (id: string) => {
  const movie = await prisma.movie.findUnique({
    where: { id },
  });

  if (!movie) {
    throw new Error("Movie not found");
  }

  if (movie.deletedAt) {
    throw new Error("Movie already deleted");
  }

  await prisma.movie.update({
    where: { id },

    data: {
      deletedAt: new Date(),
    },
  });

  await clearMovieListCache();

  await redis.del(`movie:${id}`);

  const trashKeys = await redis.keys("movies:trash*");

  if (trashKeys.length > 0) {
    await redis.del(...trashKeys);
  }

  return true;
};

export const getMovieShowtimesService = async (slug: string) => {
  const cacheKey = `movie:${slug}:showtimes`;

  // cache
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  // find movie
  const movie = await prisma.movie.findFirst({
    where: {
      slug,
      deletedAt: null,
    },

    select: {
      id: true,
      title: true,
      slug: true,
    },
  });

  if (!movie) {
    throw new Error("Movie not found");
  }

  // get showtimes
  const showtimes = await prisma.showtime.findMany({
    where: {
      movieId: movie.id,

      isActive: true,

      deletedAt: null,

      startTime: {
        gte: new Date(),
      },
    },

    include: {
      room: {
        include: {
          cinema: {
            include: {
              city: true,
            },
          },
        },
      },
    },

    orderBy: [
      {
        showDate: "asc",
      },
      {
        startTime: "asc",
      },
    ],
  });

  // group by cinema + date
  const cinemaMap: Record<string, any> = {};

  for (const showtime of showtimes) {
    const cinema = showtime.room.cinema;

    const cinemaId = cinema.id;

    if (!cinemaMap[cinemaId]) {
      cinemaMap[cinemaId] = {
        cinema: {
          id: cinema.id,
          name: cinema.name,
          slug: cinema.slug,
          address: cinema.address,
          province: cinema.province,
          city: (cinema as any).city ? {
            id: (cinema as any).city.id,
            name: (cinema as any).city.name,
            slug: (cinema as any).city.slug,
          } : null,
        },

        dates: {},
      };
    }

    const dateKey = new Date(showtime.startTime)
      .toISOString()
      .split("T")[0] as string;

    if (!cinemaMap[cinemaId].dates[dateKey]) {
      cinemaMap[cinemaId].dates[dateKey] = {
        date: dateKey,

        showtimes: [],
      };
    }

    cinemaMap[cinemaId].dates[dateKey].showtimes.push({
      id: showtime.id,

      startTime: showtime.startTime,
      endTime: showtime.endTime,

      format: showtime.format,

      language: showtime.language,
      subtitle: showtime.subtitle,

      basePrice: showtime.basePrice,

      room: {
        id: showtime.room.id,
        name: showtime.room.roomName,
      },
    });
  }

  // transform
  const result = Object.values(cinemaMap).map((item: any) => ({
    cinema: item.cinema,

    dates: Object.values(item.dates),
  }));

  // cache redis
  await redis.set(cacheKey, JSON.stringify(result), "EX", CACHE_TTL);

  return result;
};

export const getTrashMoviesService = async () => {
  const cacheKey = "movies:trash";

  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const movies = await prisma.movie.findMany({
    where: {
      deletedAt: {
        not: null,
      },
    },

    include: {
      genres: true,
    },

    orderBy: {
      deletedAt: "desc",
    },
  });

  await redis.set(cacheKey, JSON.stringify(movies), "EX", CACHE_TTL);

  return movies;
};

export const restoreMovieService = async (id: string) => {
  const movie = await prisma.movie.findUnique({
    where: { id },
  });

  if (!movie) {
    throw new Error("Movie not found");
  }

  if (!movie.deletedAt) {
    throw new Error("Movie is not in trash");
  }

  const restoredMovie = await prisma.movie.update({
    where: { id },

    data: {
      deletedAt: null,
    },
  });

  await clearMovieListCache();

  await redis.del("movies:trash");

  await redis.del(`movie:${id}`);

  return restoredMovie;
};
