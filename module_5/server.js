import { app } from "./app.js";
import mongoose from "mongoose";
import { DB_URI, PORT } from "./utils/constants.js";

const runServer = () =>
  app.listen(PORT, () => {
    console.log("Server running. Use our API on port: 3000");
  });

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Database connection successful");
    runServer();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
