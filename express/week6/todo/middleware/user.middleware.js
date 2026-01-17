const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send("Token missing");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send("Invalid token format");
    }

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).send("Invalid or expired token");
  }
};

module.exports = authMiddleware;
