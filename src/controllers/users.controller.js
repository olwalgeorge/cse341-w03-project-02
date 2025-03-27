// src/controllers/users.controller.js
const User = require("../models/user.model.js");
const sendResponse = require("../utils/response.js");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const { validationResult } = require("express-validator");

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, "Validation error", null, errors.array());
  }

  const { username, email, password, fullName } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return sendResponse(res, 400, "User already exists");
  }

  // Create user
  const user = await User.create({
    username,
    email,
    password,
    fullName,
  });

  if (user) {
    sendResponse(res, 201, "User registered successfully", {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    });
  } else {
    return sendResponse(res, 400, "Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return sendResponse(res, 401, info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return sendResponse(res, 200, "Logged in successfully", {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      });
    });
  })(req, res, next);
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.isAuthenticated()) {
    sendResponse(res, 200, "User profile retrieved successfully", {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      fullName: req.user.fullName,
    });
  } else {
    return sendResponse(res, 401, "Not authenticated");
  }
});

// @desc    Logout user
// @route   GET /api/users/logout
// @access  Private
const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      // Handle error here
      console.error(err);
      return sendResponse(res, 500, "Error logging out");
    }
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return sendResponse(res, 500, "Error destroying session");
      }
      res.clearCookie("connect.sid"); // Clear the session cookie
      return sendResponse(res, 200, "Logged out successfully");
    });
  });
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, "Validation error", null, errors.array());
  }

  const { username, email, fullName } = req.body;
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return sendResponse(res, 404, "User not found");
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.fullName = fullName || user.fullName;

    const updatedUser = await user.save();

    sendResponse(res, 200, "User profile updated successfully", {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      fullName: updatedUser.fullName,
    });
  } catch (error) {
    return sendResponse(res, 500, "Error updating user profile", null, error);
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  updateUserProfile,
};
