import express from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  repeatVerifyUser,
  uploadAvatar,
  verifyUser,
} from "../controllers/users/index.js";
import { jwtMiddleware, uploadAvatarMiddleware } from "../middlewares/index.js";

export const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", jwtMiddleware, logoutUser);

router.get("/current", jwtMiddleware, getCurrentUser);
router.patch("/avatars", jwtMiddleware, uploadAvatarMiddleware, uploadAvatar);
router.get("/verify/:verificationToken", verifyUser);
router.post("/verify", repeatVerifyUser);
