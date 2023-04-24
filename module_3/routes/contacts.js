import express from "express";
import {
  createContactController,
  deleteContactController,
  getContactContoller,
  getContactsContoller,
  updateContactController,
  updateStatusContactController,
} from "../controllers/contacts.js";

export const router = express.Router();

router.get("/", getContactsContoller);

router.get("/:contactId", getContactContoller);

router.post("/", createContactController);

router.put("/:contactId", updateContactController);

router.delete("/:contactId", deleteContactController);

router.patch("/:contactId/favorite", updateStatusContactController);
