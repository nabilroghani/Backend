const express = require("express");
const path = require("path"); // safer for joining paths
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Correct path to the views folder
app.set("views", path.join(__dirname, "views"));

app.get("/inst/:username", (req, res) => {
  const { username } = req.params;
  const followers = ["Azhar", "Minal", "Ahmad", "Mohsin"];
  res.render("instagram.ejs", { username, followers }); // looks for instagram.ejs inside /views
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
