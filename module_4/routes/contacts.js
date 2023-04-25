import express from "express";
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
  updateStatusContact,
} from "../controllers/contacts/index.js";
import { jwtMiddleware } from "../middlewares/jwt.js";

export const router = express.Router();

router.get("/", jwtMiddleware, getContacts);

router.get("/:contactId", jwtMiddleware, getContact);

router.post("/", jwtMiddleware, createContact);

router.put("/:contactId", jwtMiddleware, updateContact);

router.delete("/:contactId", jwtMiddleware, deleteContact);

router.patch("/:contactId/favorite", jwtMiddleware, updateStatusContact);
