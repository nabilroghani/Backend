const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
const userRoute = require("./routes/user.routes");

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
