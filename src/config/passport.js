const passport = require('passport');
const LocalStrategy = require('../auth/local.auth'); // Correct the import path
const User = require('../models/user.model');

passport.use(LocalStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
