// src/middlewares/validation.middleware.js
const { validationResult } = require("express-validator");
const sendResponse = require("../utils/response.js");

const validate = (validations) => {
  return async (req, res, next) => {
    console.log("Request Body:", req.body); // Add this
    console.log("Validations:", validations); // Add this
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    console.log("Errors:", errors.array()); // Add this
    if (errors.isEmpty()) {
      console.log("Validation passed, calling next()"); // Add this
      return next();
    }

    console.log("Validation failed, sending response"); // Add this
    return sendResponse(res, 400, "Validation error", null, errors.array());
  };
};

module.exports = validate;
