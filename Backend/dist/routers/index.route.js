"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const verifyEmail_controller_1 = require("../controllers/verifyEmail.controller");
const refreshToken_controller_1 = require("../controllers/refreshToken.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const rateLimit_1 = require("../utils/rateLimit");
const user_controller_1 = require("../controllers/user.controller");
const address_controller_1 = require("../controllers/address.controller");
const role_middleware_1 = require("../middlewares/role.middleware");
const enums_1 = require("../generated/prisma/enums");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const membership_controller_1 = require("../controllers/membership.controller");
const voucher_controller_1 = require("../controllers/voucher.controller");
const notification_controller_1 = require("../controllers/notification.controller");
const activityLog_controller_1 = require("../controllers/activityLog.controller");
const movie_controller_1 = require("../controllers/movie.controller");
const cinema_controller_1 = require("../controllers/cinema.controller");
const cinemaRoom_controller_1 = require("../controllers/cinemaRoom.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const cinema_schema_1 = require("../validations/cinema.schema");
const activityLog_schema_1 = require("../validations/activityLog.schema");
const showtime_validation_1 = require("../validations/showtime.validation");
const showtime_controller_1 = require("../controllers/showtime.controller");
const blogPost_validation_1 = require("../validations/blogPost.validation");
const blogPost_controller_1 = require("../controllers/blogPost.controller");
const seat_validation_1 = require("../validations/seat.validation");
const seat_controller_1 = require("../controllers/seat.controller");
const movieList_controller_1 = require("../controllers/movieList.controller");
const movieList_validation_1 = require("../validations/movieList.validation");
const movieSlug_controller_1 = require("../controllers/movieSlug.controller");
const genre_controller_1 = require("../controllers/genre.controller");
const review_validation_1 = require("../validations/review.validation");
const review_controller_1 = require("../controllers/review.controller");
const trailer_validation_1 = require("../validations/trailer.validation");
const trailer_controller_1 = require("../controllers/trailer.controller");
const movieSearch_validation_1 = require("../validations/movieSearch.validation");
const movieSearch_controller_1 = require("../controllers/movieSearch.controller");
const city_controller_1 = require("../controllers/city.controller");
const city_validation_1 = require("../validations/city.validation");
const showtimeSeat_controller_1 = require("../controllers/showtimeSeat.controller");
const ticket_qr_controller_1 = require("../controllers/ticket-qr.controller");
const payment_controller_1 = require("../controllers/payment.controller");
const booking_past_controller_1 = require("../controllers/booking-past.controller");
const booking_cancel_controller_1 = require("../controllers/booking-cancel.controller");
const admin_controller_1 = require("../controllers/admin/admin.controller");
const banner_controller_1 = require("../controllers/banner.controller");
const promotion_controller_1 = require("../controllers/promotion.controller");
const home_controller_1 = require("../controllers/home/home.controller");
const movie_validation_1 = require("../validations/movie.validation");
const ticket_type_validation_1 = require("../validations/ticket-type.validation");
const ticket_type_controller_1 = require("../controllers/ticket-type.controller");
const get_showtime_seats_controller_1 = require("../controllers/get-showtime-seats.controller");
const foodCombo_controller_1 = require("../controllers/foodCombo.controller");
const booking_controller_1 = require("../controllers/booking.controller");
const router = (0, express_1.Router)();
router.post("/auth/register", auth_controller_1.registerController);
router.post("/auth/verify-otp", verifyEmail_controller_1.verifyEmailController);
router.post("/auth/login", rateLimit_1.loginLimiter, auth_controller_1.loginController);
router.post("/auth/refresh-token", refreshToken_controller_1.refreshTokenController);
router.post("/auth/logout", auth_controller_1.logoutController);
router.post("/logout", auth_controller_1.logoutController);
router.get("/auth/google", auth_controller_1.googleRedirect);
router.get("/auth/google/callback", auth_controller_1.googleCallback);
router.post("/forgot-password", auth_controller_1.forgotPasswordController);
router.post("/reset-password", auth_controller_1.resetPasswordController);
router.post("/change-password", auth_middleware_1.authMiddleware, auth_controller_1.changePasswordController);
// user profile
router.get("/users/profile", auth_middleware_1.authMiddleware, user_controller_1.getUserProfileController);
router.patch("/users/profile", auth_middleware_1.authMiddleware, user_controller_1.updateUserController);
/**
 * Upload avatar
 */
router.patch("/users/profile/avatar", auth_middleware_1.authMiddleware, upload_middleware_1.upload.single("avatar"), user_controller_1.uploadAvatarController);
// user address
router.post("/users/address", auth_middleware_1.authMiddleware, address_controller_1.createAddressController);
router.get("/users/address", auth_middleware_1.authMiddleware, address_controller_1.getAddressController);
router.get("/users/address/:addressId", auth_middleware_1.authMiddleware, address_controller_1.getAddressByIdController);
router.put("/users/address/:addressId", auth_middleware_1.authMiddleware, address_controller_1.updateUserAddress);
router.delete("/users/address/:addressId", auth_middleware_1.authMiddleware, address_controller_1.deleteAddressController);
router.patch("/users/address/:addressId/default", auth_middleware_1.authMiddleware, address_controller_1.setDefaultAddressController);
//home
router.get("/home", home_controller_1.getHomeController);
// banner
router.post("/banner", banner_controller_1.createBannerController);
router.get("/banner", banner_controller_1.getAllBannerController);
router.get("/banner/:id", banner_controller_1.getBannerByIdController);
router.patch("/banner/:id", banner_controller_1.updateBannerController);
router.delete("/banner/:id", banner_controller_1.deleteBannerController);
// membership
router.get("/membership", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.customer, enums_1.UserRole.admin), membership_controller_1.getMembershipController);
router.post("/membership", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.customer, enums_1.UserRole.admin), membership_controller_1.createMembershipController);
router.put("/membership", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.customer, enums_1.UserRole.admin), membership_controller_1.updateMembershipController);
router.delete("/membership", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin), membership_controller_1.deleteMembershipController);
// voucher
router.post("/voucher", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin), voucher_controller_1.createVoucherController);
router.get("/voucher", auth_middleware_1.authMiddleware, voucher_controller_1.getAllVouchersController);
router.get("/voucher/:id", auth_middleware_1.authMiddleware, voucher_controller_1.getVoucherByIdController);
router.put("/voucher/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin), voucher_controller_1.updateVoucherController);
router.delete("/voucher/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin), voucher_controller_1.deleteVoucherController);
// notification
router.post("/notification", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin, enums_1.UserRole.staff), notification_controller_1.createNotificationController);
router.get("/notification", auth_middleware_1.authMiddleware, notification_controller_1.getUserNotificationsController);
router.get("/notification/:id", auth_middleware_1.authMiddleware, notification_controller_1.getNotificationByIdController);
router.put("/notification/:id", auth_middleware_1.authMiddleware, notification_controller_1.updateNotificationController);
router.patch("/notification/mark-all-read", auth_middleware_1.authMiddleware, notification_controller_1.markAllNotificationsAsReadController);
router.delete("/notification/:id", auth_middleware_1.authMiddleware, notification_controller_1.deleteNotificationController);
// activityLog
router.get("/activityLog", auth_middleware_1.authMiddleware, activityLog_controller_1.getUserActivityLogsController);
router.get("/activityLog/:id", auth_middleware_1.authMiddleware, activityLog_controller_1.getActivityLogByIdController);
router.delete("/activityLog/:id", auth_middleware_1.authMiddleware, activityLog_controller_1.deleteActivityLogController);
router.delete("/activityLog/clear/all", auth_middleware_1.authMiddleware, activityLog_controller_1.clearUserActivityLogsController);
// movie
router.post("/movie", upload_middleware_1.upload.fields([
    {
        name: "poster",
        maxCount: 1,
    },
    {
        name: "banner",
        maxCount: 1,
    },
]), movie_controller_1.createMovie);
router.get("/movie", movie_controller_1.getMovies);
router.get("/movie/:id", movie_controller_1.getMovieById);
router.patch("/movie/:id", upload_middleware_1.upload.fields([
    {
        name: "poster",
        maxCount: 1,
    },
    {
        name: "banner",
        maxCount: 1,
    },
]), movie_controller_1.updateMovie);
router.delete("/movie/:id", movie_controller_1.deleteMovie);
router.get("/movie/:slug/showtimes", (0, validation_middleware_1.validate)(movie_validation_1.getMovieShowtimesSchema), movie_controller_1.getMovieShowtimes);
// cinema
router.post("/cinema", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(cinema_schema_1.createCinemaSchema), cinema_controller_1.createCinema);
router.get("/cinema", cinema_controller_1.getAllCinemas);
router.get("/cinema/:slug", cinema_controller_1.getCinemaBySlug);
router.put("/cinema/:id", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(cinema_schema_1.updateCinemaSchema), cinema_controller_1.updateCinema);
router.delete("/cinema/:id", auth_middleware_1.authMiddleware, cinema_controller_1.deleteCinema);
// cinema room
router.post("/cinema-rooms", (0, validation_middleware_1.validate)(activityLog_schema_1.createCinemaRoomSchema), cinemaRoom_controller_1.createCinemaRoom);
router.get("/cinema-rooms/detail/:id", cinemaRoom_controller_1.getCinemaRoomById);
router.get("/cinema-rooms/:cinemaId", cinemaRoom_controller_1.getAllCinemaRooms);
router.put("/cinema-rooms/:id", (0, validation_middleware_1.validate)(activityLog_schema_1.updateCinemaRoomSchema), cinemaRoom_controller_1.updateCinemaRoom);
router.delete("/cinema-rooms/:id", cinemaRoom_controller_1.deleteCinemaRoom);
router.get("/cinema/:slug/showtimes", cinema_controller_1.getCinemaShowtimes);
// showtime
router.post("/showtime", (0, validation_middleware_1.validate)(showtime_validation_1.createShowtimeSchema), showtime_controller_1.createShowtime);
router.get("/showtime", showtime_controller_1.getAllShowtimes);
router.get("/showtime/:id", showtime_controller_1.getShowtimeById);
router.put("/showtime/:id", (0, validation_middleware_1.validate)(showtime_validation_1.updateShowtimeSchema), showtime_controller_1.updateShowtime);
router.delete("/showtime/:id", showtime_controller_1.deleteShowtime);
// showtime seat
router.post("/showtime-seat/:id/reserve-seats", auth_middleware_1.authMiddleware, showtimeSeat_controller_1.reserveShowtimeSeatController);
router.post("/showtime-seat/:id/release-seats", auth_middleware_1.authMiddleware, showtimeSeat_controller_1.releaseShowtimeSeatController);
router.post("/showtime/:id/confirm-seats", auth_middleware_1.authMiddleware, showtimeSeat_controller_1.confirmBookingShowtimeSeatController);
// blog
router.post("/blog", (0, validation_middleware_1.validate)(blogPost_validation_1.createBlogPostSchema), blogPost_controller_1.createBlogPost);
router.get("/blog", blogPost_controller_1.getAllBlogPosts);
router.get("/blog/slug/:slug", blogPost_controller_1.getBlogPostBySlug);
router.get("/blog/:id", blogPost_controller_1.getBlogPostById);
router.put("/blog/:id", (0, validation_middleware_1.validate)(blogPost_validation_1.updateBlogPostSchema), blogPost_controller_1.updateBlogPost);
router.delete("/blog/:id", blogPost_controller_1.deleteBlogPost);
// seat
router.post("/seat", (0, validation_middleware_1.validate)(seat_validation_1.createSeatSchema), seat_controller_1.createSeat);
router.post("/seat/generate", seat_controller_1.generateSeats);
router.get("/seat", seat_controller_1.getAllSeats);
router.get("/seat/room/:roomId", seat_controller_1.getSeatsByRoom);
router.get("/seat/:id", seat_controller_1.getSeatById);
router.put("/seat/:id", (0, validation_middleware_1.validate)(seat_validation_1.updateSeatSchema), seat_controller_1.updateSeat);
router.delete("/seat/:id", seat_controller_1.deleteSeat);
// movies List
router.get("/movies/list", (0, validation_middleware_1.validate)(movieList_validation_1.movieListQuerySchema), movieList_controller_1.getMoviesListController);
// movie detail by slug
router.get("/movies/detail/:slug", movieSlug_controller_1.getMovieDetailController);
router.get("/showtime/:id/ticket-types", showtime_controller_1.getShowtimeTicketTypes);
// genre
router.get("/genre", genre_controller_1.getGenresController);
router.get("/genre/:id", genre_controller_1.getGenreByIdController);
// genre
router.get("/genre", genre_controller_1.getGenresController);
router.get("/genre/:id", genre_controller_1.getGenreByIdController);
router.post("/genre", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin), genre_controller_1.createGenreController);
router.put("/genre/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin), genre_controller_1.updateGenreController);
router.delete("/genre/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin), genre_controller_1.deleteGenreController);
// review
router.post("/review", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(review_validation_1.createReviewSchema), review_controller_1.createReviewController);
router.get("/review/:movieId", review_controller_1.getMovieReviewsController);
router.put("/review/:id", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(review_validation_1.updateReviewSchema), review_controller_1.updateReviewController);
router.delete("/review/:id", auth_middleware_1.authMiddleware, review_controller_1.deleteReviewController);
// trailer
router.post("/trailer", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin), (0, validation_middleware_1.validate)(trailer_validation_1.createTrailerSchema), trailer_controller_1.createTrailerController);
router.get("/trailer/:movieId", trailer_controller_1.getTrailersByMovieController);
router.get("/trailer/:id", trailer_controller_1.getTrailerByIdController);
router.put("/trailer/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin), (0, validation_middleware_1.validate)(trailer_validation_1.updateTrailerSchema), trailer_controller_1.updateTrailerController);
router.delete("/trailer/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin), trailer_controller_1.deleteTrailerController);
// search
router.get("/search", (0, validation_middleware_1.validate)(movieSearch_validation_1.movieSearchSchema), movieSearch_controller_1.searchMoviesController);
// city
router.get("/city", city_controller_1.getCitiesController);
router.get("/city/:id", city_controller_1.getCityByIdController);
router.post("/city", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin), (0, validation_middleware_1.validate)(city_validation_1.createCitySchema), city_controller_1.createCityController);
router.put("/city/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin), (0, validation_middleware_1.validate)(city_validation_1.updateCitySchema), city_controller_1.updateCityController);
router.delete("/city/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin), city_controller_1.deleteCityController);
// payment
router.post("/payment/vnpay", auth_middleware_1.authMiddleware, payment_controller_1.createVnpayPaymentController);
router.get("/payment/vnpay-return", payment_controller_1.vnpayReturnController);
// Alias route kept for backwards compatibility or external return URLs
router.get("/payment/vnpay/return", payment_controller_1.vnpayReturnController);
router.get("/payment/vnpay-ipn", payment_controller_1.vnpayIPNController);
// momo
router.post("/payment/momo/create", auth_middleware_1.authMiddleware, payment_controller_1.createMoMoController);
router.post("/payment/momo/ipn", payment_controller_1.momoIPNController);
router.get("/payment/momo/return", payment_controller_1.momoReturnController);
// booking current
router.get("/booking/:bookingId", auth_middleware_1.authMiddleware, booking_controller_1.getBookingDetailController);
// ticket QR
router.get("/booking/tickets/:ticketId/qr", auth_middleware_1.authMiddleware, ticket_qr_controller_1.generateTicketQRController);
// booking past
router.get("/booking/past", auth_middleware_1.authMiddleware, booking_past_controller_1.getPastBookingsController);
router.get("/booking/history/:id", auth_middleware_1.authMiddleware, booking_past_controller_1.getBookingHistoryDetailController);
router.post("/booking/:id/cancel", auth_middleware_1.authMiddleware, booking_cancel_controller_1.cancelBookingController);
// promotion
router.post("/promotion", promotion_controller_1.createPromotionController);
router.get("/promotion/active", promotion_controller_1.getActivePromotionController);
router.get("/promotion", promotion_controller_1.getAllPromotionController);
router.get("/promotion/:id", promotion_controller_1.getPromotionByIdController);
router.patch("/promotion/:id", promotion_controller_1.updatePromotionController);
router.delete("/promotion/:id", promotion_controller_1.deletePromotionController);
// ticket type
router.post("/ticket-types", (0, validation_middleware_1.validate)(ticket_type_validation_1.createTicketTypeSchema), ticket_type_controller_1.createTicketType);
router.get("/ticket-types", ticket_type_controller_1.getAllTicketTypes);
router.get("/ticket-types/:id", ticket_type_controller_1.getTicketTypeById);
router.put("/ticket-types/:id", (0, validation_middleware_1.validate)(ticket_type_validation_1.updateTicketTypeSchema), ticket_type_controller_1.updateTicketType);
router.delete("/ticket-types/:id", ticket_type_controller_1.deleteTicketType);
router.get("/showtimes/:id/seats", get_showtime_seats_controller_1.getShowtimeSeatsController);
// food
router.get("/food", foodCombo_controller_1.getAllFoodCombosController);
router.get("/food/:id", foodCombo_controller_1.getFoodComboByIdController);
router.post("/food", auth_middleware_1.authMiddleware, upload_middleware_1.upload.single("image"), foodCombo_controller_1.createFoodComboController);
router.put("/food/:id", auth_middleware_1.authMiddleware, upload_middleware_1.upload.single("image"), foodCombo_controller_1.updateFoodComboController);
router.delete("/food/:id", auth_middleware_1.authMiddleware, foodCombo_controller_1.deleteFoodComboController);
// admin
router.get("/admin/dashboard", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(enums_1.UserRole.admin), admin_controller_1.getDashboardStatsController);
exports.default = router;
//# sourceMappingURL=index.route.js.map