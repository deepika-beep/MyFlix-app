const jwtSecret = "your_jwt_secret";
const jwt = require("jsonwebtoken"),
  passport = require("passport");
require("./passport.js"); //  local passport file
/**
 * Function that generate the JWT token
 * @param {*} user 
 * @returns the JWT token, with the user's username encoded in it.
 */
let generateJWTToken = user => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: "7d",
    algorithm: "HS256"
  });
};

/**
 * Login route
 * @param {*} router 
 * return the user with all details and a token for authenticated user
 */

module.exports = router => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "something is not right",
          user: user
        });
      }
      req.login(user, { session: false }, error => {
        if (error) {
          res.send(error);
        }

        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
