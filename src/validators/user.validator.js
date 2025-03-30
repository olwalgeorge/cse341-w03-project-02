const { check, param } = require("express-validator");

const userValidationIdRules = () => {
  return [param("_id", "Invalid internal User ID format").isMongoId()];
};
const userValidationUserIdRules = () => {
  return [
    param("user_id", "User ID should start with 'usr_' then 4 digits").matches(
      /^usr_\d{4}$/
    ),
  ];
};

const userValidationUserTypeRules = () => {
  return [
    param("user_type", "Invalid user type").isIn(["admin", "user", "guest"]),
  ];
};


const userUpdateValidationRules = () => {
  return [
    param("_id", "User ID is required")
      .not("profile")
      .custom(userValidationIdRules()),
    check("email").optional().trim().isEmail().normalizeEmail(),
    check("user_id")
      .optional()
      .trim()
      .matches(/^usr_\d{4}$/),
    check("firstName").optional().trim().isLength({ min: 3, max: 20 }),
    check("lastName").optional().trim().isLength({ min: 3, max: 20 }),
    check("username")
      .optional()
      .trim()
      .matches(/^[a-zA-Z0-9_]+$/)
      .isLength({ min: 3, max: 20 })
      .escape(),
    check("password")
      .optional()
      .trim()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/
      ),
    check("role").optional().trim().isIn(["user", "admin", "superadmin"]),
    check("avatar").optional().trim().isLength({ max: 50 }),
  ];
};

module.exports = {
  userValidationIdRules, 
  userUpdateValidationRules,
  userValidationUserIdRules,
  userValidationUserTypeRules,
};
