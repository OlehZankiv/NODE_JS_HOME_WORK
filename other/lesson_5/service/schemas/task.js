import mongoose, { Schema } from "mongoose";

const task = new Schema(
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 70,
    },
    text: {
      type: String,
      minlength: 3,
      maxlength: 170,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Task = mongoose.model("task", task);
