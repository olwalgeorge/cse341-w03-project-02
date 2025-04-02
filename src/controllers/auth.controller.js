const sendResponse = require("../utils/response.js");
const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger.js");
const createHttpError = require("http-errors");
const { transformUser, generateuserID } = require("../utils/user.utils.js");
const User = require("../models/user.model.js");

const register = asyncHandler(async (req, res, next) => {
    logger.info("Register endpoint called");
    logger.debug("Request body:", req.body);

    try {
        const { email, password, username, fullName } = req.body;

        // Normalize the email
        const normalizedEmail = email.toLowerCase();

        // Check if email or username already exists
        const existingUser = await User.findOne({ $or: [{ email: normalizedEmail }, { username }] });
        if (existingUser) {
            logger.warn(`Registration failed: Email or username already exists - ${email}, ${username}`);
            return next(createHttpError(409, "Email or username already exists"));
        }

        // Generate a unique userID
        const userID = await generateuserID();

        const user = new User({
            email: normalizedEmail,
            password,
            username: username.toLowerCase(),
            fullName,
            userID,
           
        });

        await user.save();

        logger.info(`User registered successfully: ${username}`);
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
