import express from "express";
import * as ctrlTask from "../controller/index.js";

export const router = express.Router();

router.get("/tasks", ctrlTask.get);

router.get("/tasks/:id", ctrlTask.getById);

router.post("/tasks", ctrlTask.create);

router.put("/tasks/:id", ctrlTask.update);

router.patch("/tasks/:id/status", ctrlTask.updateStatus);

router.delete("/tasks/:id", ctrlTask.remove);
