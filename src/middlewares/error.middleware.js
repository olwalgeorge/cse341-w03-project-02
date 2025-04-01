// middleware/error.middleware.js

const logger = require("../utils/logger.js");
const sendResponse = require("../utils/response.js");
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let logMessage = `Error: ${err.message} - Method: ${req.method} - URL: ${req.url} - IP: ${req.ip}`;
    let errorSource = "Server"; // Default to server-side error
    let errorType = "Internal"; // Default error type

    // Include user ID if authenticated
    if (req.user && req.user._id) {
        logMessage += ` - User ID: ${req.user._id}`;
    }

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let details = err.details || undefined;

    // Classify error source based on status code
    if (statusCode >= 400 && statusCode < 500) {
        errorSource = "Client";
    }

    // Handle specific Mongoose errors for better clarity and error type classification
    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 400;
        message = "Invalid ID format";
        errorType = "InvalidInput";
    } else if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue)[0];
        message = `Duplicate ${field}`;
        details = { message: `${field} '${err.keyValue[field]}' already exists` };
        errorType = "DuplicateEntry";
        errorSource = "Client"; // Could be client trying to create a duplicate
    } else if (err.name === "ValidationError") {
        statusCode = 400;
        const errors = Object.values(err.errors).map((val) => val.message);
        message = "Validation error";
        details = { message: errors.join(". ") };
        errorType = "Validation";
        errorSource = "Client";
    } else if (statusCode === 401) {
        errorType = "Authentication";
        errorSource = "Client";
    } else if (statusCode === 403) {
        errorType = "Authorization";
        errorSource = "Client";
    } else if (statusCode >= 500) {
        errorType = "InternalServer";
    }

    // Log the error with the stack trace
    logger.error(
      `${logMessage} - Source: ${errorSource} - Type: ${errorType}`,
      err // Pass the entire error object
  );

    sendResponse(res, statusCode, message, { error: details });
};

module.exports = errorHandler;