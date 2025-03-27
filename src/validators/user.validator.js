// src/validators/user.validator.js
const { check } = require("express-validator");

const userValidationRules = () => {
  return [
    check("username", "Username is required").notEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("fullName", "Full name is required").notEmpty(),
  ];
};

const userUpdateValidationRules = () => {
  return [
    check("username", "Username is required").notEmpty(),
    check("email", "Invalid email").isEmail(),
    check("fullName", "Full name is required").notEmpty(),
  ];
};

module.exports = { userValidationRules, userUpdateValidationRules };
