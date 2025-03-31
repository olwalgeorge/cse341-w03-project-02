// src/config/auth/passport-setup.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// eslint-disable-next-line 
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const config = require('./config');
const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const logger = require('../utils/logger');
const axios = require('axios');
const { generateuserID } = require('../utils/idGenerator'); // Assuming this is still used

// Local Strategy Starts
passport.use(new LocalStrategy({ usernameField: 'email' }, asyncHandler(async (email, password, done) => {
  const user = await User.findOne({ email }).select('+password'); // Select password for comparison
  if (!user) {
    return done(null, false, createHttpError(401, 'Incorrect email.'));
  }
  const isMatch = await user.isPasswordMatch(password);
  if (!isMatch) {
    return done(null, false, createHttpError(401, 'Incorrect password.'));
  }
  return done(null, user);
})));

// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: config.github.clientId,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackUrl,
  scope: ['profile', 'user:email'], // Add necessary scopes to get more info
}, asyncHandler(async (accessToken, refreshToken, profile, done) => {
  try {
    const githubApiUrl = 'https://api.github.com/user';
    const headers = { Authorization: `Bearer ${accessToken}` };
    const githubResponse = await axios.get(githubApiUrl, { headers });
    const githubData = githubResponse.data;

    let user = await User.findOne({ githubId: profile.id });

    if (user) {
      // Update existing user with potentially new information
      user.username = githubData.login || user.username; // username
      user.email = githubData.email || (profile.emails && profile.emails.length > 0 ? profile.emails[0].value : user.email); // email
      user.fullName = githubData.name || user.fullName; // fullName
      user.profilePicture = githubData.avatar_url || user.profilePicture; // profilePicture
      user.bio = githubData.bio || user.bio; // bio
      user.website = githubData.blog || user.website; // website
      user.location = githubData.location || user.location; // location
      await user.save();
      return done(null, user);
    } else {
      user = await User.findOne({ email: githubData.email || (profile.emails && profile.emails.length > 0 ? profile.emails[0].value : undefined) });
      if (user) {
        // If a user exists with the same email, link the GitHub account
        user.githubId = profile.id; // githubId
        user.username = githubData.login; // username
        user.fullName = githubData.name; // fullName
        user.profilePicture = githubData.avatar_url; // profilePicture
        user.bio = githubData.bio; // bio
        user.website = githubData.blog; // website
        user.location = githubData.location; // location
        await user.save();
        return done(null, user);
      } else {
        // Create a new user
        const userID = await generateuserID(); // userID
        const newUser = new User({
          githubId: profile.id, // githubId
          username: githubData.login, // username
          email: githubData.email || (profile.emails && profile.emails.length > 0 ? profile.emails[0].value : undefined), // email
          fullName: githubData.name, // fullName
          profilePicture: githubData.avatar_url, // profilePicture
          bio: githubData.bio, // bio
          website: githubData.blog, // website
          location: githubData.location, // location
          userID: userID, // userID
          isVerified: true, // isVerified
          // role will default to "USER" as per the schema
          // phoneNumber and preferences are not populated from GitHub
        });
        await newUser.save();
        return done(null, newUser);
      }
    }
  } catch (error) {
    logger.error('Error during GitHub authentication:', error);
    return done(error); // Pass the error to the error handling middleware
  }
})));

// // Google Strategy
// passport.use(new GoogleStrategy({
//   clientID: config.google.clientId,
//   clientSecret: config.google.clientSecret,
//   callbackURL: config.google.callbackUrl,
//   scope: ['profile', 'email'], // Add necessary scopes
// }, asyncHandler(async (accessToken, refreshToken, profile, done) => {
//   try {
//     const existingUser = await User.findOne({ $or: [{ googleId: profile.id }, { email: profile.emails ? profile.emails[0].value : undefined }] });

//     if (existingUser) {
//       if (!existingUser.googleId) {
//         existingUser.googleId = profile.id;
//         await existingUser.save();
//       }
//       return done(null, existingUser);
//     }

//     const userID = await generateuserID();
//     const newUser = new User({
//       googleId: profile.id,
//       username: profile.displayName.replace(/\s/g, ''), // Remove spaces from display name for username
//       email: profile.emails ? profile.emails[0].value : undefined,
//       fullName: profile.displayName,
//       profilePicture: profile.photos ? profile.photos[0].value : undefined,
//       userID: userID,
//       isVerified: true, // Assuming Google auth implies verification
//     });
//     await newUser.save();
//     return done(null, newUser);
//   } catch (error) {
//     logger.error('Error during Google authentication:', error);
//     return done(error); // Pass the error to the error handling middleware
//   }
// })));

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    logger.error('Error during user deserialization:', error);
    done(error);
  }
});

module.exports = passport;