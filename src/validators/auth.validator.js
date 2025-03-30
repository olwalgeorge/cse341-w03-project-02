const { body } = require("express-validator");
const User = require("../models/user.model");


const userCheckUniquenessRules = () => {
  return [
    body("user_id").custom(async (value) => {
      const userExists = await User.exists({ user_id: value });
      if (userExists) {
        throw new Error("User ID already exists");
      }
      return true;
    }),

    body("username").custom(async (value) => {
      const usernameExists = await User.exists({ username: value });
      if (usernameExists) {
        throw new Error("Username already exists");
      }
      return true;
    }),
    body("email").custom(async (value) => {
      const emailExists = await User.exists({ email: value });
      if (emailExists) {
        throw new Error("Email already exists");
      }
      return true;
    }),
  ];
};

const userValidationGeneralRules = () => {
  return [
    body("email", "Invalid email format").trim().isEmail().normalizeEmail(),
    body(
      "username",
      "Username should only contain letters, numbers, and underscores, and be between 3 to 20 characters"
    )
      .trim()
      .matches(/^[a-zA-Z0-9_]+$/)
      .isLength({ min: 3, max: 20 })
      .escape(),
    body("user_id", "User ID should start with 'usr_' then 4 digits")
      .trim()
      .matches(/^usr_\d{4}$/),
    body(
      "firstName",
      "First name should not exceed 20 characters, and be at least 3 characters"
    )
      .trim()
      .isLength({ min: 3, max: 20 })
      .escape(),
    body(
      "lastName",
      "Last name should not exceed 20 characters, and be at least 3 characters"
    )
      .trim()
      .isLength({ min: 3, max: 20 })
      .escape(),
    body(
      "password",
      "Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character, and be between 8 to 50 characters"
    )
      .trim()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/
      ),
    body("role", "Role should be user, admin, or superadmin")
      .trim()
      .isIn(["user", "admin", "superadmin"]),
    body("avatar", "Avatar should not exceed 50 characters")
      .trim()
      .isLength({ max: 50 })
      .optional()
      .escape(),
  ];
};
const userCreateValidationRules = () => {
  return [
    body("email", "Email is required").notEmpty(),
    body("user_id", "User ID is required").notEmpty(),
    body("firstName", "First name is required").notEmpty(),
    body("lastName", "Last name is required").notEmpty(),
    body("username", "Username is required").notEmpty(),
    body("password", "Password is required").notEmpty(),
    body("role", "Role is required").notEmpty(),
    ...userValidationGeneralRules(),
    ...userCheckUniquenessRules(),
  ];
};


module.exports = {
  userCreateValidationRules,
  userCheckUniquenessRules
  
};