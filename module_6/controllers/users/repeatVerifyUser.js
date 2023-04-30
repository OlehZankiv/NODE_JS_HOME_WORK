import { responseMessageCreator } from "../../utils/error.js";
import { getUserByEmail } from "../../services/users.js";
import { validateEmail } from "../../validations/index.js";

export const repeatVerifyUser = async (req, res, next) => {
  const { email } = req.body;

  if (!email)
    return res
      .status(400)
      .json(responseMessageCreator("missing required field email"));

  const validation = validateEmail(email);

  if (validation.error?.message)
    return res
      .status(400)
      .json(responseMessageCreator(validation.error.message));

  try {
    const user = await getUserByEmail(email);

    if (!user)
      return res.status(404).json(responseMessageCreator("User not found"));

    if (user.verify)
      return res
        .status(400)
        .json(responseMessageCreator("Verification has already been passed"));

    return res
      .status(200)
      .json(responseMessageCreator("Verification email sent"));
  } catch (e) {
    console.error(e);
    next(e);
  }
};
