// src/middlewares/auth.middleware.js

const logger = require("../utils/logger.js");
const AuthError = require("../utils/errors/AuthError.js");

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        logger.info(`User ${req.user.username} is authenticated.`);
        return next();
    }

    const error = new AuthError('Authentication required', 'AUTH_REQUIRED');
    logger.warn('Authentication failed - no session');
    next(error);
};

module.exports = isAuthenticated;
