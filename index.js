const mongoose = require("mongoose");
const Models = require("./model.js");

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;
const Actors = Models.Actor;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(morgan("common"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke");
});

//GET request to display  data about all movies
app.get("/movies", (req, res) => {
  Movies.find().then(movies => {
    res.status(201).json(movies);
  });
  //GET request to display a movie by title
  app.get("/movies/:Title", (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then(movie => {
        res.json(movie);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  });

  //GET request to display a genre (by name)
  app.get("/Genre/:Name", (req, res) => {
    Genres.findOne({ Title: req.params.Title })
      .then(genre => {
        res.json(genre);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  });
  //GET request to display a Director (by name)
  app.get("/Director/:Name", (req, res) => {
    Directors.findOne({ Name: req.params.Name })
      .then(director => {
        res.json(director);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  });

  //GET request to display a Actor (by name)
  app.get("/Actor/:Name", (req, res) => {
    Actors.findOne({ Name: req.params.Name })
      .then(actor => {
        res.json(actor);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  });
  //POST request to create new user
  app.post("/users", (req, res) => {
    Users.findOne({ Username: req.body.Username })
      .then(user => {
        if (user) {
          return res.status(400).send(req.body.Username + "already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: req.body.Password,
            Birth_Date: req.body.Birth_Date,
            Email: req.body.Email
          })
            .then(user => {
              res.status(201).json(user);
            })
            .catch(error => {
              console.error(error);
              res.status(500).send("Error" + error);
            });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("Error" + error);
      });
  });

  // GET request to get info on specific user by Username
  app.get("users/:Username", (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error" + err);
      });
  });
  //PUT request updating user info
  app.put("/users/:Username", (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Birth_Date: req.body.Birth_Date,
          Email: req.body.Email
        }
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error" + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  });
  // Add a movie to a user's list of favorites
  app.post("/users/:Username/Favorites/:MovieID", (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params.MovieID }
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error:" + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  });
  //DELETE request for deleting a movie
  app.delete("/users/:Username/Favorites/Movie", (req, res) => {
    Users.findOneandRemove({
      FavoriteMovies: req.params.FavoriteMovies
    }).then(favoriteMovies => {
      if (!favoriteMovies) {
        res.status(400).send(req.params.favoriteMovies + "was not found");
      } else {
        res.status(200).send(req.params.favoriteMovies + "is deleted");
      }
    });
  });

  // Delete a user by username
  app.delete("/users/:Username", (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then(user => {
        if (!user) {
          res.status(400).send(req.params.Username + "was not found");
        } else {
          res.status(200).send(req.params.Username + "was deleted");
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error" + err);
      });
  });
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
