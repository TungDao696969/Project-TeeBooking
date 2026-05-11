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
router.post("/movies", createMovie);

router.get("/movies", getMovies);

router.get("/movies/:id", getMovieById);

router.patch("/movies/:id", updateMovie);

router.delete("/movies/:id", deleteMovie);

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

// dashboard
router.get(
  "/admin/dashboard",
  authMiddleware,
  roleMiddleware(UserRole.admin),
  // adminDashboardController,
);
export default router;
