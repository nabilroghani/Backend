const express = require("express");

const app = express();

const user = require("./routes/user.routes");

app.use(express.json());

app.use("/api/v1/user", user);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
