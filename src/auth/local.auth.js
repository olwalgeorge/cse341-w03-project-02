// src/config/passport.js
// eslint-disable-next-line
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const User = require("../models/user.model.js");
//eslint-disable-next-line no-unused-vars
const bcrypt = require("bcryptjs");
const logger = require('../utils/logger'); 
const localStrategy = new LocalStrategy( 
  {
    usernameField: "email", 
    passwordField: "password",
  },
  async (email, password, done) => {
    logger.info(`Attempting local login for email: ${email}`);
    try {
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        logger.warn(`Authentication failed: Incorrect email - ${email}`);
        return done(null, false, { message: "Incorrect email." });
      }

      const isMatch = await user.isPasswordMatch(password);
      if (!isMatch) {
        logger.warn(`Authentication failed: Incorrect password for user - ${email}`);
        return done(null, false, { message: "Incorrect password." });
      }

      logger.info(`User ${user.username} logged in successfully using local strategy.`);
      return done(null, user);
    } catch (error) {
      logger.error(`Error during local authentication: ${error.message}`, error);
      return done(error);
    }
  }
);

module.exports = localStrategy;
