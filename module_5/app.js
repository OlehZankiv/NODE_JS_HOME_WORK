import express from "express";
import logger from "morgan";
import cors from "cors";
import { responseMessageCreator } from "./utils/error.js";
// ROUTERS
import { mainRouter } from "./routes/index.js";

export const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.static("./public"));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api", mainRouter);

app.use((_, res) => {
  res.status(404).json(responseMessageCreator("Not found"));
});

app.use((err, _, res) => {
  console.error(err.stack);
  res.status(500).json(responseMessageCreator(err.message));
});
