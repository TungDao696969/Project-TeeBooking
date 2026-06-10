import { getCinemaBySlug } from "./../controllers/cinema.controller";
import { Router } from "express";
import {
  changePasswordController,
  forgotPasswordController,
  googleCallback,
  googleRedirect,
  loginController,
  logoutController,
  registerController,
  resetPasswordController,
} from "../controllers/auth.controller";
import { verifyEmailController } from "../controllers/verifyEmail.controller";
import { refreshTokenController } from "../controllers/refreshToken.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { loginLimiter } from "../utils/rateLimit";
import {
  getUserProfileController,
  updateUserController,
  uploadAvatarController,
} from "../controllers/user.controller";
import {
  createAddressController,
  getAddressController,
  getAddressByIdController,
  updateUserAddress,
  deleteAddressController,
  setDefaultAddressController,
} from "../controllers/address.controller";
import { roleMiddleware } from "../middlewares/role.middleware";
import { UserRole } from "../generated/prisma/enums";
import { upload } from "../middlewares/upload.middleware";
import {
  getMembershipController,
  createMembershipController,
  updateMembershipController,
  deleteMembershipController,
} from "../controllers/membership.controller";
import {
  createVoucherController,
  getAllVouchersController,
  getVoucherByIdController,
  deleteVoucherController,
  updateVoucherController,
} from "../controllers/voucher.controller";

import {
  createNotificationController,
  getNotificationByIdController,
  getUserNotificationsController,
  updateNotificationController,
  deleteNotificationController,
  markAllNotificationsAsReadController,
} from "../controllers/notification.controller";

import {
  getUserActivityLogsController,
  getActivityLogByIdController,
  deleteActivityLogController,
  clearUserActivityLogsController,
} from "../controllers/activityLog.controller";
import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  getMovieShowtimes,
  getTrashMovies,
  restoreMovie,
  updateMovie,
} from "../controllers/movie.controller";
import {
  createCinema,
  deleteCinema,
  getAllCinemas,
  getCinemaById,
  getCinemaShowtimes,
  getTrashCinemas,
  restoreCinema,
  updateCinema,
} from "../controllers/cinema.controller";
import {
  createCinemaRoom,
  getAllCinemaRooms,
  getRoomsByCinemaIdController,
  getCinemaRoomById,
  updateCinemaRoom,
  deleteCinemaRoom,
  getTrashCinemaRooms,
  restoreCinemaRoom,
} from "../controllers/cinemaRoom.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  createCinemaSchema,
  updateCinemaSchema,
} from "../validations/cinema.schema";
import {
  createCinemaRoomSchema,
  updateCinemaRoomSchema,
} from "../validations/activityLog.schema";
import {
  createShowtimeSchema,
  updateShowtimeSchema,
} from "../validations/showtime.validation";
import {
  createShowtime,
  deleteShowtime,
  forceDeleteShowtime,
  getAllShowtimes,
  getShowtimeById,
  getShowtimeTicketTypes,
  getTrashShowtimes,
  restoreShowtime,
  updateShowtime,
} from "../controllers/showtime.controller";
import {
  createBlogPostSchema,
  updateBlogPostSchema,
} from "../validations/blogPost.validation";
import {
  createBlogPost,
  deleteBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  getBlogPostBySlug,
  updateBlogPost,
} from "../controllers/blogPost.controller";
import {
  createSeatSchema,
  updateSeatSchema,
} from "../validations/seat.validation";
import {
  createSeat,
  deleteSeat,
  generateSeats,
  getAllSeats,
  getSeatById,
  getSeatsByRoom,
  getTrashSeats,
  restoreSeat,
  updateSeat,
} from "../controllers/seat.controller";
import { getMoviesListController } from "../controllers/movieList.controller";
import { movieListQuerySchema } from "../validations/movieList.validation";
import { getMovieDetailController } from "../controllers/movieSlug.controller";
import {
  createGenreController,
  deleteGenreController,
  getGenreByIdController,
  getGenresController,
  updateGenreController,
} from "../controllers/genre.controller";
import {
  createReviewSchema,
  updateReviewSchema,
} from "../validations/review.validation";
import {
  createReviewController,
  deleteReviewController,
  getMovieReviewsController,
  updateReviewController,
} from "../controllers/review.controller";
import {
  createTrailerSchema,
  updateTrailerSchema,
} from "../validations/trailer.validation";
import {
  createTrailerController,
  deleteTrailerController,
  getTrailerByIdController,
  getTrailersByMovieController,
  updateTrailerController,
} from "../controllers/trailer.controller";
import { movieSearchSchema } from "../validations/movieSearch.validation";
import {
  getMovieSuggestions,
  searchMoviesController,
} from "../controllers/movieSearch.controller";
import {
  createCityController,
  deleteCityController,
  getCitiesController,
  getCityByIdController,
  updateCityController,
} from "../controllers/city.controller";
import {
  createCitySchema,
  updateCitySchema,
} from "../validations/city.validation";
import {
  confirmBookingShowtimeSeatController,
  releaseShowtimeSeatController,
  reserveShowtimeSeatController,
} from "../controllers/showtimeSeat.controller";
import { generateTicketQRController } from "../controllers/ticket-qr.controller";

import { create } from "node:domain";
import {
  getBookingHistoryDetailController,
  getPastBookingsController,
} from "../controllers/booking-past.controller";
import { cancelBookingController } from "../controllers/booking-cancel.controller";
import { getDashboardStatsController } from "../controllers/admin/admin.controller";
import {
  createBannerController,
  deleteBannerController,
  getAllBannerController,
  getBannerByIdController,
  updateBannerController,
} from "../controllers/banner.controller";
import {
  createPromotionController,
  deletePromotionController,
  getActivePromotionController,
  getAllPromotionController,
  getPromotionByIdController,
  updatePromotionController,
} from "../controllers/promotion.controller";
import { getHomeController } from "../controllers/home/home.controller";
import { getMovieShowtimesSchema } from "../validations/movie.validation";
import {
  createTicketTypeSchema,
  updateTicketTypeSchema,
} from "../validations/ticket-type.validation";
import {
  createTicketType,
  deleteTicketType,
  getAllTicketTypes,
  getTicketTypeById,
  updateTicketType,
} from "../controllers/ticket-type.controller";
import { getShowtimeSeatsController } from "../controllers/get-showtime-seats.controller";
import {
  createFoodComboController,
  deleteFoodComboController,
  getAllFoodCombosController,
  getFoodComboByIdController,
  updateFoodComboController,
} from "../controllers/foodCombo.controller";
import { getBookingDetailController, createBooking } from "../controllers/booking.controller";
import {
  createUser,
  deleteUser,
  getTrashUsers,
  getUserById,
  getUsers,
  restoreUser,
  updateUser,
} from "../controllers/admin/user.controller";
import { createPaymentController } from "../controllers/payment.controller";
import { verifySePaySignature } from "../middlewares/sepay-signature.middleware";
import { sepayWebhookController } from "../controllers/sepayWebhook.controller";

const router = Router();

router.post("/auth/register", registerController);
router.post("/auth/verify-otp", verifyEmailController);
router.post("/auth/login", loginLimiter, loginController);
router.post("/auth/refresh-token", refreshTokenController);
router.post("/auth/logout", logoutController);
router.post("/logout", logoutController);

router.get("/auth/google", googleRedirect);
router.get("/auth/google/callback", googleCallback);

router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);
router.post("/change-password", authMiddleware, changePasswordController);

// user profile
router.get("/users/profile", authMiddleware, getUserProfileController);
router.patch("/users/profile", authMiddleware, updateUserController);
/**
 * Upload avatar
 */
router.patch(
  "/users/profile/avatar",
  authMiddleware,
  upload.single("avatar"),
  uploadAvatarController,
);

// user address
router.post("/users/address", authMiddleware, createAddressController);
router.get("/users/address", authMiddleware, getAddressController);
router.get(
  "/users/address/:addressId",
  authMiddleware,
  getAddressByIdController,
);
router.put("/users/address/:addressId", authMiddleware, updateUserAddress);
router.delete(
  "/users/address/:addressId",
  authMiddleware,
  deleteAddressController,
);
router.patch(
  "/users/address/:addressId/default",
  authMiddleware,
  setDefaultAddressController,
);

//home
router.get("/home", getHomeController);

// banner
router.post("/banner", createBannerController);

router.get("/banner", getAllBannerController);

router.get("/banner/:id", getBannerByIdController);

router.patch("/banner/:id", updateBannerController);

router.delete("/banner/:id", deleteBannerController);

// membership
router.get(
  "/membership",
  authMiddleware,
  roleMiddleware(UserRole.customer, UserRole.admin),
  getMembershipController,
);
router.post(
  "/membership",
  authMiddleware,
  roleMiddleware(UserRole.customer, UserRole.admin),
  createMembershipController,
);
router.put(
  "/membership",
  authMiddleware,
  roleMiddleware(UserRole.customer, UserRole.admin),
  updateMembershipController,
);

router.delete(
  "/membership",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  deleteMembershipController,
);

// voucher
router.post(
  "/voucher",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  createVoucherController,
);

router.get("/voucher", authMiddleware, getAllVouchersController);

router.get("/voucher/:id", authMiddleware, getVoucherByIdController);

router.put(
  "/voucher/:id",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  updateVoucherController,
);

router.delete(
  "/voucher/:id",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  deleteVoucherController,
);

// notification
router.post(
  "/notification",
  authMiddleware,
  roleMiddleware(UserRole.admin, UserRole.staff),
  createNotificationController,
);

router.get("/notification", authMiddleware, getUserNotificationsController);

router.get("/notification/:id", authMiddleware, getNotificationByIdController);

router.put("/notification/:id", authMiddleware, updateNotificationController);

router.patch(
  "/notification/mark-all-read",
  authMiddleware,
  markAllNotificationsAsReadController,
);

router.delete(
  "/notification/:id",
  authMiddleware,
  deleteNotificationController,
);

// activityLog
router.get("/activityLog", authMiddleware, getUserActivityLogsController);

router.get("/activityLog/:id", authMiddleware, getActivityLogByIdController);

router.delete("/activityLog/:id", authMiddleware, deleteActivityLogController);

router.delete(
  "/activityLog/clear/all",
  authMiddleware,
  clearUserActivityLogsController,
);

// movie
router.post(
  "/movie",
  upload.fields([
    {
      name: "poster",
      maxCount: 1,
    },
    {
      name: "banner",
      maxCount: 1,
    },
  ]),
  createMovie,
);

router.get("/movie", getMovies);
router.get("/movie/trash", getTrashMovies);

router.get("/movie/:id", getMovieById);

router.patch(
  "/movie/:id",
  upload.fields([
    {
      name: "poster",
      maxCount: 1,
    },
    {
      name: "banner",
      maxCount: 1,
    },
  ]),
  updateMovie,
);

router.delete("/movie/:id", deleteMovie);
router.patch("/movie/:id/restore", restoreMovie);

router.get(
  "/movie/:slug/showtimes",
  validate(getMovieShowtimesSchema),
  getMovieShowtimes,
);

// cinema
router.post(
  "/cinema",
  authMiddleware,
  validate(createCinemaSchema),
  createCinema,
);
router.get("/cinema/:slug", getCinemaBySlug);

router.get("/cinema", getAllCinemas);
router.get("/cinema/trash", getTrashCinemas);
router.get("/cinema/:id", getCinemaById);
router.put(
  "/cinema/:id",
  authMiddleware,
  validate(updateCinemaSchema),
  updateCinema,
);
router.patch("/cinema/:id/restore", restoreCinema);
router.delete("/cinema/:id", authMiddleware, deleteCinema);

// cinema room
router.post(
  "/cinema-rooms",
  validate(createCinemaRoomSchema),
  createCinemaRoom,
);

router.get("/cinema-rooms", getAllCinemaRooms);
router.get("/rooms/trash", getTrashCinemaRooms);

router.get("/cinema-rooms/cinema/:cinemaId", getRoomsByCinemaIdController);

router.get("/cinema-rooms/:id", getCinemaRoomById);

router.put(
  "/cinema-rooms/:id",
  validate(updateCinemaRoomSchema),
  updateCinemaRoom,
);

router.patch("/rooms/:id/restore", restoreCinemaRoom);

router.delete("/cinema-rooms/:id", deleteCinemaRoom);

router.get("/cinema/:slug/showtimes", getCinemaShowtimes);

// showtime
router.post("/showtime", validate(createShowtimeSchema), createShowtime);
router.get("/showtimes/trash", getTrashShowtimes);
router.get("/showtime", getAllShowtimes);

router.get("/showtime/:id", getShowtimeById);

router.put("/showtime/:id", validate(updateShowtimeSchema), updateShowtime);
router.patch("/showtime/:id/restore", restoreShowtime);
router.delete("/showtime/:id", deleteShowtime);
router.delete("/showtime/:id/force", forceDeleteShowtime);

// showtime seat
router.post(
  "/showtime-seat/:id/reserve-seats",
  authMiddleware,
  reserveShowtimeSeatController,
);

router.post(
  "/showtime-seat/:id/release-seats",
  authMiddleware,
  releaseShowtimeSeatController,
);

router.post(
  "/showtime/:id/confirm-seats",
  authMiddleware,
  confirmBookingShowtimeSeatController,
);

// blog
router.post("/blog", validate(createBlogPostSchema), createBlogPost);

router.get("/blog", getAllBlogPosts);

router.get("/blog/slug/:slug", getBlogPostBySlug);

router.get("/blog/:id", getBlogPostById);

router.put("/blog/:id", validate(updateBlogPostSchema), updateBlogPost);

router.delete("/blog/:id", deleteBlogPost);

// seat
router.post("/seat", validate(createSeatSchema), createSeat);

router.get("/seat/trash", getTrashSeats);

router.post("/seat/generate", generateSeats);

router.get("/seat", getAllSeats);

router.get("/seat/room/:roomId", getSeatsByRoom);

router.get("/seat/:id", getSeatById);

router.put("/seat/:id", validate(updateSeatSchema), updateSeat);

router.patch("/seat/:id/restore", restoreSeat);

router.delete("/seat/:id", deleteSeat);

router.get("/showtimes/:id/seats", getShowtimeSeatsController);

// movies List
router.get(
  "/movies/list",
  validate(movieListQuerySchema),
  getMoviesListController,
);

// movie detail by slug
router.get("/movies/detail/:slug", getMovieDetailController);
router.get("/showtime/:id/ticket-types", getShowtimeTicketTypes);
// genre
router.get("/genre", getGenresController);
router.get("/genre/:id", getGenreByIdController);

// genre
router.get("/genre", getGenresController);
router.get("/genre/:id", getGenreByIdController);

router.post(
  "/genre",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  createGenreController,
);

router.put(
  "/genre/:id",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  updateGenreController,
);

router.delete(
  "/genre/:id",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  deleteGenreController,
);

// review
router.post(
  "/review",
  authMiddleware,
  validate(createReviewSchema),
  createReviewController,
);

router.get("/review/:movieId", getMovieReviewsController);

router.put(
  "/review/:id",
  authMiddleware,
  validate(updateReviewSchema),
  updateReviewController,
);

router.delete("/review/:id", authMiddleware, deleteReviewController);

// trailer
router.post(
  "/trailer",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  validate(createTrailerSchema),
  createTrailerController,
);

router.get("/trailer/:movieId", getTrailersByMovieController);

router.get("/trailer/:id", getTrailerByIdController);

router.put(
  "/trailer/:id",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  validate(updateTrailerSchema),
  updateTrailerController,
);

router.delete(
  "/trailer/:id",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  deleteTrailerController,
);

// search
router.get(
  "/movies/search",
  validate(movieSearchSchema),
  searchMoviesController,
);
router.get("/movies/suggestions", getMovieSuggestions);
// city
router.get("/city", getCitiesController);
router.get("/city/:id", getCityByIdController);

router.post(
  "/city",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  validate(createCitySchema),
  createCityController,
);

router.put(
  "/city/:id",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  validate(updateCitySchema),
  updateCityController,
);

router.delete(
  "/city/:id",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  deleteCityController,
);

// payment
router.post("/payment/create", authMiddleware, createPaymentController);

router.post(
  "/payment/sepay/webhook",
  verifySePaySignature,
  sepayWebhookController,
);

// ticket QR
router.get(
  "/booking/tickets/:ticketId/qr",
  authMiddleware,
  generateTicketQRController,
);

// booking past
router.get("/booking/past", authMiddleware, getPastBookingsController);
router.get(
  "/booking/history/:id",
  authMiddleware,
  getBookingHistoryDetailController,
);

router.post("/booking/:id/cancel", authMiddleware, cancelBookingController);

// booking current
router.post("/booking/create", authMiddleware, createBooking);
router.get("/booking/:bookingId", authMiddleware, getBookingDetailController);
// promotion
router.post("/promotion", createPromotionController);

router.get("/promotion/active", getActivePromotionController);

router.get("/promotion", getAllPromotionController);

router.get("/promotion/:id", getPromotionByIdController);

router.patch("/promotion/:id", updatePromotionController);

router.delete("/promotion/:id", deletePromotionController);

// ticket type
router.post(
  "/ticket-types",
  validate(createTicketTypeSchema),
  createTicketType,
);

router.get("/ticket-types", getAllTicketTypes);

router.get("/ticket-types/:id", getTicketTypeById);

router.put(
  "/ticket-types/:id",
  validate(updateTicketTypeSchema),
  updateTicketType,
);

router.delete("/ticket-types/:id", deleteTicketType);

// food
router.get("/food", getAllFoodCombosController);

router.get("/food/:id", getFoodComboByIdController);

router.post(
  "/food",
  authMiddleware,
  upload.single("image"),
  createFoodComboController,
);

router.put(
  "/food/:id",
  authMiddleware,
  upload.single("image"),
  updateFoodComboController,
);

router.delete("/food/:id", authMiddleware, deleteFoodComboController);
// admin

router.post("/user", createUser);

router.get("/user", getUsers);

router.get("/user/trash", getTrashUsers);

router.get("/user/:id", getUserById);

router.patch("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);

router.patch("/user/:id/restore", restoreUser);

router.get(
  "/admin/dashboard",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  getDashboardStatsController,
);
export default router;
