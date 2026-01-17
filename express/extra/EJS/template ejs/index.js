const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.get("/nabil", (req, res) => {
  res.render("home.ejs");
});
const port = 3000;
app.listen(port, () => {
  console.log("server is running");
});
