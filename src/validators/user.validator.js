const { check, param, body } = require("express-validator");
const User = require("../models/user.model")

  
const userValidateIdRules = () => {

  
  return [param("_id", "Invalid internal User ID format").isMongoId() 
    
  ];
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

const userCreateValidationRules = () => {
  return [  
    body('user_id')
    .notEmpty()
    .withMessage('User ID is required')
    .trim()
    .matches(/^usr_\d{4}$/)
    .withMessage("User ID should start with 'usr_' then 4 digits")
    .custom(async (value) => {
      const userExists = await User.exists({ user_id: value });
      if (userExists) {
        throw new Error('User ID already exists');
      }
      return true;
    }),    

    body('username')
    .notEmpty()
    .withMessage('Username is required')
    .trim()
    .custom(async (value) => {
      const usernameExists = await User.exists({ username: value });
      if (usernameExists) {
        throw new Error('Username already exists');
      }
      return true;
    }),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail()
    .trim()
    .custom(async (value) => {
      const emailExists = await User.exists({ email: value });
      if (emailExists) {
        throw new Error('Email already exists');
      }
      return true;
    }),    
    check("firstName", "First name is required").notEmpty(),
    check("lastName", "Last name is required").notEmpty(),
    check("username", "Username is required").notEmpty(),       
    check("password", "Password is required").notEmpty(),
    check("password", "Password must be at least 8 characters long").isLength({
      min: 8,
    }),
  ];
};

const userUpdateValidationRules = () => {
  return [
    param("_id", "User ID is required").not("profile")
    .custom(userValidateIdRules()),   
    
    check("user_id", "User ID is required").optional(),    
    check("firstName", "First name is required").optional(),
    check("lastName", "Last name is required").optional(),
    check("username", "Username is required").optional(),   
    check("email", "Email is required").optional(),   
    check("email", "Invalid email format").optional().isEmail(),
    check("password", "Password is required").optional(),
    check("password", "Password must be at least 8 characters long")
      .optional()
      .isLength({ min: 8 }),
  ];
};

module.exports = {
  userValidateIdRules,
  userCreateValidationRules,
  userUpdateValidationRules,
  userValidateUserIdRules,
  userValidateUserTypeRules,
};
