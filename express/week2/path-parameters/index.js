const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Home page");
});

//----------params------------------
app.get("/:username", (req, res) => {
  const { username } = req.params;
  const htmlString = `<h1>welcome Mr ${username}</h1>`;
  res.send(`${htmlString}`);
});

app.get("/room-no/:id", (req, res) => {
  const { id } = req.params;
  const roomNo = `<h1>your Room Number is <mark>${id}</mark></h1>`;
  res.send(`${roomNo}`);
});

//-------------Query Strings--------------
// app.get("/search", (req, res) => {
//   //   console.log(req.query);
//   const { q } = req.query; //http://localhost:3000/search?q='nabil'
//   res.send(`result is ${q}`);
// });

const port = 3000;

app.listen(port, () => {
  console.log(`your app running`);
});
