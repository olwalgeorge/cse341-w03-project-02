// src/middlewares/validation.middleware.js
const { validationResult } = require("express-validator");
const sendResponse = require("../utils/response.js");

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return sendResponse(res, 400, "Validation error", null, errors.array());
  };
};

module.exports = validate;
