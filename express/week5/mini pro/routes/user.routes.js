const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controller/user.controller");
const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.post("/", getUser);

module.exports = route;
