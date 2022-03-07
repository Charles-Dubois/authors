const express = require("express");
const app = express();

app.get("/", (_req, res, _next) => {
  res.send("Hello from author");
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
