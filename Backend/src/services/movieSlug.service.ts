import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";

// default seat lock duration (milliseconds) — keep in sync with showtimeSeat.service LOCK_DURATION
const SEAT_LOCK_DURATION_MS = 5 * 60 * 1000;

const extractCinemaBrand = (slug?: string, name?: string) => {
  if (!slug && !name) return null;
  const s = (slug || name || "").toLowerCase();
  if (s.includes("cinestar")) return "Cinestar";
  if (s.includes("cgv")) return "CGV";
  if (s.includes("lotte")) return "Lotte";
  if (s.includes("bhd")) return "BHD";
  return null;
};

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
      showtimes: {
        where: {
          isActive: true,
          // startTime: {
          //   gte: new Date(),
          // },
        },
        include: {
          room: {
            include: {
              cinema: true,
            },
          },
        },
        orderBy: {
          startTime: "asc",
        },
      },
    },
  });

  if (!movie) {
    throw new Error("Movie not found");
  }

  // calculate average rating
  const averageRating =
    movie.reviews.length > 0
      ? movie.reviews.reduce((sum, review) => sum + review.rating, 0) /
        movie.reviews.length
      : 0;

  // related movies
  const relatedMovies = await prisma.movie.findMany({
    where: {
      id: {
        not: movie.id,
      },
      genres: {
        some: {
          genreId: {
            in: movie.genres.map((genre) => genre.genreId),
          },
        },
      },
      status: "now_showing",
    },
    take: 6,
    select: {
      id: true,
      title: true,
      slug: true,
      posterUrl: true,
      releaseDate: true,
    },
  });

  const result = {
    success: true,
    data: {
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
        user: review.user,
      })),

      showtimes: movie.showtimes.map((showtime) => ({
        id: showtime.id,
        showDate: showtime.showDate,
        startTime: showtime.startTime,
        endTime: showtime.endTime,
        basePrice: showtime.basePrice,
        format: showtime.format,
        language: showtime.language,
        subtitle: showtime.subtitle,

        cinema: {
          id: showtime.room.cinema.id,
          name: showtime.room.cinema.name,
          address: showtime.room.cinema.address,
          province: showtime.room.cinema.province,
        },

        // basic room info
        room: {
          id: showtime.room.id,
          name: showtime.room.roomName,
        },

        // derived cinema brand (e.g., Cinestar, CGV)
        cinemaBrand: extractCinemaBrand(
          showtime.room.cinema.slug,
          showtime.room.cinema.name,
        ),

        // booking metadata to support a professional booking flow on frontend
        booking: {
          seatLockDurationSeconds: Math.floor(SEAT_LOCK_DURATION_MS / 1000),
          paymentMethods: ["card", "momo", "vnpay", "cash"],
          cancellationPolicy:
            "Tickets can be refunded up to 2 hours before showtime depending on policy",
          bookingUrl: `/booking/showtime/${showtime.id}`,
          // default ticket tiers — frontend may override per-cinema pricing
          ticketTiers: [
            { key: "standard", name: "Standard", extraPrice: 0 },
            { key: "vip", name: "VIP", extraPrice: 20000 },
            { key: "couple", name: "Couple", extraPrice: 30000 },
          ],
        },

        // seat map and availability for this showtime — will be populated below
        seats: [],
      })),

      relatedMovies,
    },
  };

  // cache 5 minutes
  // enrich showtimes with seat maps (showtime-specific pricing & availability)
  const enrichedShowtimes = await Promise.all(
    result.data.showtimes.map(async (s: any) => {
      const showtimeSeats = await prisma.showtimeSeat.findMany({
        where: { showtimeId: s.id },
        include: { seat: true },
        orderBy: [{ finalPrice: "asc" }],
      });

      const seats = showtimeSeats.map((ss) => ({
        id: ss.id,
        seatId: ss.seatId,
        seatCode: ss.seat?.seatCode,
        seatRow: ss.seat?.seatRow,
        seatNumber: ss.seat?.seatNumber,
        seatType: ss.seat?.seatType,
        status: ss.status,
        finalPrice: ss.finalPrice ?? s.basePrice,
        extraPrice: ss.seat?.extraPrice ?? 0,
        lockedUntil: ss.lockedUntil,
      }));

      // build rows map for UI convenience
      const seatRows: any[] = [];
      const rowsMap: Record<string, any[]> = {};
      for (const seat of seats) {
        const row = seat.seatRow || "";
        if (!rowsMap[row]) rowsMap[row] = [];
        rowsMap[row].push(seat);
      }
      for (const row of Object.keys(rowsMap).sort()) {
        const rowSeats = rowsMap[row] ?? [];
        seatRows.push({
          row,
          seats: rowSeats.sort(
            (a, b) => Number(a.seatNumber) - Number(b.seatNumber),
          ),
        });
      }

      return {
        ...s,
        seats,
        seatRows,
      };
    }),
  );

  result.data.showtimes = enrichedShowtimes;

  // cache 5 minutes
  await redis.set(cacheKey, JSON.stringify(result), "EX", 300);

  return result;
};
