const sendResponse = require("../utils/response");
const logger = require("../utils/logger");

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal server error";
  let errors = [];

  // Handle specific error types
  switch (true) {
    case err.name === "ValidationError":
      status = 400;
      message = "Database validation failed";
      errors = Object.values(err.errors).map((e) => ({
        field: e.path,
        message: e.message,
      }));
      break;

    case err.code === 11000:
      status = 409;
      message = "Database Duplication Error";
      errors = Object.keys(err.keyValue).map((field) => ({
        field,
        message: `${field} already exists`,
      }));
      break;

    case err.message.includes("Incorrect email."):
      status = 401;
      message = "Authentication failed.";
      errors.push({ message: "Incorrect email." });
      break;

    case err.message.includes("Incorrect password."):
      status = 401;
      message = "Authentication failed.";
      errors.push({ message: "Incorrect password." });
      break;

    default:
      errors.push({ message: err.message });
  }

  logger.error(`Error ${status}: ${message}`, { errors });
  sendResponse(res, status, message, null, { errors });
};

module.exports = errorHandler;
