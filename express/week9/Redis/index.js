const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient();

client.connect().then(() => console.log('Connected to Redis!'));
app.get("/", async (req, res) => {
  try {
    const key = "User_Data";
    const cachedData = await client.get(key);

    if (cachedData) {
      console.log("Serving from Cache");
      return res.json(JSON.parse(cachedData));
    }

    // Agar cache miss hua
    const DB_Data = { id: 2, name: "nabil ahmad", status: "active" };
    await client.setEx(key, 3600, JSON.stringify(DB_Data));
    
    console.log("Serving from DB");
    return res.json(DB_Data);

  } catch (error) {
    console.error("Redis Error:", error);
    res.status(500).send("Server Error");
  }
});

app.listen(3000, ()=> {
    console.log("server running on http://localhost:3000");
})