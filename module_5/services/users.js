import { User } from "../models/index.js";
import gravatar from "gravatar";

export const registerUser = async (body) => {
  const newUser = await User.create(body);
  newUser.avatarURL = gravatar.url(body.email, { protocol: "https" });
  newUser.setPassword(body.password);

  return newUser.save();
};

export const getUserByEmail = (email) => User.findOne({ email });

export const getUserById = (id) => User.findById(id);
