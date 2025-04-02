const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  getUserById,
  deleteUserById,
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
  getUsersByRole,
  deleteAllUsers,
  updateUserById,
} = require("../controllers/users.controller.js");
const validate = require("../middlewares/validation.middleware.js");
const isAuthenticated = require("../middlewares/auth.middleware.js");
const {
  userUpdateValidationRules,
  userIDValidationRules,
  user_IdValidationRules,
  userTypeValidationRules,
  usernameValidationRules,
  emailValidationRules,
  roleValidationRules,
} = require("../validators/user.validator.js");

const router = express.Router();

/* #swagger.tags = ['Users'] */
/* #swagger.description = 'User management endpoints' */

router.get(
  "/profile",
  isAuthenticated,
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to retrieve user profile' */
  /* #swagger.responses[200] = { description: 'User profile retrieved successfully' } */
  /* #swagger.responses[401] = { description: 'Not authenticated' } */
  getUserProfile
);

router.put(
  "/profile",
  isAuthenticated,
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

router.get(
  "/:userID",
  isAuthenticated,
  validate(userIDValidationRules()),
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to retrieve a user by ID' */
  /* #swagger.parameters['userID'] = { in: 'path', description: 'User ID', required: true, type: 'string' } */
  /* #swagger.responses[200] = { description: 'User retrieved successfully' } */
  /* #swagger.responses[400] = { description: 'Invalid user ID format' } */
  /* #swagger.responses[401] = { description: 'Not authenticated' } */
  /* #swagger.responses[404] = { description: 'User not found' } */
  /* #swagger.responses[500] = { description: 'Failed to retrieve user' } */
  getUserById
);

router.delete(
  "/:_id",
  isAuthenticated,
  validate(user_IdValidationRules()),
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to delete a user by ID' */
  /* #swagger.parameters['_id'] = { in: 'path', description: 'User ID', required: true, type: 'string' } */
  /* #swagger.responses[200] = { description: 'User deleted successfully' } */
  /* #swagger.responses[400] = { description: 'Invalid user ID format' } */
  /* #swagger.responses[401] = { description: 'Not authenticated' } */
  /* #swagger.responses[404] = { description: 'User not found' } */
  /* #swagger.responses[500] = { description: 'Failed to delete user' } */
  deleteUserById
);

router.get(
  "/",
  isAuthenticated,
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to retrieve all users' */
  /* #swagger.responses[200] = { description: 'Users retrieved successfully' } */
  /* #swagger.responses[401] = { description: 'Not authenticated' } */
  /* #swagger.responses[500] = { description: 'Failed to retrieve users' } */
  getAllUsers
);

router.get(
  "/username/:username",
  isAuthenticated,
  validate(usernameValidationRules()),
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to retrieve a user by username' */
  /* #swagger.parameters['username'] = { in: 'path', description: 'Username', required: true, type: 'string' } */
  /* #swagger.responses[200] = { description: 'User retrieved successfully' } */
  /* #swagger.responses[401] = { description: 'Not authenticated' } */
  /* #swagger.responses[404] = { description: 'User not found' } */
  /* #swagger.responses[500] = { description: 'Failed to retrieve user' } */
  getUserByUsername
);

router.get(
  "/email/:email",
  isAuthenticated,
  validate(emailValidationRules()),
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to retrieve a user by email' */
  /* #swagger.parameters['email'] = { in: 'path', description: 'Email', required: true, type: 'string' } */
  /* #swagger.responses[200] = { description: 'User retrieved successfully' } */
  /* #swagger.responses[401] = { description: 'Not authenticated' } */
  /* #swagger.responses[404] = { description: 'User not found' } */
  /* #swagger.responses[500] = { description: 'Failed to retrieve user' } */
  getUserByEmail
);

router.get(
  "/role/:role",
  isAuthenticated,
  validate(roleValidationRules()),
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to retrieve users by role' */
  /* #swagger.parameters['role'] = { in: 'path', description: 'Role', required: true, type: 'string' } */
  /* #swagger.responses[200] = { description: 'Users retrieved successfully' } */
  /* #swagger.responses[401] = { description: 'Not authenticated' } */
  /* #swagger.responses[404] = { description: 'Users not found' } */
  /* #swagger.responses[500] = { description: 'Failed to retrieve users' } */
  getUsersByRole
);

router.delete(
  "/",
  isAuthenticated,
  validate(userTypeValidationRules()),
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to delete all users' */
  /* #swagger.responses[200] = { description: 'All users deleted successfully' } */
  /* #swagger.responses[401] = { description: 'Not authenticated' } */
  /* #swagger.responses[500] = { description: 'Failed to delete all users' } */
  deleteAllUsers
);

router.put(
  "/:_id",
  isAuthenticated,
  validate(userUpdateValidationRules()),
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to update a user by ID' */
  /* #swagger.parameters['_id'] = { in: 'path', description: 'User ID', required: true, type: 'string' } */
  /* #swagger.parameters['user'] = { in: 'body', description: 'User object', required: true, schema: { $ref: '#/definitions/User' } } */
  /* #swagger.responses[200] = { description: 'User updated successfully' } */
  /* #swagger.responses[400] = { description: 'Invalid user ID format or validation error' } */
  /* #swagger.responses[401] = { description: 'Not authenticated' } */
  /* #swagger.responses[404] = { description: 'User not found' } */
  /* #swagger.responses[500] = { description: 'Failed to update user' } */
  updateUserById
);

module.exports = router;

