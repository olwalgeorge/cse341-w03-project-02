const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  updateUserProfile,
  getUserById,
  deleteUserById,
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
  getUsersByRole,
  deleteAllUsers,
  updateUserById,
} = require("../../controllers/users.controller.js");
const validate = require("../../middlewares/validation.middleware.js");
const protect = require("../../middlewares/auth.middleware.js");
const {
  userValidateIdRules,
  userCreateValidationRules,
  userUpdateValidationRules,
  userValidateUserIdRules,
  userValidateUserTypeRules,
} = require("../../validators/user.validator.js");

const router = express.Router();

/* #swagger.tags = ['Users'] */
/* #swagger.description = 'User management endpoints' */

router.post(
  "/",
  validate(userCreateValidationRules()),
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

router.get(
  "/profile",
  protect,
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to retrieve user profile' */
  /* #swagger.responses[200] = { description: 'User profile retrieved successfully' } */
  /* #swagger.responses[401] = { description: 'Not authenticated' } */
  getUserProfile
);

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

router.get(
  "/logout",
  protect,
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to logout user' */
  /* #swagger.responses[200] = { description: 'User logged out successfully' } */
  /* #swagger.responses[401] = { description: 'Not authenticated' } */
  logoutUser
);

router.get(
  "/:user_id",
  protect,
  validate(userValidateUserIdRules()),
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to retrieve a user by ID' */
  /* #swagger.parameters['user_id'] = { in: 'path', description: 'User ID', required: true, type: 'string' } */
  /* #swagger.responses[200] = { description: 'User retrieved successfully' } */
  /* #swagger.responses[400] = { description: 'Invalid user ID format' } */
  /* #swagger.responses[401] = { description: 'Not authenticated' } */
  /* #swagger.responses[404] = { description: 'User not found' } */
  getUserById
);

router.delete(
  "/:_id",
  protect,
  validate(userValidateIdRules()),
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
  protect,
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to retrieve all users' */
  /* #swagger.responses[200] = { description: 'Users retrieved successfully' } */
  /* #swagger.responses[401] = { description: 'Not authenticated' } */
  /* #swagger.responses[500] = { description: 'Failed to retrieve users' } */
  getAllUsers
);

router.get(
  "/username/:username",
  protect,
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
  protect,
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
  protect,
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
  protect,
  validate(userValidateUserTypeRules()),
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to delete all users' */
  /* #swagger.responses[200] = { description: 'All users deleted successfully' } */
  /* #swagger.responses[401] = { description: 'Not authenticated' } */
  /* #swagger.responses[500] = { description: 'Failed to delete all users' } */
  deleteAllUsers
);

router.put(
  "/:_id",
  protect,
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
