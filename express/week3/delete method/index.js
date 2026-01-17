const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to home");
});

app.post("/user", (req, res) => {
  const { username } = req.body;
  res.json({
    message: `your name is ${username}`,
  });
});

app.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  const { username } = req.body;
  res.json({
    message: `${username} Your name is updated to ${userId}`,
  });
});

app.delete("/user/:id", (req, res) => {
  const deleted = req.params.id;
  res.json({
    message: `your data is deleted succesfuly ${deleted}`,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
