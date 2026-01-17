const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const random = Math.floor(Math.random() * 6) + 1;
  res.render("rollDice.ejs", { random });
});
const port = 3000;
app.listen(port, () => {
  console.log("server is running");
});
