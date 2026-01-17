require("dotenv").config();

const express = require("express");

const userRoute = require("./routes/user.routes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
