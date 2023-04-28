import { responseMessageCreator } from "../../utils/error.js";
import { getUserById as getUserByIdService } from "../../services/users.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.user._id);

    if (!user) res.status(401).json(responseMessageCreator("Not authorized"));

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
