import { responseMessageCreator } from "../utils/error.js";
import { getUserById } from "../services/users.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const secretKey = process.env.TOKEN_SECRET;

export const jwtMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  token = token.startsWith("Bearer ") ? token.slice(7) : token;

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json(responseMessageCreator(err.message + " " + token));
    else {
      const user = await getUserById(decoded.id);

      if (!user)
        return res.status(401).json(responseMessageCreator("Not authorized"));

      req.user = user;

      next();
    }
  });
};
