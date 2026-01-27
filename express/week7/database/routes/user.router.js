const express = require("express");
const { userRegister, getUser, loginUser } = require("../controller/user.controller");
const {verifyToken} = require("../middleware/user.middleware");
const router = express.Router();

router.post("/register", userRegister);

router.post("/login-user", loginUser);

router.get("/get-user",verifyToken, getUser)

module.exports = router;