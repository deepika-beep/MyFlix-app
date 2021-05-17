const express = require("express");
const app = express();
const morgan = require("morgan");
let topMovies = [
  {
    Movie: " A Space Odyssey",
    Year: "2001"
  },
  {
    Movie: "The Godfather",
    Year: "1972"
  },
  {
    Movie: "Citizen Kane",
    Year: "1941"
  },
  {
    Movie: "Avatar",
    Year: "2010"
  },
  {
    Movie: "The Lord of the Rings: The Fellowship of the Ring",
    Year: "2001"
  },
  {
    Movie: "The Dark Knight",
    Year: "2008"
  },
  {
    Movie: 'Pan"/s" Labyrinth',
    Year: "2006"
  },
  {
    Movie: "Titanic",
    Year: "1998"
  },
  {
    Movie: "The Conjuring",
    Year: "2013"
  },
  {
    Movie: "Inception",
    Year: "2010"
  }
];

app.use(express.static("public"));

app.use(morgan("common"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke");
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});
app.get("/", (req, res) => {
  res.send("Welcome to my App");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});
app.listen(8080, () => {
  console.log("Your App is listening to port 8080");
});
