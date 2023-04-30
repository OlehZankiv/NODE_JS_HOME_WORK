import { responseMessageCreator } from "../../utils/error.js";
import { getUserByVerificationToken } from "../../services/users.js";

export const verifyUser = async (req, res, next) => {
  const verificationToken = req.params.verificationToken;

  if (!verificationToken)
    return res
      .status(400)
      .json(
        responseMessageCreator("You should set verificationToken in the url")
      );

  try {
    const user = await getUserByVerificationToken(verificationToken);

    if (!user) res.status(404).json(responseMessageCreator("User not found"));

    user.verificationToken = null;
    user.verify = true;
    await user.save();

    res.status(200).json(responseMessageCreator("Verification successful"));
  } catch (e) {
    console.error(e);
    next(e);
  }
};
