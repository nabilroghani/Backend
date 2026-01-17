const express = require("express");

const app = express();

app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.json({
    message: `username is ${email}, and passowrd is ${password}`,
  });
});

app.post("/signup", (req, res) => {
  const { email, password, name } = req.body;
  res.status(300).json({
    name: name,
    email: email,
    password: password,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
