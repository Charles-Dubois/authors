const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
app.use(express.json());

app.get("/", (_req, res, _next) => {
  res.json("Authors API");
});

app.get("/authors/:id", async (req, res, _next) => {
  const authorsId = req.params.id - 1;

  let author;
  try {
    author = await Postgres.query("SELECT name, nationality FROM authors");
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Error",
    });
  }
  const result = author.rows[authorsId];
  res.send(`${result.name}, ${result.nationality}`);
});

app.get("/authors/:id/books", async (req, res, _next) => {
  const authorsId = req.params.id - 1;
  let author;
  try {
    author = await Postgres.query("SELECT books FROM authors");
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Error",
    });
  }
  const result = author.rows[authorsId].books;

  res.send(result.join(", "));
});

//version json

app.get("/json/authors/:id", async (req, res, _next) => {
  const authorsId = req.params.id - 1;

  let author;
  try {
    author = await Postgres.query("SELECT name, nationality FROM authors");
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Error",
    });
  }

  res.json(author.rows[authorsId]);
});

app.get("/json/authors/:id/books", async (req, res, _next) => {
  const authorsId = req.params.id - 1;

  let author;
  try {
    author = await Postgres.query("SELECT books FROM authors");
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Error",
    });
  }

  res.json(author.rows[authorsId]);
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
