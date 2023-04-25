import express from "express";
import { jwtMiddleware } from "../middlewares/jwt.js";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/users/index.js";

export const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/logout", jwtMiddleware, logoutUser);
