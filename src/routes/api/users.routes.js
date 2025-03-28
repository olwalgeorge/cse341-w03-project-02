const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  updateUserProfile,
} = require("../../controllers/users.controller.js");
const validate = require("../../middlewares/validation.middleware.js");
const protect = require("../../middlewares/auth.middleware.js");
const {
  userValidationRules,
  userUpdateValidationRules,
} = require("../../validators/user.validator.js");

const router = express.Router();

/* #swagger.tags = ['Users'] */
/* #swagger.description = 'User management endpoints' */

router.post(
  "/",
  validate(userValidationRules()),
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'User data',
      required: true,
      schema: {
        username: { type: 'string', example: 'john_doe' },
        email: { type: 'string', example: 'john@example.com' },
        password: { type: 'string', example: 'securePassword123' },
        fullName: { type: 'string', example: 'John Doe' }
      }
  } */
  registerUser
);

router.post(
  "/login",
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Login credentials',
      required: true,
      schema: {
        username: { type: 'string', example: 'john_doe' },
        password: { type: 'string', example: 'securePassword123' }
      }
  } */
  loginUser
);

router.get("/profile", protect, getUserProfile);

router.put(
  "/profile",
  protect,
  validate(userUpdateValidationRules()),
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated user data',
      schema: {
        username: { type: 'string', example: 'new_john_doe' },
        email: { type: 'string', example: 'new_john@example.com' },
        fullName: { type: 'string', example: 'New John Doe' }
      }
  } */
  updateUserProfile
);

router.get("/logout", protect, logoutUser);

module.exports = router;
