const express = require("express");
const app = express();
const authors = [
  {
    name: "Lawrence Nowell",
    nationality: "UK",
    books: ["Beowulf"],
  },
  {
    name: "William Shakespeare",
    nationality: "UK",
    books: ["Hamlet", "Othello", "Romeo and Juliet", "MacBeth"],
  },
  {
    name: "Charles Dickens",
    nationality: "US",
    books: ["Oliver Twist", "A Christmas Carol"],
  },
  {
    name: "Oscar Wilde",
    nationality: "UK",
    books: ["The Picture of Dorian Gray", "The Importance of Being Earnest"],
  },
];
app.get("/", (_req, res, _next) => {
  res.json("Authors API");
});

app.get("/authors/:authorsId", (req, res, _next) => {
  const authorsId = authors[parseInt(req.params.authorsId) - 1];
  if (!authorsId) {
    return res.json({ errorMessage: "The Id of our API start form 1 to 4" });
  }
  const authorInfos = `${authorsId.name}, ${authorsId.nationality}`;
  res.json(authorInfos);
});

app.get("/authors/:authorsId/books", (req, res, _next) => {
  const authorsId = authors[parseInt(req.params.authorsId) - 1];
  if (!authorsId) {
    return res.json({ errorMessage: "The Id of our API start form 1 to 4" });
  }
  const authorBooks = authorsId.books;

  res.json(authorBooks);
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
