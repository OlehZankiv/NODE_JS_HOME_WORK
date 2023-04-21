import express from "express";

export const router = express.Router();

router
  .route("/user")
  .get((_, res) => {
    res.send("Get User");
  })
  .post((_, res) => {
    res.send("Post User");
  })
  .delete((req, res) => {
    res.send("Delete User: " + req.body.id);
  });
