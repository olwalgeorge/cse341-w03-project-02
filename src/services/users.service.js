// src/services/users.service.js
// This file can contain more complex user-related logic
// that is not directly tied to request handling.

const User = require("../models/user.model.js");
const logger = require("../utils/logger.js");

// Example: Get user by ID (can be used in other services/controllers)
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    logger.error("Error getting user by ID:", error);
    throw error;
  }
};

// Add other user-related service functions here

module.exports = {
  getUserById,
  // ... other service functions
};
