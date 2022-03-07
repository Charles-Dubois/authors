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
// version send
app.get("/authors/:authorsId", (req, res, _next) => {
  const authorsId = authors[parseInt(req.params.authorsId) - 1];
  if (!authorsId) {
    return res.json({ errorMessage: "The Id of our API start form 1 to 4" });
  }
  const authorInfos = `${authorsId.name}, ${authorsId.nationality}`;
  res.send(authorInfos);
});

app.get("/authors/:authorsId/books", (req, res, _next) => {
  const authorsId = authors[parseInt(req.params.authorsId) - 1];
  if (!authorsId) {
    return res.json({ errorMessage: "The Id of our API start form 1 to 4" });
  }

  res.send(authorsId.books.join(", "));
});

// version json
app.get("/json/authors/:authorsId", (req, res, _next) => {
  const authorsId = authors[parseInt(req.params.authorsId) - 1];
  if (!authorsId) {
    return res.json({ errorMessage: "The Id of our API start form 1 to 4" });
  }
  res.json({
    name: authorsId.name,
    nationality: authorsId.nationality,
  });
});

app.get("/json/authors/:authorsId/books", (req, res, _next) => {
  const authorsId = authors[parseInt(req.params.authorsId) - 1];
  if (!authorsId) {
    return res.json({ errorMessage: "The Id of our API start form 1 to 4" });
  }

  res.json({ books: authorsId.books });
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
