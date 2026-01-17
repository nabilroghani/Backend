const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUsers,
  login,
} = require("../controllers/user.controller");

router.post("/register", registerUser);

router.get("/", getUsers);

router.post("/login", login);

module.exports = router;

["", 1, "0", undefined, "22", false, true, null, 0, 29];
