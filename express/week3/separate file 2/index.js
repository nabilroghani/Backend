const express = require("express");
const app = express();
const PORT = 3000;

const userRouter = require("./routes/user.router");

app.use(express.json());

app.use(userRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
