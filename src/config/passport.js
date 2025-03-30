// src/config/auth/passport-setup.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const config = require('../config/config');
const asyncHandler = require('express-async-handler');
const logger = require('../utils/logger');

// Local Strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, asyncHandler(async (email, password, done) => {
  const user = await User.findOne({ email });
  if (!user) {
    return done(null, false, { message: 'Incorrect email.' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
})));

// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: config.github.clientId,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackUrl,
}, asyncHandler(async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ $or: [{ githubId: profile.id }, { email: profile.emails ? profile.emails[0].value : undefined }] });

  if (existingUser) {
    if (!existingUser.githubId) {
      existingUser.githubId = profile.id;
      await existingUser.save();
    }
    return done(null, existingUser);
  }

  const newUser = new User({
    githubId: profile.id,
    username: profile.username,
    email: profile.emails ? profile.emails[0].value : undefined,
    // Add other relevant profile information as needed
  });
  await newUser.save();
  return done(null, newUser);
})));

// // Google Strategy
// passport.use(new GoogleStrategy({
//   clientID: config.google.clientId,
//   clientSecret: config.google.clientSecret,
//   callbackURL: config.google.callbackUrl,
// }, asyncHandler(async (accessToken, refreshToken, profile, done) => {
//   const existingUser = await User.findOne({ $or: [{ googleId: profile.id }, { email: profile.emails ? profile.emails[0].value : undefined }] });

//   if (existingUser) {
//     if (!existingUser.googleId) {
//       existingUser.googleId = profile.id;
//       await existingUser.save();
//     }
//     return done(null, existingUser);
//   }

//   const newUser = new User({
//     googleId: profile.id,
//     username: profile.displayName,
//     email: profile.emails ? profile.emails[0].value : undefined,
//     // Add other relevant profile information as needed
//   });
//   await newUser.save();
//   return done(null, newUser);
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