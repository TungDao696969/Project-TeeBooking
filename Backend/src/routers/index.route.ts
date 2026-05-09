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
import { upload } from "../middlewares/upload.middleware";
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
router.get("/users/address/:addressId", authMiddleware, getAddressByIdController);
router.put("/users/address/:addressId", authMiddleware, updateUserAddress);
router.delete("/users/address/:addressId", authMiddleware, deleteAddressController);
router.patch(
  "/users/address/:addressId/default",
  authMiddleware,
  setDefaultAddressController,
);
export default router;
