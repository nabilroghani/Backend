const express = require("express");

const app = express();

const PORT = 3000;

app.use("/about", (req, res, next) => {
  console.log(`A new request recieved At ${Date.now()}`);
  next();
});

app.get("/about", (req, res) => {
  res.send("hello about page");
});

app.get("/", (req, res) => {
  res.send("hello express");
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
