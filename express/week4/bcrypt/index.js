const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

app.use(express.json());

const users = [];

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // password ko hash karo
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    username,
    password: hashedPassword,
  });
  console.log("Original password:", password);
  console.log("Hashed password:", hashedPassword);

  res.send("Signup Succesfully...");
});

app.get("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username == username);

  if (!user) {
    return res.send("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    res.send("Login Succesfully...");
  } else {
    res.send("Wrong Password!");
  }
});

app.listen(PORT, () => {
  console.log(`server runnuing on http://localhost:${PORT}`);
});
