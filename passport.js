const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  Models = require("./model.js"),
  passportJWT = require("passport-jwt");
let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;
/**
 * This strategy is used by the '/login' route.
 * It checks if the username and password a user wants to authenticate with, exist in the database.
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password"
    },
    (username, password, callback) => {
      console.log(username + " " + password);
      Users.findOne({ Username: username }, (error, user) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
        if (!user) {
          console.log("incorrect username");
          return callback(null, false, {
            message: "incorrect username or password"
          });
        }
        if (!user.validatePassword(password)) {
          console.log("incorrect password");
          return callback(null, false, { message: "incorrect password" });
        }
        console.log("finished");
        return callback(null, user);
      });
    }
  )
);

/**
 * This strategy is used for authorization.
 * Here the user that makes the request is ckecked against the database using the user's id extracted from the JWT.
 */



passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    (jwtPayload, callback) => {
      return Users.findById(jwtPayload._id)
        .then(user => {
          return callback(null, user);
        })
        .catch(error => {
          return callback(error);
        });
    }
  )
);
