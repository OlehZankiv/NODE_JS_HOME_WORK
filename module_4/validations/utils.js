import Joi from "joi";

export const emailValidation = Joi.string().email().required();
export const passwordValidation = Joi.string().min(6).max(24).required();
