"use strict";
// prisma/seed.ts
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../generated/prisma/enums");
const prisma_1 = require("./prisma");
async function main() {
    console.log("🌱 Start seeding database...");
    // =============================
    // USERS
    // =============================
    const admin = await prisma_1.prisma.user.create({
        data: {
            fullName: "Admin Cinestar",
            email: "admin@cinestar.vn",
            phone: "0900000001",
            passwordHash: "hashed_password_admin",
            role: enums_1.UserRole.admin,
            gender: enums_1.GenderType.male,
            isVerified: true,
        },
    });
    const customer = await prisma_1.prisma.user.create({
        data: {
            fullName: "Nguyen Van A",
            email: "customer1@gmail.com",
            phone: "0900000002",
            passwordHash: "hashed_password_customer",
            role: enums_1.UserRole.customer,
            gender: enums_1.GenderType.female,
            isVerified: true,
        },
    });
    await prisma_1.prisma.membership.create({
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
    await prisma_1.prisma.userAddress.create({
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
    // CINEMAS
    // =============================
    const cinema1 = await prisma_1.prisma.cinema.create({
        data: {
            name: "Cinestar Quốc Thanh",
            slug: "cinestar-quoc-thanh",
            hotline: "19006008",
            province: "TP.HCM",
            district: "Quận 1",
            ward: "Bến Thành",
            address: "271 Nguyễn Trãi",
            latitude: 10.762622,
            longitude: 106.660172,
            openingHours: "08:00 - 23:00",
        },
    });
    const cinema2 = await prisma_1.prisma.cinema.create({
        data: {
            name: "Cinestar Hai Bà Trưng",
            slug: "cinestar-hai-ba-trung",
            hotline: "19006009",
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
    const rooms = [];
    for (const cinema of [cinema1, cinema2]) {
        for (let r = 1; r <= 3; r++) {
            const room = await prisma_1.prisma.cinemaRoom.create({
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
                    let seatType = enums_1.SeatType.standard;
                    let extraPrice = 0;
                    if (row === "E") {
                        seatType = enums_1.SeatType.vip;
                        extraPrice = 30000;
                    }
                    if (num >= 9 && row === "D") {
                        seatType = enums_1.SeatType.couple;
                        extraPrice = 50000;
                    }
                    await prisma_1.prisma.seat.create({
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
        prisma_1.prisma.genre.create({ data: { name: "Hành động", slug: "hanh-dong" } }),
        prisma_1.prisma.genre.create({ data: { name: "Kinh dị", slug: "kinh-di" } }),
        prisma_1.prisma.genre.create({ data: { name: "Hoạt hình", slug: "hoat-hinh" } }),
        prisma_1.prisma.genre.create({ data: { name: "Tình cảm", slug: "tinh-cam" } }),
        prisma_1.prisma.genre.create({ data: { name: "Hài", slug: "hai" } }),
    ]);
    // =============================
    // PERSONS
    // =============================
    const director = await prisma_1.prisma.person.create({
        data: {
            fullName: "Christopher Nolan",
            nationality: "UK",
            bio: "Famous movie director",
        },
    });
    const actor = await prisma_1.prisma.person.create({
        data: {
            fullName: "Leonardo DiCaprio",
            nationality: "USA",
            bio: "Hollywood actor",
        },
    });
    // =============================
    // MOVIES
    // =============================
    const movie1 = await prisma_1.prisma.movie.create({
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
            status: enums_1.MovieStatus.now_showing,
            country: "USA",
            producer: "Warner Bros",
        },
    });
    const movie2 = await prisma_1.prisma.movie.create({
        data: {
            title: "Frozen 3",
            slug: "frozen-3",
            description: "Animated fantasy film.",
            durationMinutes: 110,
            releaseDate: new Date("2025-05-01"),
            status: enums_1.MovieStatus.coming_soon,
            country: "USA",
            producer: "Disney",
        },
    });
    // Movie Genres
    await prisma_1.prisma.movieGenre.createMany({
        data: [
            { movieId: movie1.id, genreId: genres[0].id },
            { movieId: movie1.id, genreId: genres[3].id },
            { movieId: movie2.id, genreId: genres[2].id },
        ],
    });
    // Cast
    await prisma_1.prisma.movieCast.createMany({
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
    const showtime = await prisma_1.prisma.showtime.create({
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
    const roomSeats = await prisma_1.prisma.seat.findMany({
        where: { roomId: room.id },
    });
    for (const seat of roomSeats) {
        await prisma_1.prisma.showtimeSeat.create({
            data: {
                showtimeId: showtime.id,
                seatId: seat.id,
                status: enums_1.SeatStatus.available,
                finalPrice: 90000 + seat.extraPrice,
            },
        });
    }
    // =============================
    // FOOD COMBOS
    // =============================
    const combo1 = await prisma_1.prisma.foodCombo.create({
        data: {
            name: "Combo Solo",
            description: "1 bắp + 1 nước",
            price: 89000,
            stockQuantity: 500,
            imageUrl: "https://example.com/combo1.jpg",
        },
    });
    const combo2 = await prisma_1.prisma.foodCombo.create({
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
    const promotion = await prisma_1.prisma.promotion.create({
        data: {
            title: "Giảm giá mùa hè",
            description: "Giảm 20% tối đa 50k",
            type: enums_1.PromotionType.percentage,
            discountValue: 20,
            minOrderValue: 100000,
            maxDiscount: 50000,
            startDate: new Date("2026-05-01"),
            endDate: new Date("2026-06-01"),
            isActive: true,
        },
    });
    const voucher = await prisma_1.prisma.voucher.create({
        data: {
            promotionId: promotion.id,
            code: "SUMMER20",
            usageLimit: 1000,
            usedCount: 0,
            status: enums_1.VoucherStatus.active,
        },
    });
    await prisma_1.prisma.userVoucher.create({
        data: {
            userId: customer.id,
            voucherId: voucher.id,
        },
    });
    // =============================
    // BOOKING
    // =============================
    const selectedSeats = await prisma_1.prisma.showtimeSeat.findMany({
        where: {
            showtimeId: showtime.id,
        },
        take: 2,
    });
    const booking = await prisma_1.prisma.booking.create({
        data: {
            bookingCode: "BK000001",
            userId: customer.id,
            showtimeId: showtime.id,
            totalTicketPrice: selectedSeats.reduce((sum, s) => sum + s.finalPrice, 0),
            totalComboPrice: combo1.price,
            discountAmount: 20000,
            finalAmount: selectedSeats.reduce((sum, s) => sum + s.finalPrice, 0) +
                combo1.price -
                20000,
            status: enums_1.BookingStatus.confirmed,
        },
    });
    for (const seat of selectedSeats) {
        await prisma_1.prisma.bookingTicket.create({
            data: {
                bookingId: booking.id,
                showtimeSeatId: seat.id,
                ticketPrice: seat.finalPrice,
                qrCode: `QR-${seat.id}`,
            },
        });
        await prisma_1.prisma.showtimeSeat.update({
            where: { id: seat.id },
            data: { status: enums_1.SeatStatus.booked },
        });
    }
    await prisma_1.prisma.bookingCombo.create({
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
    const payment = await prisma_1.prisma.payment.create({
        data: {
            bookingId: booking.id,
            paymentMethod: enums_1.PaymentMethod.momo,
            paymentGateway: "MoMo",
            transactionCode: "MOMO123456",
            amount: booking.finalAmount,
            status: enums_1.PaymentStatus.paid,
            paidAt: new Date(),
        },
    });
    // =============================
    // REVIEW
    // =============================
    await prisma_1.prisma.review.create({
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
    await prisma_1.prisma.notification.create({
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
    await prisma_1.prisma.blogPost.create({
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
    await prisma_1.prisma.banner.create({
        data: {
            title: "Khuyến mãi hè cực sốc",
            imageUrl: "https://example.com/banner-sale.jpg",
            redirectUrl: "https://cinestar.vn/promotions",
            startDate: new Date(),
            endDate: new Date("2026-06-01"),
            isActive: true,
        },
    });
    // =============================
    // ACTIVITY LOGS
    // =============================
    await prisma_1.prisma.activityLog.create({
        data: {
            userId: customer.id,
            action: "BOOK_TICKET",
            targetType: "Booking",
            targetId: booking.id,
            ipAddress: "127.0.0.1",
            userAgent: "Mozilla/5.0",
        },
    });
    console.log("✅ Database seeded successfully!");
}
main()
    .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma_1.prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map