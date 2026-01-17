const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("nabil ahmad roghani");
});

const port = 3000;

app.listen(port, () => {
  console.log(`server running on http//localhost:${port}`);
});
