// src/middlewares/auth.middleware.js
const sendResponse = require('../utils/response.js');

const protect = (req, res, next) => {
  if (req.isAuthenticated()) {
    // User is authenticated
    return next();
  } else {
    // User is not authenticated
    return sendResponse(res, 401, 'Not authenticated');
  }
};

module.exports = protect;