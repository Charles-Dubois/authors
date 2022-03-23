const express = require("express");
const app = express();
//postgreSQL
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
// mongoDB
const mongoose = require("mongoose");
const mongoKey = require("./mongoKey");
const Authors = require("./models/authorsModel");
app.use(express.json());
mongoose
  .connect(mongoKey, {
    useNewUrlParser: true,
  })
  .then(() => console.log("mongo connection done"))
  .catch((err) => console.log(err));

app.get("/", (_req, res, _next) => {
  res.send("Authors API");
});

app.post("/authors", async (req, res) => {
  try {
    await Authors.create(req.body);
  } catch (err) {
    console.log(err);
    return res.status(400).send("error 400");
  }
  res.status(201).json({ message: "author added", descriprtion: req.body });
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
  //* Mongo

  let authorsResult;

  try {
    authorsResult = await Authors.findById(req.params.id);
  } catch (err) {
    console.log(err);
    return res.status(400).send("error 400");
  }

  authorsResult = {
    name: authorsResult.name,
    nationality: authorsResult.nationality,
  };
  res.json(authorsResult);

  // exemple of Id : 623b2032bf13aab4833a929d

  // 623b2073b5ce3b37e8875b14

  //* postgreSQL
  // const authorsId = req.params.id - 1;
  // let author;
  // try {
  //   author = await Postgres.query("SELECT name, nationality FROM authors");
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).json({
  //     message: "Error",
  //   });
  // }
  // res.json(author.rows[authorsId]);
});

app.get("/json/authors/:id/books", async (req, res, _next) => {
  //* Mongo
  let booksResults;
  try {
    booksResults = await Authors.findById(req.params.id).select("books");
  } catch (err) {
    console.log(err);
    return res.status(400).send("error 400");
  }
  booksResults = booksResults.books;

  res.json(booksResults);
  // exemple of Id : 623b2032bf13aab4833a929d
  // 623b2073b5ce3b37e8875b14
  //* postgreSQL
  // const authorsId = req.params.id - 1;
  // let author;
  // try {
  //   author = await Postgres.query("SELECT books FROM authors");
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).json({
  //     message: "Error",
  //   });
  // }
  // res.json(author.rows[authorsId]);
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
