// loaded mongoose,express,morgan into the file

const mongoose = require("mongoose");
const Models = require("./model.js");

const Movies = Models.Movie;
const Users = Models.User;

const Actors = Models.Actor;

////connecting to the online database on mongodb.com
mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(bodyParser.json());
//app ensures that Express is available in  “auth.js” file as well.
let auth = require("./auth.js")(app);
const passport = require("passport");
require("./passport");
// With express(), call the middleware layer express.static that looks for the "public" folder and routes all requests to this folder to check if for example a file is availabe
app.use(express.static("public"));
app.use(cors());
// Morgan is the middleware layer  that uses the common parameter to log data such as IP address, time of request and request method.
app.use(morgan("common"));
////Another middleware layer that will run on all requests and check for errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke");
});

//GET request to display  data about all movies
//apply the JWT authentication strategyfor registered users
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find().then(movies => {
      res.status(201).json(movies);
    });
  }
);
//GET request to display a movie by title
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then(movie => {
        res.json(movie);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);

//GET request to display a genre (by name)
app.get(
  "/movies/Genre/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.Name })
      .then(movies => {
        res.json(movies);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);
//GET request to display a Director (by name)
app.get(
  "/movies/Director/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name })
      .then(director => {
        res.json(director);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);

//GET request to display a Actor (by name)
app.get(
  "/Actor/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Actors.findOne({ Name: req.params.Name })
      .then(actor => {
        res.json(actor);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);
//POST request to create new user
app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric is not allowed"
    ).isAlphanumeric(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ],
  (req, res) => {
    //// Validation logic here for request

    let errors = validationRequest(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then(user => {
        if (user) {
          return res.status(400).send(req.body.Username + "already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: req.body.Password,
            Birth_Date: req.body.Birth_Date,
            Email: req.body.Email,
            FavoriteMovies: req.body.FavoriteMovies
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
  }
);
// Get all users
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.find()
      .then(users => {
        res.status(201).json(users);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);
// GET request to get info on specific user by Username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error" + err);
      });
  }
);
//PUT request updating user info
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);
// Add a movie to a user's list of favorites
app.post(
  "/users/:Username/Favorites/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);
//DELETE request for deleting a movie
app.delete(
  "/users/:Username/Favorites/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({
      FavoriteMovies: req.params.MovieID
    }).then(favoriteMovies => {
      if (!favoriteMovies) {
        res.status(400).send(req.params.MovieID + ":was not found");
      } else {
        res.status(200).send(req.params.MovieID + ":is deleted");
      }
    });
  }
);

// Delete a user by username
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);
app.get("/", (req, res) => {
  res.send("Welcome to my App");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

//Hosting the app via PaaS(Heroku).If pre-configured port number is unavailabale, it sets to 0.0.0.0
const port = process.env.port || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port" + port);
});
