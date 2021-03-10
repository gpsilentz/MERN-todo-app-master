const passport = require('passport');

const userAuthenticated = passport.authenticate('jwt', { session: false });

const checkForAdmin = () => (req, res, next) => req.user.isAdmin ? next() : res.status(401).json("Unauthorized");

module.exports = {
  userAuthenticated, 
  checkForAdmin
};