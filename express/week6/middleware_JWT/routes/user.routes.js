const express = require("express");
const { createUser, getUser } = require("../controller/user.controller");

const route = express.Router();

route.post("/create-user", createUser);
route.get("/", getUser);

module.exports = route;
