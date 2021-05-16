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

//Use express.static to serve “documentation.html” file from the public folder
app.use(express.static("public"));
//morgan a preexisting library as your logging middleware, would be equipped to log any and all information that you could want about a request.
app.use(morgan("common"));
//created an Express GET route located at the endpoint “/movies” that returns a JSON object containing data about Favorite 10 movies.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke");
});
//Get requests
app.get("/movies", (req, res) => {
  res.json(topMovies);
});
app.get("/", (req, res) => {
  res.send("Welcome to my App");
});

//listen for requests
app.listen(8080, () => {
  console.log("Your App is listening to port 8080");
});
