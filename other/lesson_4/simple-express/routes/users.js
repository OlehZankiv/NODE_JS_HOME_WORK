const express = require("express");
const router = express.Router();

const contacts = [
  { id: "1", username: "Felix", surname: "Brown", email: "felix@test.com" },
  { id: "2", username: "Sonya", surname: "Redhead", email: "sonya@test.com" },
  { id: "3", username: "Conan", surname: "Barbarian", email: "conan@test.com" },
];

/* GET users listing. */
router.get("/", function (_, res) {
  res.json(contacts);
});

router.get("/:id", function (req, res) {
  res.json(contacts.find((contact) => contact.id === req.params.id) || null);
});

module.exports = router;

module.exports = router;
