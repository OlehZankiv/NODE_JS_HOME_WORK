import { convertImageToAvatar } from "../../utils/imageUploader.js";
import { getUserById } from "../../services/users.js";
import { responseMessageCreator } from "../../utils/error.js";
import { PORT } from "../../utils/constants.js";
import { avatarsPath } from "../../utils/path.js";

export const uploadAvatar = async (req, res, next) => {
  try {
    const user = await getUserById(req.user._id);
    if (!user) res.status(401).json(responseMessageCreator("Not authorized"));

    const fileExtension = req.file.originalname.match(/\.[0-9a-z]+$/i)[0];
    const avatarName = `avatar_for_${user.email.split("@")[0]}${fileExtension}`;

    const avatar = await convertImageToAvatar(req.file.path);
    avatar.write(`${avatarsPath}/${avatarName}`);

    user.avatarURL = `http://localhost:${PORT}/avatars/${avatarName}`;

    await user.save();

    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
