const { check, param } = require("express-validator");

// Reusable rule for validating MongoDB ObjectIDs in parameters
const isMongoIdParam = (paramName, errorMessage) => {
    return param(paramName, errorMessage).isMongoId();
};

// Reusable rule for validating the SM-xxxxx User ID format in parameters
const isSMUserIDParam = (paramName, errorMessage) => {
    return param(paramName, errorMessage).matches(/^SM-\d{5}$/);
};

// Reusable rule for validating the SM-xxxxx User ID format in the body
const isSMUserIDBody = (fieldName, errorMessage) => {
    return check(fieldName, errorMessage).optional().trim().matches(/^SM-\d{5}$/);
};

// Reusable rule for validating the username format in the body
const isValidUsername = (fieldName, errorMessage) => {
    return check(fieldName, errorMessage)
        .optional()
        .trim()
        .matches(/^(?!\d)[a-zA-Z0-9_]+$/)
        .withMessage("Username must not start with a number and can only contain alphanumeric characters and underscores")
        .isLength({ min: 3, max: 20 })
        .escape();
};

// Reusable rule for validating the password format in the body
const isValidPassword = (fieldName, errorMessage) => {
    return check(fieldName, errorMessage)
        .optional()
        .trim()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/
        )
        .withMessage("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character");
};

// Reusable rule for validating the user role in the body
const isValidRole = (fieldName, allowedRoles, errorMessage) => {
    return check(fieldName, errorMessage).optional().trim().toUpperCase().isIn(allowedRoles);
};

const user_IdValidationRules = () => {
    return [isMongoIdParam("_id", "Invalid internal User ID format")];
};

// For /users/:userID (now using SM-xxxxx format)
const userIDValidationRules = () => {
    return [isSMUserIDParam("userID", "User ID should be in the format SM-xxxxx (where x are digits)")];
};

const userTypeValidationRules = () => {
    return [isValidRole("role", ["SUPERADMIN", "ADMIN", "USER", "ORG"], "Invalid user role")];
};

const userUpdateValidationRules = () => {
    return [
        // Improved _id validation: Directly use isMongoIdParam
        isMongoIdParam("_id", "Invalid internal User ID format"),
        check("email").optional().trim().isEmail().normalizeEmail(),
        isSMUserIDBody("userID", "User ID should be in the format SM-xxxxx (where x are digits)"),
        check("fullName").optional().trim().isLength({ min: 3, max: 50 }),
        isValidUsername("username", "Invalid username format"),
        isValidPassword("password", "Invalid password format"),
        isValidRole("role", ["SUPERADMIN", "ADMIN", "USER", "ORG"], "Invalid user role"),
        check("profilePicture").optional().trim().isLength({ max: 200 }),
        check("bio").optional().trim(),
        check("website").optional().trim().isURL({ require_tld: false }),
        check("location").optional().trim(),
        check("isVerified").optional().isBoolean(),
        check("phoneNumber").optional().trim(),
        check("preferences").optional().isObject(),
    ];
};

module.exports = {
    userUpdateValidationRules,
    userIDValidationRules, 
    user_IdValidationRules,
    userTypeValidationRules,
};