const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

const SECRET_KEY = "mysecretkey"; // real project me env file

const users = [];

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  users.push({
    username: username,
    password: hashPassword,
  });
  res.send("signup Succesful");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username == username);

  if (!user) res.send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) res.send("Wrong Password");

  res.json({
    message: "login succesfull",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
