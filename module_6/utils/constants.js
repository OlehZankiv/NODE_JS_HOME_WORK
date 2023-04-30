import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
export const DB_URI = process.env.DB_URI;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const SENDER_EMAIL_LOGIN = process.env.SENDER_EMAIL_LOGIN;
export const EMAIL_TOKEN = process.env.EMAIL_TOKEN;
