import Joi from "joi";
import { emailValidation } from "./utils.js";

const nameValidation = Joi.string().uppercase().min(3).max(30).required();
const phoneValidation = Joi.string().min(8).max(20).required();

const favoriteValidation = Joi.boolean();

const contactValidationSchema = Joi.object({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
}).unknown(true);

export const validateContact = (contact) =>
  contactValidationSchema.validate(contact);

export const validateFavoriteContact = (favorite) =>
  favoriteValidation.validate(favorite);
