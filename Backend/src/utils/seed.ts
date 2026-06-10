import {
  UserRole,
  GenderType,
  SeatType,
  SeatStatus,
  BookingStatus,
  PaymentMethod,
  PaymentStatus,
  MovieStatus,
  PromotionType,
  VoucherStatus,
} from "../generated/prisma/enums";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

type SeedRoom = {
  id: string;
};

const SHOWTIME_SLOTS = [
  { hour: 10, minute: 0, format: "2D", basePrice: 75000 },
  { hour: 13, minute: 30, format: "2D", basePrice: 85000 },
  { hour: 16, minute: 0, format: "2D", basePrice: 90000 },
  { hour: 19, minute: 0, format: "2D", basePrice: 95000 },
  { hour: 21, minute: 30, format: "IMAX", basePrice: 120000 },
] as const;

const SHOWTIME_DAYS_AHEAD = 7;

function startOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function setTimeOnDate(day: Date, hours: number, minutes = 0) {
  const d = new Date(day);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

async function ensureShowtimeSeats(
  showtimeId: string,
  roomId: string,
  basePrice: number,
) {
  const existing = await prisma.showtimeSeat.count({
    where: { showtimeId },
  });

  if (existing > 0) return;

  const roomSeats = await prisma.seat.findMany({
    where: { roomId },
  });

  await prisma.showtimeSeat.createMany({
    data: roomSeats.map((seat) => ({
      showtimeId,
      seatId: seat.id,
      status: SeatStatus.available,
      finalPrice: basePrice + seat.extraPrice,
    })),
  });
}

async function seedShowtimesForAllMovies(rooms: SeedRoom[]) {
  if (rooms.length === 0) {
    throw new Error("No cinema room was created");
  }

  const movies = await prisma.movie.findMany({
    select: { id: true, slug: true, durationMinutes: true },
    orderBy: { createdAt: "asc" },
  });

  const today = startOfDay();
  let created = 0;
  let skippedPast = 0;

  for (let movieIndex = 0; movieIndex < movies.length; movieIndex++) {
    const movie = movies[movieIndex]!;

    for (let dayOffset = 0; dayOffset < SHOWTIME_DAYS_AHEAD; dayOffset++) {
      const showDate = addDays(today, dayOffset);

      for (let slotIndex = 0; slotIndex < SHOWTIME_SLOTS.length; slotIndex++) {
        const slot = SHOWTIME_SLOTS[slotIndex]!;
        const room =
          rooms[(movieIndex + dayOffset + slotIndex) % rooms.length]!;

        const startTime = setTimeOnDate(showDate, slot.hour, slot.minute);

        if (startTime.getTime() <= Date.now()) {
          skippedPast++;
          continue;
        }

        const endTime = new Date(
          startTime.getTime() + movie.durationMinutes * 60 * 1000,
        );

        const existing = await prisma.showtime.findFirst({
          where: { movieId: movie.id, roomId: room.id, startTime },
        });

        const showtime =
          existing ??
          (await prisma.showtime.create({
            data: {
              movieId: movie.id,
              roomId: room.id,
              showDate,
              startTime,
              endTime,
              basePrice: slot.basePrice,
              format: slot.format,
              language: "Vietnamese",
              subtitle: "Vietnamese",
              isActive: true,
            },
          }));

        if (!existing) created++;

        await ensureShowtimeSeats(showtime.id, room.id, slot.basePrice);
      }
    }
  }

  const primaryShowtime = await prisma.showtime.findFirst({
    where: {
      movie: { slug: "inception" },
      isActive: true,
      startTime: { gte: new Date() },
    },
    orderBy: { startTime: "asc" },
  });

  if (!primaryShowtime) {
    throw new Error("No future showtime found for booking seed");
  }

  console.log(
    `🎬 Showtimes: ${created} created for ${movies.length} movies (${SHOWTIME_DAYS_AHEAD} days, ${skippedPast} past slots skipped)`,
  );

  return primaryShowtime;
}

const TICKET_TYPE_SEEDS = [
  {
    name: "Người lớn",
    code: "adult",
    description: "Vé người lớn",
    type: "single",
    price: 69000,
  },
  {
    name: "Học sinh - Sinh viên",
    code: "student",
    description: "Vé dành cho học sinh sinh viên",
    type: "single",
    price: 49000,
  },
  {
    name: "Trẻ em",
    code: "child",
    description: "Vé trẻ em dưới 12 tuổi",
    type: "single",
    price: 45000,
  },
  {
    name: "Người cao tuổi",
    code: "senior",
    description: "Vé người cao tuổi",
    type: "single",
    price: 55000,
  },
  {
    name: "VIP",
    code: "vip",
    description: "Ghế VIP",
    type: "single",
    price: 99000,
  },
  {
    name: "Couple",
    code: "couple",
    description: "Ghế đôi couple",
    type: "couple",
    price: 148000,
  },
  {
    name: "IMAX",
    code: "imax",
    description: "Suất chiếu IMAX",
    type: "single",
    price: 129000,
  },
  {
    name: "4DX",
    code: "4dx",
    description: "Suất chiếu 4DX",
    type: "single",
    price: 139000,
  },
] as const;

async function seedTicketTypes() {
  for (const ticketType of TICKET_TYPE_SEEDS) {
    await prisma.ticketType.upsert({
      where: { code: ticketType.code },
      update: {
        name: ticketType.name,
        description: ticketType.description,
        type: ticketType.type,
        price: ticketType.price,
        isActive: true,
      },
      create: {
        ...ticketType,
        isActive: true,
      },
    });
  }

  console.log(`🎫 Seeded ${TICKET_TYPE_SEEDS.length} ticket types`);
}

async function main() {
  console.log("🌱 Start seeding database...");

  const defaultPasswordHash = await bcrypt.hash("Tungdao382005@", 12);

  // =============================
  // USERS
  // =============================
  const admin = await prisma.user.upsert({
    where: {
      email: "admin@cinestar.vn",
    },
    update: {
      passwordHash: defaultPasswordHash,
    },
    create: {
      fullName: "Admin Cinestar",
      email: "admin@cinestar.vn",
      phone: "0900000001",
      passwordHash: defaultPasswordHash,
      role: UserRole.admin,
      gender: GenderType.male,
      isVerified: true,
    },
  });

  const readmeAdmin = await prisma.user.upsert({
    where: {
      email: "daot0502@gmail.com",
    },
    update: {
      passwordHash: defaultPasswordHash,
    },
    create: {
      fullName: "Admin Tùng Đào",
      email: "daot0502@gmail.com",
      phone: "0900000003",
      passwordHash: defaultPasswordHash,
      role: UserRole.admin,
      gender: GenderType.male,
      isVerified: true,
    },
  });

  const customer = await prisma.user.upsert({
    where: {
      email: "customer1@gmail.com",
    },
    update: {
      passwordHash: defaultPasswordHash,
    },
    create: {
      fullName: "Nguyen Van A",
      email: "customer1@gmail.com",
      phone: "0900000002",
      passwordHash: defaultPasswordHash,
      role: UserRole.customer,
      gender: GenderType.female,
      isVerified: true,
    },
  });

  await prisma.membership.upsert({
    where: { membershipCode: "CNS001" },
    update: {
      userId: customer.id,
      level: "Gold",
      points: 1500,
      lifetimePoints: 5000,
    },
    create: {
      userId: customer.id,
      membershipCode: "CNS001",
      level: "Gold",
      points: 1500,
      lifetimePoints: 5000,
    },
  });

  // =============================
  // USER ADDRESS
  // =============================
  const existingDefaultAddress = await prisma.userAddress.findFirst({
    where: {
      userId: customer.id,
      isDefault: true,
    },
  });

  if (!existingDefaultAddress) {
    await prisma.userAddress.create({
      data: {
        userId: customer.id,
        province: "TP.HCM",
        district: "Quận 1",
        ward: "Bến Nghé",
        addressDetail: "123 Nguyễn Huệ",
        isDefault: true,
      },
    });
  }

  // =============================
  // CITIES
  // =============================
  const hcmCity = await prisma.city.upsert({
    where: { slug: "tp-hcm" },
    update: { name: "TP.HCM", isActive: true },
    create: { name: "TP.HCM", slug: "tp-hcm" },
  });

  // =============================
  // CINEMAS
  // =============================
  const cinema1 = await prisma.cinema.upsert({
    where: { slug: "cinestar-quoc-thanh" },
    update: {
      name: "Cinestar Quốc Thanh",
      hotline: "19006008",
      cityId: hcmCity.id,
      province: "TP.HCM",
      district: "Quận 1",
      ward: "Bến Thành",
      address: "271 Nguyễn Trãi",
      latitude: 10.762622,
      longitude: 106.660172,
      openingHours: "08:00 - 23:00",
    },
    create: {
      name: "Cinestar Quốc Thanh",
      slug: "cinestar-quoc-thanh",
      hotline: "19006008",
      cityId: hcmCity.id,
      province: "TP.HCM",
      district: "Quận 1",
      ward: "Bến Thành",
      address: "271 Nguyễn Trãi",
      latitude: 10.762622,
      longitude: 106.660172,
      openingHours: "08:00 - 23:00",
    },
  });

  const cinema2 = await prisma.cinema.upsert({
    where: { slug: "cinestar-hai-ba-trung" },
    update: {
      name: "Cinestar Hai Bà Trưng",
      hotline: "19006009",
      cityId: hcmCity.id,
      province: "TP.HCM",
      district: "Quận 3",
      ward: "Phường 6",
      address: "135 Hai Bà Trưng",
      latitude: 10.7829,
      longitude: 106.695,
      openingHours: "08:00 - 23:30",
    },
    create: {
      name: "Cinestar Hai Bà Trưng",
      slug: "cinestar-hai-ba-trung",
      hotline: "19006009",
      cityId: hcmCity.id,
      province: "TP.HCM",
      district: "Quận 3",
      ward: "Phường 6",
      address: "135 Hai Bà Trưng",
      latitude: 10.7829,
      longitude: 106.695,
      openingHours: "08:00 - 23:30",
    },
  });

  // =============================
  // ROOMS + SEATS
  // =============================
  const rooms: SeedRoom[] = [];

  for (const cinema of [cinema1, cinema2]) {
    for (let r = 1; r <= 3; r++) {
      const roomName = `Phòng ${r}`;

      const room =
        (await prisma.cinemaRoom.findFirst({
          where: { cinemaId: cinema.id, roomName },
        })) ??
        (await prisma.cinemaRoom.create({
          data: {
            cinemaId: cinema.id,
            roomName,
            roomType: r === 3 ? "IMAX" : "2D",
            totalSeats: 50,
            screenType: r === 3 ? "IMAX Laser" : "Standard",
            soundSystem: "Dolby Atmos",
          },
        }));

      rooms.push(room);

      const rows = ["A", "B", "C", "D", "E"];
      const seatData: {
        roomId: string;
        seatRow: string;
        seatNumber: number;
        seatCode: string;
        seatType: SeatType;
        extraPrice: number;
      }[] = [];

      const existingSeatCount = await prisma.seat.count({
        where: { roomId: room.id },
      });

      if (existingSeatCount > 0) {
        continue;
      }

      for (const row of rows) {
        for (let num = 1; num <= 10; num++) {
          let seatType: SeatType = SeatType.standard;
          let extraPrice = 0;

          if (row === "E") {
            seatType = SeatType.vip;
            extraPrice = 30000;
          }

          if (num >= 9 && row === "D") {
            seatType = SeatType.couple;
            extraPrice = 50000;
          }

          seatData.push({
            roomId: room.id,
            seatRow: row,
            seatNumber: num,
            seatCode: `${row}${num}`,
            seatType,
            extraPrice,
          });
        }
      }

      await prisma.seat.createMany({ data: seatData });
    }
  }

  // =============================
  // GENRES
  // =============================
  const genres = await Promise.all([
    prisma.genre.upsert({
      where: { slug: "hanh-dong" },
      update: { name: "Hành động" },
      create: { name: "Hành động", slug: "hanh-dong" },
    }),
    prisma.genre.upsert({
      where: { slug: "kinh-di" },
      update: { name: "Kinh dị" },
      create: { name: "Kinh dị", slug: "kinh-di" },
    }),
    prisma.genre.upsert({
      where: { slug: "hoat-hinh" },
      update: { name: "Hoạt hình" },
      create: { name: "Hoạt hình", slug: "hoat-hinh" },
    }),
    prisma.genre.upsert({
      where: { slug: "tinh-cam" },
      update: { name: "Tình cảm" },
      create: { name: "Tình cảm", slug: "tinh-cam" },
    }),
    prisma.genre.upsert({
      where: { slug: "hai" },
      update: { name: "Hài" },
      create: { name: "Hài", slug: "hai" },
    }),
  ]);

  // =============================
  // PERSONS
  // =============================
  const director =
    (await prisma.person.findFirst({
      where: { fullName: "Christopher Nolan" },
    })) ??
    (await prisma.person.create({
      data: {
        fullName: "Christopher Nolan",
        nationality: "UK",
        bio: "Famous movie director",
      },
    }));

  const actor =
    (await prisma.person.findFirst({
      where: { fullName: "Leonardo DiCaprio" },
    })) ??
    (await prisma.person.create({
      data: {
        fullName: "Leonardo DiCaprio",
        nationality: "USA",
        bio: "Hollywood actor",
      },
    }));

  // =============================
  // MOVIES
  // =============================
  const movie1 = await prisma.movie.upsert({
    where: { slug: "inception" },
    update: {
      title: "Inception",
      originalTitle: "Inception",
      description: "A mind-bending thriller.",
      durationMinutes: 148,
      releaseDate: new Date("2025-01-01"),
      endDate: new Date("2025-12-31"),
      ageRating: "13+",
      language: "English",
      subtitle: "Vietnamese",
      trailerUrl: "https://youtube.com/inception",
      posterUrl: "https://example.com/poster1.jpg",
      bannerUrl: "https://example.com/banner1.jpg",
      status: MovieStatus.now_showing,
      country: "USA",
      producer: "Warner Bros",
    },
    create: {
      title: "Inception",
      slug: "inception",
      originalTitle: "Inception",
      description: "A mind-bending thriller.",
      durationMinutes: 148,
      releaseDate: new Date("2025-01-01"),
      endDate: new Date("2025-12-31"),
      ageRating: "13+",
      language: "English",
      subtitle: "Vietnamese",
      trailerUrl: "https://youtube.com/inception",
      posterUrl: "https://example.com/poster1.jpg",
      bannerUrl: "https://example.com/banner1.jpg",
      status: MovieStatus.now_showing,
      country: "USA",
      producer: "Warner Bros",
    },
  });

  const movie2 = await prisma.movie.upsert({
    where: { slug: "frozen-3" },
    update: {
      title: "Frozen 3",
      description: "Animated fantasy film.",
      durationMinutes: 110,
      releaseDate: new Date("2025-05-01"),
      status: MovieStatus.coming_soon,
      country: "USA",
      producer: "Disney",
    },
    create: {
      title: "Frozen 3",
      slug: "frozen-3",
      description: "Animated fantasy film.",
      durationMinutes: 110,
      releaseDate: new Date("2025-05-01"),
      status: MovieStatus.coming_soon,
      country: "USA",
      producer: "Disney",
    },
  });

  // =============================
  // ADDITIONAL MOVIES
  // =============================

  const nowShowingMovies = [
    {
      title: "Avengers Secret Wars",
      slug: "avengers-secret-wars",
      description: "Marvel multiverse battle.",
      durationMinutes: 160,
      releaseDate: new Date("2026-01-10"),
      status: MovieStatus.now_showing,
      country: "USA",
      producer: "Marvel Studios",
    },
    {
      title: "The Batman 2",
      slug: "the-batman-2",
      description: "Batman returns to Gotham.",
      durationMinutes: 150,
      releaseDate: new Date("2026-02-01"),
      status: MovieStatus.now_showing,
      country: "USA",
      producer: "DC Studios",
    },
    {
      title: "Fast And Furious 11",
      slug: "fast-furious-11",
      description: "Action racing blockbuster.",
      durationMinutes: 145,
      releaseDate: new Date("2026-03-12"),
      status: MovieStatus.now_showing,
      country: "USA",
      producer: "Universal",
    },
    {
      title: "John Wick 5",
      slug: "john-wick-5",
      description: "Legendary assassin returns.",
      durationMinutes: 140,
      releaseDate: new Date("2026-02-20"),
      status: MovieStatus.now_showing,
      country: "USA",
      producer: "Lionsgate",
    },
    {
      title: "Kung Fu Panda 4",
      slug: "kung-fu-panda-4",
      description: "Po returns with new adventure.",
      durationMinutes: 105,
      releaseDate: new Date("2026-01-15"),
      status: MovieStatus.now_showing,
      country: "USA",
      producer: "DreamWorks",
    },
    {
      title: "Mission Impossible 8",
      slug: "mission-impossible-8",
      description: "Ethan Hunt final mission.",
      durationMinutes: 155,
      releaseDate: new Date("2026-04-01"),
      status: MovieStatus.now_showing,
      country: "USA",
      producer: "Paramount",
    },
    {
      title: "Spider Man Beyond",
      slug: "spider-man-beyond",
      description: "Multiverse spider adventure.",
      durationMinutes: 135,
      releaseDate: new Date("2026-03-05"),
      status: MovieStatus.now_showing,
      country: "USA",
      producer: "Sony Pictures",
    },
    {
      title: "Detective Conan Movie",
      slug: "detective-conan-movie",
      description: "New Conan mystery case.",
      durationMinutes: 120,
      releaseDate: new Date("2026-02-14"),
      status: MovieStatus.now_showing,
      country: "Japan",
      producer: "Toho",
    },
  ];

  const comingSoonMovies = [
    {
      title: "Avatar 4",
      slug: "avatar-4",
      description: "Pandora new chapter.",
      durationMinutes: 180,
      releaseDate: new Date("2026-08-01"),
      status: MovieStatus.coming_soon,
      country: "USA",
      producer: "20th Century Studios",
    },
    {
      title: "Frozen 4",
      slug: "frozen-4",
      description: "Elsa returns.",
      durationMinutes: 115,
      releaseDate: new Date("2026-09-10"),
      status: MovieStatus.coming_soon,
      country: "USA",
      producer: "Disney",
    },
    {
      title: "Minions Rise Again",
      slug: "minions-rise-again",
      description: "Funny minions adventure.",
      durationMinutes: 100,
      releaseDate: new Date("2026-10-05"),
      status: MovieStatus.coming_soon,
      country: "USA",
      producer: "Illumination",
    },
    {
      title: "Shrek 5",
      slug: "shrek-5",
      description: "Shrek returns to Far Far Away.",
      durationMinutes: 110,
      releaseDate: new Date("2026-11-11"),
      status: MovieStatus.coming_soon,
      country: "USA",
      producer: "DreamWorks",
    },
    {
      title: "Transformer Reborn",
      slug: "transformer-reborn",
      description: "Autobots return to Earth.",
      durationMinutes: 150,
      releaseDate: new Date("2026-07-20"),
      status: MovieStatus.coming_soon,
      country: "USA",
      producer: "Paramount",
    },
    {
      title: "Jujutsu Kaisen Movie",
      slug: "jujutsu-kaisen-movie",
      description: "Special anime battle movie.",
      durationMinutes: 125,
      releaseDate: new Date("2026-08-15"),
      status: MovieStatus.coming_soon,
      country: "Japan",
      producer: "MAPPA",
    },
    {
      title: "Doraemon Movie 2026",
      slug: "doraemon-movie-2026",
      description: "New Doraemon adventure.",
      durationMinutes: 95,
      releaseDate: new Date("2026-09-01"),
      status: MovieStatus.coming_soon,
      country: "Japan",
      producer: "Shin-Ei Animation",
    },
    {
      title: "One Piece Red 2",
      slug: "one-piece-red-2",
      description: "Luffy new pirate adventure.",
      durationMinutes: 130,
      releaseDate: new Date("2026-12-01"),
      status: MovieStatus.coming_soon,
      country: "Japan",
      producer: "Toei Animation",
    },
  ];

  for (const movie of [...nowShowingMovies, ...comingSoonMovies]) {
    await prisma.movie.upsert({
      where: { slug: movie.slug },
      update: {
        title: movie.title,
        description: movie.description,
        durationMinutes: movie.durationMinutes,
        releaseDate: movie.releaseDate,
        ageRating: "13+",
        language: "English",
        subtitle: "Vietnamese",
        trailerUrl: "https://youtube.com/trailer",
        posterUrl: "https://example.com/poster.jpg",
        bannerUrl: "https://example.com/banner.jpg",
        status: movie.status,
        country: movie.country,
        producer: movie.producer,
      },
      create: {
        title: movie.title,
        slug: movie.slug,
        description: movie.description,
        durationMinutes: movie.durationMinutes,
        releaseDate: movie.releaseDate,
        ageRating: "13+",
        language: "English",
        subtitle: "Vietnamese",
        trailerUrl: "https://youtube.com/trailer",
        posterUrl: "https://example.com/poster.jpg",
        bannerUrl: "https://example.com/banner.jpg",
        status: movie.status,
        country: movie.country,
        producer: movie.producer,
      },
    });
  }
  // Movie Genres
  await prisma.movieGenre.createMany({
    data: [
      { movieId: movie1.id, genreId: genres[0].id },
      { movieId: movie1.id, genreId: genres[3].id },
      { movieId: movie2.id, genreId: genres[2].id },
    ],
    skipDuplicates: true,
  });

  // Cast
  await prisma.movieCast.deleteMany({ where: { movieId: movie1.id } });
  await prisma.movieCast.createMany({
    data: [
      {
        movieId: movie1.id,
        personId: director.id,
        roleType: "director",
      },
      {
        movieId: movie1.id,
        personId: actor.id,
        roleType: "actor",
        characterName: "Cobb",
      },
    ],
  });

  // =============================
  // TICKET TYPES
  // =============================
  await seedTicketTypes();

  // =============================
  // SHOWTIMES (all movies)
  // =============================
  const showtime = await seedShowtimesForAllMovies(rooms);

  // =============================
  // FOOD COMBOS
  // =============================
  const combo1 =
    (await prisma.foodCombo.findFirst({ where: { name: "Combo Solo" } })) ??
    (await prisma.foodCombo.create({
      data: {
        name: "Combo Solo",
        description: "1 bắp + 1 nước",
        price: 89000,
        stockQuantity: 500,
        imageUrl: "https://example.com/combo1.jpg",
      },
    }));

  const combo2 =
    (await prisma.foodCombo.findFirst({ where: { name: "Combo Couple" } })) ??
    (await prisma.foodCombo.create({
      data: {
        name: "Combo Couple",
        description: "2 bắp + 2 nước",
        price: 159000,
        stockQuantity: 300,
      },
    }));

  // =============================
  // PROMOTIONS + VOUCHERS
  // =============================
  const promotion =
    (await prisma.promotion.findFirst({
      where: { title: "Giảm giá mùa hè", type: PromotionType.percentage },
    })) ??
    (await prisma.promotion.create({
      data: {
        title: "Giảm giá mùa hè",
        description: "Giảm 20% tối đa 50k",
        imageUrl: "https://example.com/promotion-summer.jpg",
        type: PromotionType.percentage,
        discountValue: 20,
        minOrderValue: 100000,
        maxDiscount: 50000,
        startDate: new Date("2026-05-01"),
        endDate: new Date("2026-06-01"),
        isActive: true,
      },
    }));

  const voucher = await prisma.voucher.upsert({
    where: { code: "SUMMER20" },
    update: {
      promotionId: promotion.id,
      usageLimit: 1000,
      usedCount: 0,
      status: VoucherStatus.active,
    },
    create: {
      promotionId: promotion.id,
      code: "SUMMER20",
      usageLimit: 1000,
      usedCount: 0,
      status: VoucherStatus.active,
    },
  });

  const existingUserVoucher = await prisma.userVoucher.findFirst({
    where: { userId: customer.id, voucherId: voucher.id },
  });

  if (!existingUserVoucher) {
    await prisma.userVoucher.create({
      data: {
        userId: customer.id,
        voucherId: voucher.id,
      },
    });
  }

  // =============================
  // BOOKING
  // =============================
  const selectedSeats = await prisma.showtimeSeat.findMany({
    where: {
      showtimeId: showtime.id,
    },
    take: 2,
  });

  const bookingTotals = {
    totalTicketPrice: selectedSeats.reduce((sum, s) => sum + s.finalPrice, 0),
    totalComboPrice: combo1.price,
    discountAmount: 20000,
  };

  const booking = await prisma.booking.upsert({
    where: { bookingCode: "BK000001" },
    update: {
      userId: customer.id,
      showtimeId: showtime.id,
      ...bookingTotals,
      finalAmount:
        bookingTotals.totalTicketPrice +
        bookingTotals.totalComboPrice -
        bookingTotals.discountAmount,
      status: BookingStatus.confirmed,
    },
    create: {
      bookingCode: "BK000001",
      userId: customer.id,
      showtimeId: showtime.id,
      ...bookingTotals,
      finalAmount:
        bookingTotals.totalTicketPrice +
        bookingTotals.totalComboPrice -
        bookingTotals.discountAmount,
      status: BookingStatus.confirmed,
    },
  });

  await prisma.bookingTicket.deleteMany({ where: { bookingId: booking.id } });

  for (const seat of selectedSeats) {
    await prisma.bookingTicket.create({
      data: {
        bookingId: booking.id,
        showtimeSeatId: seat.id,
        ticketPrice: seat.finalPrice,
        qrCode: `QR-${seat.id}`,
      },
    });

    await prisma.showtimeSeat.update({
      where: { id: seat.id },
      data: { status: SeatStatus.booked },
    });
  }

  await prisma.bookingCombo.deleteMany({ where: { bookingId: booking.id } });
  await prisma.bookingCombo.create({
    data: {
      bookingId: booking.id,
      comboId: combo1.id,
      quantity: 1,
      unitPrice: combo1.price,
      totalPrice: combo1.price,
    },
  });

  // =============================
  // PAYMENT
  // =============================
  const existingPayment = await prisma.payment.findFirst({
    where: { transactionCode: "MOMO123456" },
  });

  if (!existingPayment) {
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        paymentMethod: PaymentMethod.momo,
        paymentGateway: "MoMo",
        transactionCode: "MOMO123456",
        amount: booking.finalAmount,
        status: PaymentStatus.paid,
        paidAt: new Date(),
      },
    });
  }

  // =============================
  // REVIEW
  // =============================
  const existingReview = await prisma.review.findFirst({
    where: { userId: customer.id, movieId: movie1.id },
  });

  if (!existingReview) {
    await prisma.review.create({
      data: {
        userId: customer.id,
        movieId: movie1.id,
        rating: 5,
        comment: "Phim cực kỳ hay!",
      },
    });
  }

  // =============================
  // NOTIFICATIONS
  // =============================
  const existingNotification = await prisma.notification.findFirst({
    where: {
      userId: customer.id,
      title: "Đặt vé thành công",
      content: `Bạn đã đặt vé thành công với mã ${booking.bookingCode}`,
    },
  });

  if (!existingNotification) {
    await prisma.notification.create({
      data: {
        userId: customer.id,
        title: "Đặt vé thành công",
        content: `Bạn đã đặt vé thành công với mã ${booking.bookingCode}`,
        type: "booking",
      },
    });
  }

  // =============================
  // BLOG POSTS
  // =============================
  await prisma.blogPost.upsert({
    where: { slug: "top-phim-hot-thang-nay" },
    update: {
      title: "Top phim hot tháng này",
      thumbnailUrl: "https://example.com/blog1.jpg",
      content: "Danh sách các phim hot nhất tại Cinestar...",
      authorId: admin.id,
      publishedAt: new Date(),
    },
    create: {
      title: "Top phim hot tháng này",
      slug: "top-phim-hot-thang-nay",
      thumbnailUrl: "https://example.com/blog1.jpg",
      content: "Danh sách các phim hot nhất tại Cinestar...",
      authorId: admin.id,
      publishedAt: new Date(),
    },
  });

  // =============================
  // BANNERS
  // =============================
  await prisma.banner.create({
    data: {
      title: "Khuyến mãi hè cực sốc",
      imageUrl: "https://example.com/banner-sale.jpg",
      redirectUrl: "https://cinestar.vn/promotions",
      startDate: new Date(),
      endDate: new Date("2026-06-01"),
      isActive: true,
    },
  });
  // Banner 2
  await prisma.banner.create({
    data: {
      title: "Mua 1 tặng 1 vé xem phim",
      imageUrl: "https://example.com/banner-buy1get1.jpg",
      redirectUrl: "https://cinestar.vn/promotions/buy1get1",
      startDate: new Date(),
      endDate: new Date("2026-07-01"),
      isActive: true,
    },
  });

  // Banner 3
  await prisma.banner.create({
    data: {
      title: "Trải nghiệm phòng chiếu IMAX",
      imageUrl: "https://example.com/banner-imax.jpg",
      redirectUrl: "https://cinestar.vn/imax",
      startDate: new Date(),
      endDate: new Date("2026-08-01"),
      isActive: true,
    },
  });

  // Banner
  await prisma.banner.create({
    data: {
      title: "Combo bắp nước giảm 30%",
      imageUrl: "https://example.com/banner-combo.jpg",
      redirectUrl: "https://cinestar.vn/food-combo",
      startDate: new Date(),
      endDate: new Date("2026-09-01"),
      isActive: true,
    },
  });

  // =============================
  // ADDITIONAL PAYMENTS FOR TESTING
  // =============================
  // Payment with pending status
  const pendingPayment = await prisma.payment.create({
    data: {
      bookingId: booking.id,
      paymentMethod: PaymentMethod.vnpay,
      paymentGateway: "VNPay",
      transactionCode: "VNPAY789012",
      amount: booking.finalAmount,
      status: PaymentStatus.pending,
    },
  });

  // Payment with failed status
  const failedPayment = await prisma.payment.create({
    data: {
      bookingId: booking.id,
      paymentMethod: PaymentMethod.momo,
      paymentGateway: "MoMo",
      transactionCode: "MOMO987654",
      amount: booking.finalAmount,
      status: PaymentStatus.failed,
    },
  });

  // Another booking for testing
  const selectedSeats2 = await prisma.showtimeSeat.findMany({
    where: {
      showtimeId: showtime.id,
      status: SeatStatus.available,
    },
    take: 1,
  });

  const selectedSeat2 = selectedSeats2[0];

  if (selectedSeat2) {
    const booking2 = await prisma.booking.upsert({
      where: { bookingCode: "BK000002" },
      update: {
        userId: customer.id,
        showtimeId: showtime.id,
        totalTicketPrice: selectedSeat2.finalPrice,
        totalComboPrice: 0,
        discountAmount: 0,
        finalAmount: selectedSeat2.finalPrice,
        status: BookingStatus.pending,
      },
      create: {
        bookingCode: "BK000002",
        userId: customer.id,
        showtimeId: showtime.id,
        totalTicketPrice: selectedSeat2.finalPrice,
        totalComboPrice: 0,
        discountAmount: 0,
        finalAmount: selectedSeat2.finalPrice,
        status: BookingStatus.pending,
      },
    });

    await prisma.bookingTicket.deleteMany({
      where: { bookingId: booking2.id },
    });

    await prisma.bookingTicket.create({
      data: {
        bookingId: booking2.id,
        showtimeSeatId: selectedSeat2.id,
        ticketPrice: selectedSeat2.finalPrice,
        qrCode: `QR-${selectedSeat2.id}`,
      },
    });

    await prisma.showtimeSeat.update({
      where: { id: selectedSeat2.id },
      data: { status: SeatStatus.booked },
    });

    // Payment for booking2 with paid status
    const existingPayment2 = await prisma.payment.findFirst({
      where: { transactionCode: "CASH345678" },
    });

    if (!existingPayment2) {
      await prisma.payment.create({
        data: {
          bookingId: booking2.id,
          paymentMethod: PaymentMethod.cash,
          paymentGateway: "Cash",
          transactionCode: "CASH345678",
          amount: booking2.finalAmount,
          status: PaymentStatus.paid,
          paidAt: new Date(),
        },
      });
    }
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
