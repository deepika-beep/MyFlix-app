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

//GET request to display  data about all movies
app.get("/movies", (req, res) => {
  res.status(201).json(topMovies);
});
//GET request to display a movie by title
app.get("/movies/:title", (req, res) => {
  res.send("Successful GET displaying a movie.");
});
//GET request to display a genre (by name)
app.get("/genre/:title/:name", (req, res) => {
  res.send("Successful GET request returning GENRE.");
});
//GET request to display a Director (by name)
app.get("/director/:name", (req, res) => {
  res.json(
    topMovies.find(director => {
      return director.name == req.params.name;
    })
  );
});
//POST request to create new user
app.post("/users", (req, res) => {
  res.send("Successful POST request returning registration of a user.");
});
//PUT request updating user info
app.put("/users/:username", (req, res) => {
  res.send("Successful PUT request returning the user info is updated.");
});
//POST request adding user's favorite movies
app.post("/users/:username/Favorites", (req, res) => {
  res.send(
    "Successful POST request returning the list of user's favorite movies that was added."
  );
});
//DELETE request for deleting a movie
app.delete("/users/:username/Favorites/:movie", (req, res) => {
  res.send(
    "Successful DELETE request returning the message movie is deleted from user's list of favorites."
  );
});
//DELETE request for deregistration
app.delete("/users/:username", (req, res) => {
  res.send(
    "Successful DELETE request returning the message user is Deregistered successfully."
  );
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
