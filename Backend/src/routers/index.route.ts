import { Router } from "express";
import {
  changePasswordController,
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resetPasswordController,
} from "../controllers/auth.controller";
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
  updateMovie,
} from "../controllers/movie.controller";
import {
  createCinema,
  deleteCinema,
  getAllCinemas,
  getCinemaById,
  updateCinema,
} from "../controllers/cinema.controller";
import {
  createCinemaRoom,
  getAllCinemaRooms,
  getCinemaRoomById,
  updateCinemaRoom,
  deleteCinemaRoom,
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
  getAllShowtimes,
  getShowtimeById,
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
import { searchMoviesController } from "../controllers/movieSearch.controller";
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
import {
  createMoMoController,
  createVnpayPaymentController,
  momoIPNController,
  momoReturnController,
  // createMomoPaymentController,
  // createVnpayPaymentController,
  // momoIpnController,
  vnpayReturnController,
} from "../controllers/payment.controller";
// import { vnpayReturnController } from "../controllers/vnpay.controller";
import { create } from "node:domain";
const router = Router();

router.post("/auth/register", registerController);
router.post("/auth/login", loginLimiter, loginController);
router.post("/auth/refresh-token", refreshTokenController);
router.post("/auth/logout", logoutController);
router.post("/logout", logoutController);

router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);
router.post("/change-password", authMiddleware, changePasswordController);

// user profile
router.get("/users/profile", authMiddleware, getUserProfileController);
router.put("/users/profile", authMiddleware, updateUserController);
/**
 * Upload avatar
 */
router.put(
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
router.post("/movie", createMovie);

router.get("/movie", getMovies);

router.get("/movie/:id", getMovieById);

router.patch("/movie/:id", updateMovie);

router.delete("/movie/:id", deleteMovie);

// cinema
router.post("/cinema", validate(createCinemaSchema), createCinema);
router.get("/cinema", getAllCinemas);
router.get("/cinema/:id", getCinemaById);
router.put("/cinema/:id", validate(updateCinemaSchema), updateCinema);
router.delete("/cinema/:id", deleteCinema);

// cinema room
router.post(
  "/cinema-rooms",
  validate(createCinemaRoomSchema),
  createCinemaRoom,
);

router.get("/cinema-rooms/detail/:id", getCinemaRoomById);

router.get("/cinema-rooms/:cinemaId", getAllCinemaRooms);

router.put(
  "/cinema-rooms/:id",
  validate(updateCinemaRoomSchema),
  updateCinemaRoom,
);

router.delete("/cinema-rooms/:id", deleteCinemaRoom);

// showtime
router.post("/showtime", validate(createShowtimeSchema), createShowtime);

router.get("/showtime", getAllShowtimes);

router.get("/showtime/:id", getShowtimeById);

router.put("/showtime/:id", validate(updateShowtimeSchema), updateShowtime);

router.delete("/showtime/:id", deleteShowtime);

// showtime seat
router.post(
  "/showtime-seat/:id/reserve",
  authMiddleware,
  reserveShowtimeSeatController,
);

router.post(
  "/showtime-seat/:id/release",
  authMiddleware,
  releaseShowtimeSeatController,
);

router.post(
  "/showtime-seat/:id/confirm",
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

router.post("/seat/generate", generateSeats);

router.get("/seat", getAllSeats);

router.get("/seat/room/:roomId", getSeatsByRoom);

router.get("/seat/:id", getSeatById);

router.put("/seat/:id", validate(updateSeatSchema), updateSeat);

router.delete("/seat/:id", deleteSeat);

// movies List
router.get(
  "/movies/list",
  validate(movieListQuerySchema),
  getMoviesListController,
);

// movie detail by slug
router.get("/movies/detail/:slug", getMovieDetailController);

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
  "/",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  validate(createTrailerSchema),
  createTrailerController,
);

router.get("/movie/:movieId", getTrailersByMovieController);

router.get("/:id", getTrailerByIdController);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  validate(updateTrailerSchema),
  updateTrailerController,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  deleteTrailerController,
);

// search
router.get("/", validate(movieSearchSchema), searchMoviesController);

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
router.post("/payment/vnpay", createVnpayPaymentController);
router.get("/payment/vnpay-return", vnpayReturnController);
// momo
router.post("/payment/momo/create", createMoMoController);
router.post("/payment/momo/ipn", momoIPNController);
router.get("/payment/momo/return", momoReturnController);
// dashboard
router.get(
  "/admin/dashboard",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  // adminDashboardController,
);
export default router;
