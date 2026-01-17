const express = require("express");
const {
  registerUsers,
  loginUser,
  getUsers,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/sign-up", registerUsers);
router.post("/sign-in", loginUser);
router.get("/", getUsers);

module.exports = router;
