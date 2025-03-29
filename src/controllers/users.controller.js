const User = require("../models/user.model.js"); 
const sendResponse = require("../utils/response.js");
const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger.js");
const passport = require("../config/passport"); 

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  logger.info("registerUser called");
  logger.debug("Request body:", req.body);
  try {
    const user = await User.create(req.body);
    sendResponse(res, 201, "User created successfully", {      
      user_public_id: user.user_id,
      username: user.username,
      email: user.email,
      user_fname: user.firstName,
      user_lname: user.lastName,
      profile_photo: user.avatar,
      access_role: user.role,
    });
  } catch (error) {
    logger.error("Error registering user:", error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((val) => val.message);
      return sendResponse(res, 400, "Validation error", null, {
        message: errors.join(". "),
      });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return sendResponse(res, 409, `Duplicate ${field}`, null, {
        message: `${field} '${value}' already exists`,
      });
    }
    sendResponse(res, 500, "Failed to register user", null, {
      message: error.message,
    });
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  logger.info("loginUser called");
  logger.debug("Request body:", req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      logger.error("Passport authentication error:", err);
      return sendResponse(res, 500, "Internal server error");
    }
    if (!user) {
      return sendResponse(res, 401, info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        logger.error("Error during login:", err);
        return sendResponse(res, 500, "Internal server error during login");
      }
      sendResponse(res, 200, "User logged in successfully", {
       
        username: user.username,
        email: user.email,
        user_fname: user.firstName,
        user_lname: user.lastName,
        
      });
    });
  })(req, res);
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  logger.info(`getUserProfile called for user ID: ${req.user?._id}`);
  try {
    const user = await User.findById(req.user._id).select("-password");
    sendResponse(res, 200, "User profile retrieved successfully", user);
  } catch (error) {
    logger.error(`Error retrieving user profile for ID: ${req.user?._id}`, error);
    sendResponse(res, 500, "Failed to retrieve user profile", null, {
      message: error.message,
    });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  logger.info(`updateUserProfile called for user ID: ${req.user?._id}`);
  logger.debug("Request body:", req.body);
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    sendResponse(res, 200, "User profile updated successfully", {
      
      user_public_id: user.user_id,
      user_fname: user.firstName,
      user_lname: user.lastName,
      username: user.username,
      email: user.email,
      access_role: user.role,
      profile_photo: user.avatar,
    });
  } catch (error) {
    logger.error(`Error updating user profile for ID: ${req.user?._id}`, error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((val) => val.message);
      return sendResponse(res, 400, "Validation error", null, {
        message: errors.join(". "),
      });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return sendResponse(res, 409, `Duplicate ${field}`, null, {
        message: `${field} '${value}' already exists`,
      });
    }
    sendResponse(res, 500, "Failed to update user profile", null, {
      message: error.message,
    });
  }
});

// @desc    Logout user
// @route   GET /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  logger.info(`logoutUser called for user ID: ${req.user?._id}`);
  logger.debug("Request body:", req.body);
  req.logout((err) => {
    if (err) {
      logger.error("Error during logout:", err);
      return sendResponse(res, 500, "Internal server error during logout");
    }
    sendResponse(res, 200, "User logged out successfully");
  });
});

// @desc    Get user by ID
// @route   GET /api/users/:user_id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  logger.info(`getUserById called with ID: ${req.params.user_id}`);
  logger.debug("Request body:", req.params.user_id);
  try {
    const user = await User.findOne({user_id: req.params.user_id});
    if (user) {
      sendResponse(res, 200, "User retrieved successfully", {
        user_sys_id: user._id,
        user_public_id: user.user_id,
        username: user.username,
        email: user.email,
        user_fname: user.firstName,
        user_lname: user.lastName,
        profile_photo: user.avatar,
        access_role: user.role,
      });
    } else {
      sendResponse(res, 404, "User not found");
    }
  } catch (error) {
    logger.error(`Error retrieving user with ID: ${req.params.user_id}`, error);
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return sendResponse(res, 400, "Invalid user ID format");
    }
    sendResponse(res, 500, "Failed to retrieve user", null, {
      message: error.message,
    });
  }
});

// @desc    Delete user by ID
// @route   DELETE /api/users/:_id
// @access  Private
const deleteUserById = asyncHandler(async (req, res) => {
  logger.info(`deleteUserById called with ID: ${req.params._id}`);
  try {
    const user = await User.findByIdAndDelete(req.params._id);
    if (user) {
      sendResponse(res, 200, "User deleted successfully");
    } else {
      sendResponse(res, 404, "User not found");
    }
  } catch (error) {
    logger.error(`Error deleting user with ID: ${req.params._id}`, error);
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return sendResponse(res, 400, "Invalid user ID format");
    }
    sendResponse(res, 500, "Failed to delete user", null, {
      message: error.message,
    });
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
  logger.info("getAllUsers called");
  try {
    const users = await User.find();
    sendResponse(res, 200, "Users retrieved successfully", users);
  } catch (error) {
    logger.error("Error retrieving all users:", error);
    sendResponse(res, 500, "Failed to retrieve users", null, {
      message: error.message,
    });
  }
});

// @desc    Get user by username
// @route   GET /api/users/username/:username
// @access  Private
const getUserByUsername = asyncHandler(async (req, res) => {
  logger.info(`getUserByUsername called with username: ${req.params.username}`);
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      sendResponse(res, 200, "User retrieved successfully", {
        user_sys_id: user._id,
        user_public_id: user.user_id,
        username: user.username,
        email: user.email,
        user_fname: user.firstName,
        user_lname: user.lastName,
        profile_photo: user.avatar,
        access_role: user.role,
      });
    } else {
      sendResponse(res, 404, "User not found");
    }
  } catch (error) {
    logger.error(`Error retrieving user with username: ${req.params.username}`, error);
    sendResponse(res, 500, "Failed to retrieve user", null, {
      message: error.message,
    });
  }
});

// @desc    Get user by email
// @route   GET /api/users/email/:email
// @access  Private
const getUserByEmail = asyncHandler(async (req, res) => {
  logger.info(`getUserByEmail called with email: ${req.params.email}`);
  try {
    const user = await User.findOne({ email: req.params.email });
    if (user) {
      sendResponse(res, 200, "User retrieved successfully", {
        user_sys_id: user._id,
        user_public_id: user.user_id,
        username: user.username,
        email: user.email,
        user_fname: user.firstName,
        user_lname: user.lastName,
        profile_photo: user.avatar,
        access_role: user.role,
      });
    } else {
      sendResponse(res, 404, "User not found");
    }
  } catch (error) {
    logger.error(`Error retrieving user with email: ${req.params.email}`, error);
    sendResponse(res, 500, "Failed to retrieve user", null, {
      message: error.message,
    });
  }
});

// @desc    Get users by role
// @route   GET /api/users/role/:role
// @access  Private
const getUsersByRole = asyncHandler(async (req, res) => {
  logger.info(`getUsersByRole called with role: ${req.params.role}`);
  try {
    const users = await User.find({ role: req.params.role });
    if (users && users.length > 0) {
      sendResponse(res, 200, "Users retrieved successfully", users);
    } else {
      sendResponse(res, 404, "Users not found");
    }
  } catch (error) {
    logger.error(`Error retrieving users with role: ${req.params.role}`, error);
    sendResponse(res, 500, "Failed to retrieve users", null, {
      message: error.message,
    });
  }
});

// @desc    Delete all users
// @route   DELETE /api/users
// @access  Private
const deleteAllUsers = asyncHandler(async (req, res) => {
  logger.warn("deleteAllUsers called - USE WITH CAUTION!");
  try {
    const result = await User.deleteMany({});
    sendResponse(res, 200, "All users deleted successfully", { deletedCount: result.deletedCount });
  } catch (error) {
    logger.error("Error deleting all users:", error);
    sendResponse(res, 500, "Failed to delete all users", null, {
      message: error.message,
    });
  }
});

// @desc    Update user by ID
// @route   PUT /api/users/:_id
// @access  Private
const updateUserById = asyncHandler(async (req, res) => {
  logger.info(`updateUserById called with ID: ${req.params._id}`);
  try {
    const user = await User.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
      runValidators: true,
    });
    if (user) {
      sendResponse(res, 200, "User updated successfully", {
        user_sys_id: user._id,
        user_public_id: user.user_id,
        username: user.username,
        email: user.email,
        user_fname: user.firstName,
        user_lname: user.lastName,
        profile_photo: user.avatar,
        access_role: user.role,
      });
    } else {
      sendResponse(res, 404, "User not found");
    }
  } catch (error) {
    logger.error(`Error updating user with ID: ${req.params._id}`, error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((val) => val.message);
      return sendResponse(res, 400, "Validation error", null, {
        message: errors.join(". "),
      });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return sendResponse(res, 409, `Duplicate ${field}`, null, {
        message: `${field} '${value}' already exists`,
      });
    }
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return sendResponse(res, 400, "Invalid user ID format");
    }
    sendResponse(res, 500, "Failed to update user", null, {
      message: error.message,
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  updateUserProfile,
  getUserById,
  deleteUserById,
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
  getUsersByRole,
  deleteAllUsers,
  updateUserById,
};

