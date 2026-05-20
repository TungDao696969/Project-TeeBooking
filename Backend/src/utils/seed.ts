// prisma/seed.ts

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

type SeedRoom = {
  id: string;
};

async function main() {
  console.log("🌱 Start seeding database...");

  // =============================
  // USERS
  // =============================
  const admin = await prisma.user.upsert({
    where: {
      email: "admin@cinestar.vn",
    },
    update: {},
    create: {
      fullName: "Admin Cinestar",
      email: "admin@cinestar.vn",
      phone: "0900000001",
      passwordHash: "hashed_password_admin",
      role: UserRole.admin,
      gender: GenderType.male,
      isVerified: true,
    },
  });

  const customer = await prisma.user.upsert({
    where: {
      email: "customer1@gmail.com",
    },
    update: {},
    create: {
      fullName: "Nguyen Van A",
      email: "customer1@gmail.com",
      phone: "0900000002",
      passwordHash: "hashed_password_customer",
      role: UserRole.customer,
      gender: GenderType.female,
      isVerified: true,
    },
  });

  await prisma.membership.create({
    data: {
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

  // =============================
  // CITIES
  // =============================
  const hcmCity = await prisma.city.create({
    data: {
      name: "TP.HCM",
      slug: "tp-hcm",
    },
  });

  // =============================
  // CINEMAS
  // =============================
  const cinema1 = await prisma.cinema.create({
    data: {
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

  const cinema2 = await prisma.cinema.create({
    data: {
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
      const room = await prisma.cinemaRoom.create({
        data: {
          cinemaId: cinema.id,
          roomName: `Phòng ${r}`,
          roomType: r === 3 ? "IMAX" : "2D",
          totalSeats: 50,
          screenType: r === 3 ? "IMAX Laser" : "Standard",
          soundSystem: "Dolby Atmos",
        },
      });

      rooms.push(room);

      const rows = ["A", "B", "C", "D", "E"];
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

          await prisma.seat.create({
            data: {
              roomId: room.id,
              seatRow: row,
              seatNumber: num,
              seatCode: `${row}${num}`,
              seatType,
              extraPrice,
            },
          });
        }
      }
    }
  }

  // =============================
  // GENRES
  // =============================
  const genres = await Promise.all([
    prisma.genre.create({ data: { name: "Hành động", slug: "hanh-dong" } }),
    prisma.genre.create({ data: { name: "Kinh dị", slug: "kinh-di" } }),
    prisma.genre.create({ data: { name: "Hoạt hình", slug: "hoat-hinh" } }),
    prisma.genre.create({ data: { name: "Tình cảm", slug: "tinh-cam" } }),
    prisma.genre.create({ data: { name: "Hài", slug: "hai" } }),
  ]);

  // =============================
  // PERSONS
  // =============================
  const director = await prisma.person.create({
    data: {
      fullName: "Christopher Nolan",
      nationality: "UK",
      bio: "Famous movie director",
    },
  });

  const actor = await prisma.person.create({
    data: {
      fullName: "Leonardo DiCaprio",
      nationality: "USA",
      bio: "Hollywood actor",
    },
  });

  // =============================
  // MOVIES
  // =============================
  const movie1 = await prisma.movie.create({
    data: {
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

  const movie2 = await prisma.movie.create({
    data: {
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

  // Movie Genres
  await prisma.movieGenre.createMany({
    data: [
      { movieId: movie1.id, genreId: genres[0].id },
      { movieId: movie1.id, genreId: genres[3].id },
      { movieId: movie2.id, genreId: genres[2].id },
    ],
  });

  // Cast
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
  // SHOWTIMES
  // =============================
  const room = rooms[0];

  if (!room) {
    throw new Error("No cinema room was created");
  }

  const showtime = await prisma.showtime.create({
    data: {
      movieId: movie1.id,
      roomId: room.id,
      showDate: new Date(),
      startTime: new Date("2026-05-08T19:00:00"),
      endTime: new Date("2026-05-08T21:30:00"),
      basePrice: 90000,
      format: "2D",
      language: "English",
      subtitle: "Vietnamese",
    },
  });

  const roomSeats = await prisma.seat.findMany({
    where: { roomId: room.id },
  });

  for (const seat of roomSeats) {
    await prisma.showtimeSeat.create({
      data: {
        showtimeId: showtime.id,
        seatId: seat.id,
        status: SeatStatus.available,
        finalPrice: 90000 + seat.extraPrice,
      },
    });
  }

  // =============================
  // FOOD COMBOS
  // =============================
  const combo1 = await prisma.foodCombo.create({
    data: {
      name: "Combo Solo",
      description: "1 bắp + 1 nước",
      price: 89000,
      stockQuantity: 500,
      imageUrl: "https://example.com/combo1.jpg",
    },
  });

  const combo2 = await prisma.foodCombo.create({
    data: {
      name: "Combo Couple",
      description: "2 bắp + 2 nước",
      price: 159000,
      stockQuantity: 300,
    },
  });

  // =============================
  // PROMOTIONS + VOUCHERS
  // =============================
  const promotion = await prisma.promotion.create({
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
  });

  const voucher = await prisma.voucher.create({
    data: {
      promotionId: promotion.id,
      code: "SUMMER20",
      usageLimit: 1000,
      usedCount: 0,
      status: VoucherStatus.active,
    },
  });

  await prisma.userVoucher.create({
    data: {
      userId: customer.id,
      voucherId: voucher.id,
    },
  });

  // =============================
  // BOOKING
  // =============================
  const selectedSeats = await prisma.showtimeSeat.findMany({
    where: {
      showtimeId: showtime.id,
    },
    take: 2,
  });

  const booking = await prisma.booking.create({
    data: {
      bookingCode: "BK000001",
      userId: customer.id,
      showtimeId: showtime.id,
      totalTicketPrice: selectedSeats.reduce((sum, s) => sum + s.finalPrice, 0),
      totalComboPrice: combo1.price,
      discountAmount: 20000,
      finalAmount:
        selectedSeats.reduce((sum, s) => sum + s.finalPrice, 0) +
        combo1.price -
        20000,
      status: BookingStatus.confirmed,
    },
  });

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
  const payment = await prisma.payment.create({
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

  // =============================
  // REVIEW
  // =============================
  await prisma.review.create({
    data: {
      userId: customer.id,
      movieId: movie1.id,
      rating: 5,
      comment: "Phim cực kỳ hay!",
    },
  });

  // =============================
  // NOTIFICATIONS
  // =============================
  await prisma.notification.create({
    data: {
      userId: customer.id,
      title: "Đặt vé thành công",
      content: `Bạn đã đặt vé thành công với mã ${booking.bookingCode}`,
      type: "booking",
    },
  });

  // =============================
  // BLOG POSTS
  // =============================
  await prisma.blogPost.create({
    data: {
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
    const booking2 = await prisma.booking.create({
      data: {
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
    const payment2 = await prisma.payment.create({
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
