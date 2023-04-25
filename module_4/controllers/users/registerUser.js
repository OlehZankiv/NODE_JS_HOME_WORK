import { responseMessageCreator } from "../../utils/error.js";
import { validateUser } from "../../validations/index.js";
import { registerUser as registerUserService } from "../../services/users.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const newUser = { email, password };

    const validation = validateUser(newUser);

    if (validation.error?.message)
      return res
        .status(400)
        .json(responseMessageCreator(validation.error.message));

    const createdUser = await registerUserService(newUser);

    res.status(201).json(createdUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
