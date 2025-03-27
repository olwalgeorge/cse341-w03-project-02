const User = require("../models/user.model.js");
const sendResponse = require("../utils/response.js");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const logger = require("../utils/logger.js");

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  logger.info("registerUser called");
  logger.debug("req.body:", req.body);

  const { username, email, password, fullName } = req.body;

  // Check if user exists
  logger.debug("Checking if user exists with email:", email);
  const userExists = await User.findOne({ email });

  if (userExists) {
    logger.warn("User already exists");
    return sendResponse(res, 400, "User already exists");
  }

  // Create user
  logger.debug("Creating user:", { username, email, password, fullName });
  const user = await User.create({
    username,
    email,
    password,
    fullName,
  });

  if (user) {
    logger.info("User created successfully:", { 
      _id: user._id, 
      username: user.username, 
      email: user.email, 
      fullName: user.fullName 
    });
    return sendResponse(res, 201, "User registered successfully", {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    });
  }

  logger.error("User creation failed");
  return sendResponse(res, 400, "Invalid user data");
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      logger.error("Authentication error:", err);
      return next(err);
    }
    if (!user) {
      logger.warn("Authentication failed:", info.message);
      return sendResponse(res, 401, info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        logger.error("Session creation error:", err);
        return next(err);
      }
      logger.info("User logged in successfully:", { 
        _id: user._id, 
        username: user.username, 
        email: user.email, 
        fullName: user.fullName 
      });
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
    logger.info("User profile retrieved for:", req.user._id);
    return sendResponse(res, 200, "User profile retrieved", {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      fullName: req.user.fullName,
    });
  }
  logger.warn("Unauthorized profile access");
  return sendResponse(res, 401, "Not authenticated");
});

// @desc    Logout user
// @route   GET /api/users/logout
// @access  Private
const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      logger.error("Logout error:", err);
      return sendResponse(res, 500, "Error logging out");
    }
    req.session.destroy((err) => {
      if (err) {
        logger.error("Session destruction error:", err);
        return sendResponse(res, 500, "Error destroying session");
      }
      res.clearCookie("connect.sid");
      logger.info("User logged out");
      return sendResponse(res, 200, "Logged out successfully");
    });
  });
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { username, email, fullName } = req.body;
  
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      logger.error("User not found during update");
      return sendResponse(res, 404, "User not found");
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.fullName = fullName || user.fullName;

    const updatedUser = await user.save();

    logger.info("Profile updated:", updatedUser._id);
    return sendResponse(res, 200, "Profile updated", {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      fullName: updatedUser.fullName,
    });
  } catch (error) {
    logger.error("Update error:", error);
    return sendResponse(res, 500, "Update failed", null, error);
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  updateUserProfile,
};