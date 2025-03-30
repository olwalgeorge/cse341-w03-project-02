// src/api/controllers/auth/local.controller.js
const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');

module.exports = {
  register: asyncHandler(async (req, res, next) => {
    const { email, password, username, role, avatar, firstName, lastName,user_id } = req.body;

    if (!email || !password || !username) {
      throw createHttpError(400, 'Please provide all required fields.');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, 'Email already exists.');
    }

    const newUser = new User({
      email, 
      password, 
      username,
      role,
      avatar,
      firstName,
      lastName,
      user_id   

    });

    await newUser.save();

    // log the user in immediately after registration
    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      res.status(201).json({ message: 'Registration successful', user: { id: newUser.id, email: newUser.email, username: newUser.username } });
    });
  }),
    /* eslint-disable-next-line */
  loginSuccess: asyncHandler(async (req, res, next) => {
    // Passport automatically attaches the authenticated user to req.user
    res.status(200).json({ message: 'Login successful', user: { id: req.user.id, email: req.user.email, username: req.user.username } });
  }),
    /* eslint-disable-next-line */
  githubSuccess: asyncHandler(async (req, res, next) => {
    // Passport automatically attaches the authenticated user to req.user
    res.status(200).json({ message: 'GitHub login successful', user: { id: req.user.id, email: req.user.email, username: req.user.username, githubId: req.user.githubId } });
    // Or you might redirect the user to a specific page
    // res.redirect('/dashboard');
  }),
    /* eslint-disable-next-line */
  googleSuccess: asyncHandler(async (req, res, next) => {
    // Passport automatically attaches the authenticated user to req.user
    res.status(200).json({ message: 'Google login successful', user: { id: req.user.id, email: req.user.email, username: req.user.username, googleId: req.user.googleId } });
    // Or you might redirect the user to a specific page
    // res.redirect('/dashboard');
  }),

  logout: (req, res) => {
    req.logout(() => {
      res.status(200).json({ message: 'Logged out successfully' });
    });
  },
};