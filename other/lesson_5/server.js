import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { router } from "./api/index.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/tasks",
    data: "Not found",
  });
});

app.use((err, _, res) => {
  console.error(err.stack);

  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running. Use our API on port: ${PORT}`)
    )
  )
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
