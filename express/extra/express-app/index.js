// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   const code = `<h1>Fruits</h1><ul><li>Apple</li><li>Orange</li></ul>`;
//   res.send(code);
// });

// app.get("/apple", (req, res) => {
//   const code = `<h1>Fruits</h1><ul><li>Apple</li></ul>`;
//   res.send(code);
// });

// app.get("/orange", (req, res) => {
//   const code = `<h1>Fruits</h1><ul><li>Orange</li></ul>`;
//   res.send(code);
// });
//.-----------------------------------------------------------------
// app.get("/:username/:id", (req, res) => {
//   const { username, id } = req.params;
//   const htmlStr = `Welcome to the page of @${username}`;
//   res.send(htmlStr);
// });
//------------------------------------------------------------------
// app.get("/search", (req, res) => {
//   const { q } = req.query;
//   if (!q) {
//     res.send(`<h1>Nothing Sand</h1>`);
//   }
//   res.send(`<h1>Search reasult for query: ${q}</h1>`);
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`server is running on http://localhost:${port}`);
// });

