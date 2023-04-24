import { app } from "./app.js";

const PORT = process.env.PORT || 3000;

const runServer = () =>
  app.listen(PORT, () => {
    console.log("Server running. Use our API on port: 3000");
  });

runServer();
