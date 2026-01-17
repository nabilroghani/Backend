const express = require("express");
const router = require("./route");

const app = express();

app.use("/user", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
