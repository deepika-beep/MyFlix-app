const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

//hashPassword function does the actual hashing of submitted passwords.
userSchema.statics.hashPassword = password => {
  return bcrypt.hashSync(password, 10);
};

//validatePassword, compares submitted hashed passwords with the hashed passwords stored in database.
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};
// let actorSchema = mongoose.Schema({
//   Name: { type: String, required: true },
//   Bio: { type: String, required: true },
//   Birthyear: Date,
//   Movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
// });

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

let Actor = mongoose.model("Actor", actorSchema);

module.exports.Movie = Movie;
module.exports.User = User;

module.exports.Actor = Actor;
