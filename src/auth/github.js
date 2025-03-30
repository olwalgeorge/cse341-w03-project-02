// auth/github.js
const GitHubStrategy = require("passport-github2").Strategy;
const { clientID, clientSecret, callbackURL } = require("../config/config");

module.exports = new GitHubStrategy(
  {
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL,
    scope: ["user:email"], // Request access to the user's email
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // In a real application, you would check if the user exists in your database
      // and either create a new user or update the existing one.
      const user = {
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        email:
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null,
        profileUrl: profile.profileUrl,
        accessToken,
        refreshToken,
      };

      // For demonstration purposes, we'll just pass the user object to the next middleware
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
