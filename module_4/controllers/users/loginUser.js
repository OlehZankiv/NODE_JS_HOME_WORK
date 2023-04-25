import { responseMessageCreator } from "../../utils/error.js";
import { validateUser } from "../../validations/index.js";
import { getUserByEmail as getUserByEmailService } from "../../services/users.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const tokenSecret = process.env.TOKEN_SECRET;

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validation = validateUser({ email, password });

    if (validation.error?.message)
      return res
        .status(400)
        .json(responseMessageCreator(validation.error.message));

    const user = await getUserByEmailService(email);

    if (!user || !user.checkPassword(password))
      return res
        .status(401)
        .json(responseMessageCreator("Email or password is wrong"));

    const token = jwt.sign({ email: user.email, id: user._id }, tokenSecret, {
      expiresIn: "1w",
    });

    res.status(200).json({ token, user });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
