const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express",
    info: process.env.NODE_ENV + "_" + process.env.SECRET_KEY,
  });
});

router.post("/login", function (req, res, next) {
  res.render("response", {
    title: "TITLe",
    ...req.body,
  });
});

module.exports = router;
