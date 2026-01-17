const express = require("express");
require("dotenv").config();

const userRoute = require("./routes/user.route");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
