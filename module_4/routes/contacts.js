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

router.get("/", getContacts);

router.get("/:contactId", getContact);

router.post("/", createContact);

router.put("/:contactId", updateContact);

router.delete("/:contactId", deleteContact);

router.patch("/:contactId/favorite", updateStatusContact);
