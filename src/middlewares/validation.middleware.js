// src/middlewares/validation.middleware.js
const { validationResult } = require("express-validator");
const sendResponse = require("../utils/response.js");
const logger = require("../utils/logger.js");

const validate = (validations) => {
  return async (req, res, next) => {
    logger.info("Request Body:", req.body);
    logger.info("Validations:", validations);
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    logger.info("Errors:", errors.array());
    if (errors.isEmpty()) {
      logger.info("Validation passed, calling next()");
      return next();
    }

    logger.info("Validation failed, sending response");
    return sendResponse(res, 400, "Validation error", null, errors.array());
  };
};

module.exports = validate;

