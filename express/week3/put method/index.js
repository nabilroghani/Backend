const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Home page");
});

app.post("/user", (req, res) => {
  const { username, password } = req.body;
  res.json({
    message: `user${username} with email ${username}`,
  });
});

app.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  res.json({
    message: `username is updated for user ${userId}`,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
