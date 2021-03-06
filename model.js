const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
/**
 * Schema for a movie
 */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: { Name: String, Description: String },
  Director: { Name: String, Bio: String },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});
/**
 * Schema for a user
 */
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Birth_Date: Date,
  Email: { type: String, required: true },
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectID, ref: "Movie" }]
});

/**
 * Function that encrypts the password before storing it in the database
 * @param {*} password 
 * @returns the encrypted password
 */
userSchema.statics.hashPassword = password => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Function that compares the encrypted password from the route against the password from the DB
 * @param {*} password 
 * @returns the encrypted password
 */
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

module.exports.Movie = Movie;
module.exports.User = User;
