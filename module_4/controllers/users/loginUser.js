import { responseMessageCreator } from "../../utils/error.js";
import { validateUser } from "../../validations/index.js";
import {
  registerUser as registerUserService,
  getUserByEmail as getUserByEmailService,
} from "../../services/users.js";

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
      return res.status(401).json(responseMessageCreator("Not authorized"));

    // const newUser = { email, password };

    // const createdUser = await registerUserService(newUser);
    res.status(200).json({ token: "", user });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
