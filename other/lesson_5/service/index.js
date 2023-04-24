import { Task } from "./schemas/task.js";

export const getAlltasks = Task.find;

export const getTaskById = (id) => Task.findOne({ _id: id });

export const createTask = ({ title, text }) => Task.create({ title, text });

export const updateTask = (id, fields) =>
  Task.findByIdAndUpdate({ _id: id }, fields, { new: true });

export const removeTask = (id) => Task.findByIdAndRemove({ _id: id });
