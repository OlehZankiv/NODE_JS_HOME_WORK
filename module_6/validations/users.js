import Joi from "joi";
import { emailValidation, passwordValidation } from "./utils.js";

const userValidationSchema = Joi.object({
  email: emailValidation,
  password: passwordValidation,
}).unknown(true);

export const validateUser = (user) => userValidationSchema.validate(user);
export const validateEmail = (email) => emailValidation.validate(email);
