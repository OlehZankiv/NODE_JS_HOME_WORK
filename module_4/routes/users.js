import express from "express";
import { registerUser } from "../controllers/users/index.js";

export const router = express.Router();

router.post("/register", registerUser);
