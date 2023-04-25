import Joi from "joi";
import { passwordValidation, emailValidation } from "./utils.js";

const userValidationSchema = Joi.object({
  email: emailValidation,
  password: passwordValidation,
}).unknown(true);

export const validateUser = (user) => userValidationSchema.validate(user);
