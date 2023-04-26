import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const user = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "User should be uniq"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  {
    methods: {
      setPassword: function (password) {
        this.password = bcryptjs.hashSync(password, 8);
      },
      checkPassword: function (password) {
        return bcryptjs.compareSync(password, this.password);
      },
    },
  }
);

export const User = mongoose.model("users", user);
