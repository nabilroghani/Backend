const express = require("express");
const { signupUser, getuser } = require("../controller/user.controller");
const route = express.Router();

route.post("/signup", signupUser);
route.get("/get-user", getuser);

module.exports = route;
