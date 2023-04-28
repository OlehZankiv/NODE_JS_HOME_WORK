import { responseMessageCreator } from "../utils/error.js";
import { TOKEN_SECRET } from "../utils/constants.js";
import { getUserById } from "../services/users.js";
import jwt from "jsonwebtoken";

export const jwtMiddleware = (req, res, next) => {
  let token = req.headers.authorization || "";
  token = token.startsWith("Bearer ") ? token.slice(7) : token;

  jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json(responseMessageCreator(err.message + " " + token));

    const user = await getUserById(decoded.id);

    if (!user || !user.token || user.token !== token)
      return res.status(401).json(responseMessageCreator("Not authorized"));

    req.user = user;

    next();
  });
};
