const express = require("express");
require("dotenv").config();
const app = express();
const PORT = 3000;
const userRoute = require("./routes/user.routes");

app.use(express.json());

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
