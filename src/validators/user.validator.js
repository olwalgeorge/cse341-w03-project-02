const { check, param } = require("express-validator");

  
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
    
    check("user_id", "User ID is required").notEmpty(), 
    check("user_id", "User ID should start with 'usr_' then 4 digits").matches(/^usr_\d{4}$/),      
    check("firstName", "First name is required").notEmpty(),
    check("lastName", "Last name is required").notEmpty(),
    check("username", "Username is required").notEmpty(),    
    check("email", "Email is required").notEmpty(),    
    check("email", "Invalid email format").isEmail(),
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
