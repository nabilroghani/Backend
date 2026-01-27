const express = require("express");
require("dotenv").config();
const app = express();
const PORT = 3000;

console.log("URI Check:", process.env.MONGO_URI ? "Found ✅" : "Not Found ❌");
console.log("Key Check:", process.env.SECRET_KEY ? "Found ✅" : "Not Found ❌");

const router = require("./routes/user.router");
const connectDB = require("./config/db");

app.use(express.json());

connectDB();

app.use("/user", router);

app.listen(PORT, ()=> {
    console.log(`server running on http://localhost:${PORT}`);
})