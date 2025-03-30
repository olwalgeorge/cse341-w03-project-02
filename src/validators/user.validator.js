const { check, param, body } = require("express-validator");
const User = require("../models/user.model");

const userValidateIdRules = () => {
  return [param("_id", "Invalid internal User ID format").isMongoId()];
};
const userValidateUserIdRules = () => {
  return [
    param("user_id", "User ID should start with 'usr_' then 4 digits").matches(
      /^usr_\d{4}$/
    ),
  ];
};

const userValidateUserTypeRules = () => {
  return [
    param("user_type", "Invalid user type").isIn(["admin", "user", "guest"]),
  ];
};

const userCheckUniquenessRules = () => {
  return [
    body("user_id")
      .custom(async (value) => {
        const userExists = await User.exists({ user_id: value });
        if (userExists) {
          throw new Error("User ID already exists");
        }
        return true;
      }),

    body("username")
      .custom(async (value) => {
        const usernameExists = await User.exists({ username: value });
        if (usernameExists) {
          throw new Error("Username already exists");
        }
        return true;
      }),
    body("email")
      .custom(async (value) => {
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
    check("email", "Invalid email format").trim().isEmail().normalizeEmail(),
    check("username", "Username should only contain letters, numbers, and underscores, and be between 3 to 20 characters")
      .trim()
      .matches(/^[a-zA-Z0-9_]+$/)
      .isLength({ min: 3, max: 20 })
      .escape(), // Sanitize username
    check("user_id", "User ID should start with 'usr_' then 4 digits")
      .trim()
      .matches(/^usr_\d{4}$/),
    check("firstName", "First name should not exceed 20 characters, and be at least 3 characters")
      .trim()
      .isLength({ min: 3, max: 20 })
      .escape(), // Sanitize firstName
    check("lastName", "Last name should not exceed 20 characters, and be at least 3 characters")
      .trim()
      .isLength({ min: 3, max: 20 })
      .escape(), // Sanitize lastName
    check("password", "Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character, and be between 8 to 50 characters")
      .trim()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/),
    check("role", "Role should be user, admin, or superadmin")
      .trim()
      .isIn(["user", "admin", "superadmin"]),
    check("avatar", "Avatar should not exceed 50 characters").trim().isLength({ max: 50 }).optional().escape(), // Sanitize avatar
  ];
};

const userCreateValidationRules = () => {
  return [
    check("email", "Email is required").notEmpty(),    
    check("user_id", "User ID is required").notEmpty(),
    check("firstName", "First name is required").notEmpty(),
    check("lastName", "Last name is required").notEmpty(),
    check("username", "Username is required").notEmpty(),
    check("password", "Password is required").notEmpty(),
    check("role", "Role is required").notEmpty(),   
    ...userValidationGeneralRules(),      
    ...userCheckUniquenessRules(),
    
  ];
};

const userUpdateValidationRules = () => {
  return [
    param("_id", "User ID is required")
      .not("profile")
      .custom(userValidateIdRules()),    
      check("email").optional().trim().isEmail().normalizeEmail(),
      check("user_id").optional().trim().matches(/^usr_\d{4}$/),
      check("firstName").optional().trim().isLength({ min: 3, max: 20 }),
      check("lastName").optional().trim().isLength({ min: 3, max: 20 }),
      check("username").optional().trim().matches(/^[a-zA-Z0-9_]+$/).isLength({ min: 3, max: 20 }).escape(),
      check("password").optional().trim().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/),
      check("role").optional().trim().isIn(["user", "admin", "superadmin"]),
      check("avatar").optional().trim().isLength({ max: 50 }),
   
    
  ];
};

module.exports = {
  userValidateIdRules,
  userCreateValidationRules,
  userUpdateValidationRules,
  userValidateUserIdRules,
  userValidateUserTypeRules,
};
