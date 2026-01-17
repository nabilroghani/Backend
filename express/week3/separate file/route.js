const express = require("express");
const { userLogin, userSignup } = require("./controller");

const router = express.Router();

router.get("/login", userLogin);
router.get("/signup", userSignup);

module.exports = router;
