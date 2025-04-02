// src/middlewares/auth.middleware.js
const sendResponse = require("../utils/response.js");
const logger = require("../utils/logger.js");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // User is authenticated
    logger.info(`User ${req.user.username} is authenticated.`);
    return next();
  } else {
    // User is not authenticated
    logger.warn('User is not authenticated.');
    return sendResponse(res, 401, "Not authenticated");
  }
};

module.exports = isAuthenticated;
