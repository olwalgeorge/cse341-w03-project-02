// auth/github.js
const GitHubStrategy = require("passport-github2").Strategy;
const config = require("../config/config");
const User = require('../models/user.model');
const logger = require('../utils/logger');

module.exports = new GitHubStrategy(
  {
    clientID: config.github.clientId,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackUrl,
    scope: ["user:email"],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });

      if (!user) {
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

        const emailExists = email ? await User.exists({ email: email }) : false;

        if (emailExists) {
          logger.warn(`GitHub login failed: Email ${email} already exists.`);
          return done(null, false, { message: "Email already exists." });
        }

        user = new User({
          githubId: profile.id,
          username: profile.username,
          email: email,
          fullName: profile.displayName,
          isVerified: true,
        });
      }

      user.githubAccessToken = accessToken;
      user.githubRefreshToken = refreshToken;

      await user.save();

      logger.info(`User ${user.username} logged in successfully using GitHub strategy.`);
      return done(null, user);
    } catch (error) {
      logger.error(`Error during GitHub authentication: ${error.message}`, error);
      return done(error);
    }
  }
);
