const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("Acces denied. Token missing");
    }

    // verify token
    const decoded = jwt.verify(authHeader, process.env.SECRET);

    next();
  } catch (error) {
    return res.status(401).send("Invalid or expired token");
  }
};

module.exports = userMiddleware;
