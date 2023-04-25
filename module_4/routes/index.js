import { router as contactsRouter } from "./contacts.js";
import { router as usersRouter } from "./users.js";
import { jwtMiddleware } from "../middlewares/jwt.js";
import { Router } from "express";

export const mainRouter = Router();

mainRouter.use("/contacts", jwtMiddleware, contactsRouter);
mainRouter.use("/users", usersRouter);
