// src/middlewares/error.middleware.js
const sendResponse = require("../utils/response.js");
const logger = require("../utils/logger.js");

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // If Mongoose validation error, customize message
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((val) => val.message);
    message = `Invalid input data. ${errors.join(". ")}`;
  }

  // Log the error
  logger.error(err.stack);

  sendResponse(res, statusCode, message, null, { ...err, stack: err.stack });
};

module.exports = errorHandler;
