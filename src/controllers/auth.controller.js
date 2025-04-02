const sendResponse = require("../utils/response.js");
const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger.js");
const createHttpError = require("http-errors");
const { transformUser } = require("../utils/user.utils.js");
const authService = require("../services/auth.service.js");

const register = asyncHandler(async (req, res, next) => {
    logger.info("Register endpoint called");
    logger.debug("Request body:", req.body);

    try {
        await authService.registerUser(req.body);
        sendResponse(res, 201, "Registration successful");
    } catch (error) {
        logger.error("Error during registration:", error);
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map((val) => val.message);
            return next(createHttpError(400, "Validation error", { message: errors.join(". ") }));
        }
        next(createHttpError(500, "Failed to register user", { message: error.message }));
    }
});

const loginSuccess = (req, res) => {
    logger.info(`User ${req.user.username} logged in successfully.`);
    const transformedUser = transformUser(req.user);
    sendResponse(res, 200, "Login successful", { user: transformedUser });
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            logger.error("Error during logout:", err);
            // eslint-disable-next-line
            return next(createHttpError(500, "Internal server error during logout", { message: err.message }));
        }
        logger.info(`User logged out successfully.`);
        sendResponse(res, 200, "Logged out successfully");
    });
};

module.exports = {
    register,
    loginSuccess,
    logout,
};
