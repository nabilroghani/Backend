const express = require("express");

const app = express();

// home page
app.get("/", (req, res) => {
  res.send("Welcome to my first backend server");
});

// about page
app.get("/about", (req, res) => {
  res.send("welcome to about page");
});

const port = 3000;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
