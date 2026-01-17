const express = require("express");
const {
  createUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");
const authMiddleware = require("../middleware/user.middleware");

const route = express.Router();

route.post("/create-user", createUser);
route.post("/login-user", loginUser);
route.get("/get-user", authMiddleware, getUsers);
route.put("/update-user/:id", authMiddleware, updateUser);
route.delete("/delete-user/:id", authMiddleware, deleteUser);

module.exports = route;
