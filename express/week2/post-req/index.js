const express = require("express");
const app = express();

app.use(express.json()); // 1. Dabbe (Body) ko kholne wala tool

// Jab user apna data bheje ga
app.post("/register", (req, res) => {
  // 2. req.body ke paas sara data hai jo user ne bheja
  const user_ka_naam = req.body.name;
  const user_ki_email = req.body.email;
  res.send(`Mubarak ho! ${user_ka_naam} ki registration ho gayi.`);
});

app.get("/user/:username", (req, res) => {
  const username = req.params.username;
  res.status(200).send(`welcome ${username}`);
});

app.listen(3000, () => {
  console.log("server running");
});
