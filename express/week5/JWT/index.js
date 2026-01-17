const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

const PORT = 3000;
const users = [];
const SECRET_KEY = "mysecretkey";

// SIGNUP
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    username: username,
    password: hashedPassword,
  });

  res.send("Signup successful");
});

// SIGNIN
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.send("User Not Found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.send("Wrong Password");
  }

  // JWT Generate
  const token = jwt.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({
    message: "Login Successful",
    token: token,
  });
});

// AUTH MIDDLEWARE
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.send("Token Missing");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.send("Invalid token");
    }

    req.user = decoded;
    next();
  });
};

// PROTECTED ROUTE
app.get("/home", authMiddleware, (req, res) => {
  res.send(`Welcome ${req.user.username}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
