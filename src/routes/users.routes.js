// src/routes/users.routes.js
const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  updateUserProfile,
} = require("../controllers/users.controller.js");
const validate = require("../middlewares/validation.middleware.js");
const { userValidationRules, userUpdateValidationRules } = require("../validators/user.validator.js");

const router = express.Router();

/* #swagger.tags = ['Users'] */
/* #swagger.description = 'Routes for managing users' */

router.post(
  "/",
  userValidationRules(),
  validate,
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to create a new user' */
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'User data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        user_id: { type: 'number', required: true },
        username: { type: 'string', required: true },
        email: { type: 'string', required: true },
        avatar_url: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        joined_date: { type: 'string', format: 'date' },
        last_login_ip: { type: 'string' }
      }
    }
  } */
  /* #swagger.responses[201] = { description: 'User created successfully' } */
  /* #swagger.responses[400] = { description: 'Validation failed', schema: { type: 'object', properties: { message: { type: 'string' }, errors: { type: 'object' } } } } */
  /* #swagger.responses[500] = { description: 'Failed to create user' } */
  registerUser
);

router.post(
  "/login",
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to login a user' */
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'User data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', required: true },
        password: { type: 'string', required: true }
      }
    }
  } */
  /* #swagger.responses[200] = { description: 'User logged in successfully' } */
  /* #swagger.responses[400] = { description: 'Validation failed', schema: { type: 'object', properties: { message: { type: 'string' }, errors: { type: 'object' } } } } */
  /* #swagger.responses[401] = { description: 'User not found or incorrect password' } */
  /* #swagger.responses[500] = { description: 'Failed to login user' } */
  loginUser
);

router.get(
  "/profile",
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to retrieve a user profile' */
  /* #swagger.responses[200] = { description: 'User profile retrieved successfully' } */
  /* #swagger.responses[404] = { description: 'User not found' } */
  /* #swagger.responses[500] = { description: 'Failed to retrieve user profile' } */
  getUserProfile
);

router.put(
  "/profile",
  userUpdateValidationRules(),
  validate,
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to update a user profile' */
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated user data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        email: { type: 'string' },
        avatar_url: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        joined_date: { type: 'string', format: 'date' },
        last_login_ip: { type: 'string' }
      }
    }
  } */
  /* #swagger.responses[200] = { description: 'User profile updated successfully' } */
  /* #swagger.responses[400] = { description: 'Validation failed', schema: { type: 'object', properties: { message: { type: 'string' }, errors: { type: 'object' } } } } */
  /* #swagger.responses[404] = { description: 'User not found' } */
  /* #swagger.responses[500] = { description: 'Failed to update user profile' } */
  updateUserProfile
);

router.get(
  "/logout",
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to logout a user' */
  /* #swagger.responses[200] = { description: 'User logged out successfully' } */
  /* #swagger.responses[401] = { description: 'User not logged in' } */
  /* #swagger.responses[500] = { description: 'Failed to logout user' } */
  logoutUser
);

module.exports = router;

