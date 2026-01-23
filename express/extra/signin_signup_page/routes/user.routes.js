const express = require("express");
const {
  signupUser,
  getuser,
  loginUser,
} = require("../controller/user.controller");

const router = express.Router();

router.post("/signup", signupUser);
router.get("/get-user", getuser);
router.post("/login-user", loginUser);

module.exports = router;
