import { id } from "zod/locales";
import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";
import { generateSlug } from "../utils/slug";
import {
  CreateCinemaInput,
  UpdateCinemaInput,
} from "../validations/cinema.schema";
import dayjs from "dayjs";

const cache_ttl = Number(process.env.CACHE_TTL);

export const createCinemaService = async (data: CreateCinemaInput) => {
  const slug = generateSlug(data.name);

  const cinema = await prisma.cinema.create({
    data: {
      ...data,
      slug,
    },
  });

  await redis.del("cinemas:all");
  return cinema;
};

export const getCinemaService = async () => {
  const cached = await redis.get("cinemas:all");

  if (cached) {
    return JSON.parse(cached);
  }

  const cinema = await prisma.cinema.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  await redis.set("cinemas:all", JSON.stringify(cinema), "EX", cache_ttl);

  return cinema;
};

export const getCinemaBySlugService = async (slug: string) => {
  const cacheKey = `cinema: ${slug}`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const cinema = await prisma.cinema.findUnique({
    where: { slug },
    include: { rooms: true },
  });

  if (!cinema) throw new Error("Cinema not found");

  await redis.set(cacheKey, JSON.stringify(cinema), "EX", cache_ttl);

  return cinema;
};

export const updateCinemaService = async (
  id: string,
  data: UpdateCinemaInput,
) => {
  const updatedData: any = { ...data };

  if (data.name) {
    updatedData.slug = generateSlug(data.name);
  }

  const cinema = await prisma.cinema.update({
    where: { id },
    data: updatedData,
  });

  await redis.del(`cinema:${id}`);
  await redis.del("cinemas:all");

  return cinema;
};

export const deleteCinemaService = async (id: string) => {
  await prisma.cinema.delete({
    where: { id },
  });

  await redis.del(`cinema:${id}`);
  await redis.del("cinemas:all");

  return true;
};

export const getCinemaShowtimesService = async (slug: string) => {
  const cacheKey = `cinema-showtimes:${slug}`;

  // BYPASS CACHE FOR DEBUG
  // const cached = await redis.get(cacheKey);
  // if (cached) {
  //   console.log(`✅ Cache hit: ${cacheKey}`, JSON.parse(cached).length);
  //   return JSON.parse(cached);
  // }

  console.log(`🔍 Fetching showtimes for cinema: ${slug}`);

  const showtimes = await prisma.showtime.findMany({
    where: {
      isActive: true,

      room: {
        cinema: {
          slug,
        },
      },

      movie: {
        status: "now_showing",
      },
    },

    include: {
      movie: {
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
        },
      },

      room: true,
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

  console.log(`📍 Cinema slug: ${slug}`);
  console.log(`🎬 Found showtimes: ${showtimes.length}`);

  // Debug: Check tất cả showtimes
  const allShowtimesCount = await prisma.showtime.count();
  console.log(`📊 Total showtimes in DB: ${allShowtimesCount}`);

  // Debug: Check showtimes với isActive = true
  const activeCount = await prisma.showtime.count({
    where: { isActive: true },
  });
  console.log(`✅ Active showtimes: ${activeCount}`);

  // DEBUG: Lấy tất cả active showtimes xem chi tiết
  const allActiveShowtimes = await prisma.showtime.findMany({
    where: { isActive: true },
    include: {
      room: {
        include: {
          cinema: true,
        },
      },
      movie: true,
    },
  });

  console.log(`\n📋 ALL ACTIVE SHOWTIMES IN DB:`);
  allActiveShowtimes.forEach((st, idx) => {
    console.log(`  [${idx}] Showtime ID: ${st.id}`);
    console.log(
      `      Room: ${st.room?.roomName}, Cinema: ${st.room?.cinema?.name} (slug: ${st.room?.cinema?.slug})`,
    );
    console.log(
      `      Movie: ${st.movie?.title} (status: ${st.movie?.status})`,
    );
    console.log(`      ShowDate: ${st.showDate}, StartTime: ${st.startTime}`);
  });
  console.log(`\n`);

  // Debug: Check cinema
  const cinema = await prisma.cinema.findUnique({
    where: { slug },
    include: { rooms: true },
  });
  console.log(
    `🏢 Cinema found: ${cinema?.name || "NOT FOUND"}, rooms: ${cinema?.rooms.length || 0}`,
  );

  // Debug: Check movies with status now_showing
  const nowShowingMovies = await prisma.movie.count({
    where: { status: "now_showing" },
  });
  console.log(`🎥 Now showing movies: ${nowShowingMovies}`);

  // GROUP DATA
  const groupedMovies = new Map();

  for (const showtime of showtimes) {
    const movieId = showtime.movie.id;

    if (!groupedMovies.has(movieId)) {
      groupedMovies.set(movieId, {
        movie: {
          id: showtime.movie.id,
          title: showtime.movie.title,
          slug: showtime.movie.slug,
          posterUrl: showtime.movie.posterUrl,
          durationMinutes: showtime.movie.durationMinutes,
          ageRating: showtime.movie.ageRating,
          status: showtime.movie.status,
          country: showtime.movie.country,

          genres: showtime.movie.genres.map((g) => g.genre.name),
        },

        dates: [],
      });
    }

    const movieGroup = groupedMovies.get(movieId);

    const dateKey = dayjs(showtime.showDate).format("YYYY-MM-DD");

    let dateGroup = movieGroup.dates.find((d: any) => d.date === dateKey);

    if (!dateGroup) {
      dateGroup = {
        date: dateKey,
        formats: [],
      };

      movieGroup.dates.push(dateGroup);
    }

    const formatKey = showtime.format || "STANDARD";

    let formatGroup = dateGroup.formats.find((f: any) => f.type === formatKey);

    if (!formatGroup) {
      formatGroup = {
        type: formatKey,
        showtimes: [],
      };

      dateGroup.formats.push(formatGroup);
    }

    formatGroup.showtimes.push({
      id: showtime.id,

      time: dayjs(showtime.startTime).format("HH:mm"),

      endTime: dayjs(showtime.endTime).format("HH:mm"),

      roomName: showtime.room.roomName,

      basePrice: showtime.basePrice,
    });
  }

  const result = Array.from(groupedMovies.values());

  console.log(`📊 Result: ${result.length} movies with showtimes`);

  await redis.set(cacheKey, JSON.stringify(result), "EX", cache_ttl);

  return result;
};
