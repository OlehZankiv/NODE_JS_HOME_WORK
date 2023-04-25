import { responseMessageCreator } from "../../utils/error.js";
import { validateUser } from "../../validations/index.js";
import {
  registerUser as registerUserService,
  getUserByEmail as getUserByEmailService,
} from "../../services/users.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validation = validateUser(newUser);

    if (validation.error?.message)
      return res
        .status(400)
        .json(responseMessageCreator(validation.error.message));

    const user = await getUserByEmailService(email);

    if (user)
      return res.status(409).json(responseMessageCreator("Email in use"));

    const newUser = { email, password };

    const createdUser = await registerUserService(newUser);

    res.status(201).json({ createdUser });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
