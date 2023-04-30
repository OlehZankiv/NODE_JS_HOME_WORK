import { responseMessageCreator } from "../../utils/error.js";
import { getUserById as getUserByIdService } from "../../services/users.js";

export const logoutUser = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.user._id);

    if (!user) res.status(401).json(responseMessageCreator("Not authorized"));

    user.token = null;
    await user.save();
    res.status(204).json();
  } catch (e) {
    console.error(e);
    next(e);
  }
};
