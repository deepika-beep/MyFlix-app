const mongoose = require("mongoose");
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: { Name: String, Description: String },
  Director: { Name: String, Bio: String },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Birth_Date: Date,
  Email: { type: String, required: true },
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectID, ref: "Movie" }]
});

let directorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String, required: true },
  Birthyear: Date,
  Deathyear: Date
});

let genreSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true }
});

let actorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String, required: true },
  Birthyear: Date,
  Movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);
let Director = mongoose.model("Director", directorSchema);
let Genre = mongoose.model("Genre", genreSchema);
let Actor = mongoose.model("Actor", actorSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;
module.exports.Actor = Actor;