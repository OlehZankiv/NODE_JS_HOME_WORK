import mongoose from "mongoose";
import bCrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
});

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

export const User = mongoose.model("user", userSchema);
