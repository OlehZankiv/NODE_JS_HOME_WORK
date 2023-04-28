import { User } from "../models/index.js";

export const registerUser = async (body) => {
  const newUser = await User.create(body);
  newUser.setPassword(body.password);
  return newUser.save();
};

export const getUserByEmail = (email) => User.findOne({ email });

export const getUserById = (id) => User.findById(id);
