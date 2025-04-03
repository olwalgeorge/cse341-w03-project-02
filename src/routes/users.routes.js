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

/* 
#swagger.tags = ['Users']
#swagger.description = 'User management endpoints for handling CRUD operations and profile management'
*/

router.get(
  "/profile",
  isAuthenticated,
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get current user profile'
     #swagger.description = 'Retrieves the complete profile of the currently authenticated user'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.responses[200] = {
       description: 'User profile retrieved successfully',
       schema: {
         type: 'object',
         properties: {
           success: { type: 'boolean', example: true },
           message: { type: 'string', example: 'User profile retrieved successfully' },
           data: {
             type: 'object',
             properties: {
               _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
               userID: { type: 'string', example: 'SM-00001' },
               username: { type: 'string', example: 'john_doe' },
               email: { type: 'string', example: 'john.doe@example.com' },
               fullName: { type: 'string', example: 'John Doe' },
               role: { type: 'string', example: 'USER' },
               isVerified: { type: 'boolean', example: true },
               bio: { type: 'string', example: 'Software developer passionate about IoT' },
               location: { type: 'string', example: 'New York, USA' },
               website: { type: 'string', example: 'https://johndoe.com' },
               createdAt: { type: 'string', example: '2024-01-20T12:00:00Z' }
             }
           }
         }
       }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to retrieve user profile' }
     }
  */
  getUserProfile
);

router.put(
  "/profile",
  isAuthenticated,
  validate(userUpdateValidationRules()),
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Update current user profile'
     #swagger.description = 'Update the profile information of the currently authenticated user'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'User profile data to update',
       required: true,
       schema: {
         type: 'object',
         properties: {
           username: {
             type: 'string',
             example: 'john_doe_2024',
             description: 'New username (3-20 characters, alphanumeric and underscore)'
           },
           email: {
             type: 'string',
             example: 'john.doe@example.com',
             description: 'New email address'
           },
           fullName: {
             type: 'string',
             example: 'John Robert Doe',
             description: 'Updated full name (3-50 characters)'
           },
           bio: {
             type: 'string',
             example: 'Software developer with 5 years of experience in IoT',
             description: 'User biography'
           },
           website: {
             type: 'string',
             example: 'https://johndoe.com',
             description: 'Personal or professional website'
           },
           location: {
             type: 'string',
             example: 'New York, USA',
             description: 'User location'
           }
         }
       }
     }
     #swagger.responses[200] = {
       description: 'User profile updated successfully',
       schema: {
         success: true,
         message: 'User profile updated successfully',
         data: {
           _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
           userID: { type: 'string', example: 'SM-00001' },
           username: { type: 'string', example: 'john_doe_2024' },
           email: { type: 'string', example: 'john.doe@example.com' },
           fullName: { type: 'string', example: 'John Robert Doe' },
           bio: { type: 'string', example: 'Software developer with 5 years of experience in IoT' },
           website: { type: 'string', example: 'https://johndoe.com' },
           location: { type: 'string', example: 'New York, USA' }
         }
       }
     }
     #swagger.responses[400] = {
       description: 'Validation error',
       schema: { success: false, message: 'Validation error' }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to update user profile' }
     }
  */
  updateUserProfile
);

router.get(
  "/:userID",
  isAuthenticated,
  validate(userIDValidationRules()),
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get user by ID'
     #swagger.description = 'Retrieve a specific user by their SM-XXXXX format ID'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['userID'] = {
       in: 'path',
       description: 'User ID in SM-XXXXX format',
       required: true,
       type: 'string',
       example: 'SM-00001'
     }
     #swagger.responses[200] = {
       description: 'User retrieved successfully',
       schema: {
         success: true,
         message: 'User retrieved successfully',
         data: {
           _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
           userID: { type: 'string', example: 'SM-00001' },
           username: { type: 'string', example: 'john_doe' },
           email: { type: 'string', example: 'john.doe@example.com' },
           fullName: { type: 'string', example: 'John Doe' },
           role: { type: 'string', example: 'USER' },
           isVerified: { type: 'boolean', example: true }
         }
       }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[404] = {
       description: 'User not found',
       schema: { success: false, message: 'User not found' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to retrieve user' }
     }
  */
  getUserById
);

router.delete(
  "/:_id",
  isAuthenticated,
  validate(user_IdValidationRules()),
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Delete user by ID'
     #swagger.description = 'Permanently removes a user from the system by their MongoDB _id'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['_id'] = {
       in: 'path',
       description: 'MongoDB _id of the user',
       required: true,
       type: 'string',
       example: '507f1f77bcf86cd799439011'
     }
     #swagger.responses[200] = {
       description: 'User deleted successfully',
       schema: {
         success: true,
         message: 'User deleted successfully'
       }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[404] = {
       description: 'User not found',
       schema: { success: false, message: 'User not found' }
     }
     #swagger.responses[400] = {
       description: 'Invalid user ID format',
       schema: { success: false, message: 'Invalid user ID format' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to delete user' }
     }
  */
  deleteUserById
);

router.get(
  "/",
  isAuthenticated,
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get all users'
     #swagger.description = 'Retrieves a list of all users in the system. Requires authentication.'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.responses[200] = {
       description: 'Users retrieved successfully',
       schema: {
         success: true,
         message: 'Users retrieved successfully',
         data: [{
           _id: '507f1f77bcf86cd799439011',
           userID: 'SM-00001',
           username: 'john_doe',
           email: 'john@example.com',
           fullName: 'John Doe',
           role: 'USER',
           isVerified: true
         }]
       }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to retrieve users' }
     }
  */
  getAllUsers
);

router.get(
  "/username/:username",
  isAuthenticated,
  validate(usernameValidationRules()),
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get user by username'
     #swagger.description = 'Retrieves a user by their unique username'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['username'] = {
       in: 'path',
       description: 'Username to search for',
       required: true,
       type: 'string',
       example: 'john_doe'
     }
     #swagger.responses[200] = {
       description: 'User retrieved successfully',
       schema: {
         success: true,
         message: 'User retrieved successfully',
         data: {
           _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
           userID: 'SM-00001',
           username: 'john_doe',
           email: 'john@example.com',
           fullName: 'John Doe',
           role: 'USER'
         }
       }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[404] = {
       description: 'User not found',
       schema: { success: false, message: 'User not found' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to retrieve user' }
     }
  */
  getUserByUsername
);

router.get(
  "/email/:email",
  isAuthenticated,
  validate(emailValidationRules()),
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get user by email'
     #swagger.description = 'Retrieves a user by their email address'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['email'] = {
       in: 'path',
       description: 'Email address to search for',
       required: true,
       type: 'string',
       example: 'john@example.com'
     }
     #swagger.responses[200] = {
       description: 'User retrieved successfully',
       schema: {
         success: true,
         message: 'User retrieved successfully',
         data: {
           _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
           userID: 'SM-00001',
           username: 'john_doe',
           email: 'john@example.com',
           fullName: 'John Doe'
         }
       }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[404] = {
       description: 'User not found',
       schema: { success: false, message: 'User not found' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to retrieve user' }
     }
  */
  getUserByEmail
);

router.get(
  "/role/:role",
  isAuthenticated,
  validate(roleValidationRules()),
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Get users by role'
     #swagger.description = 'Retrieves all users with a specific role (SUPERADMIN, ADMIN, USER, or ORG)'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['role'] = {
       in: 'path',
       description: 'Role to filter users by',
       required: true,
       type: 'string',
       enum: ['SUPERADMIN', 'ADMIN', 'USER', 'ORG']
     }
     #swagger.responses[200] = {
       description: 'Users retrieved successfully',
       schema: {
         success: true,
         message: 'Users retrieved successfully',
         data: [{
           _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
           userID: 'SM-00001',
           username: 'john_doe',
           email: 'john@example.com',
           fullName: 'John Doe',
           role: 'USER'
         }]
       }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[404] = {
       description: 'Users not found',
       schema: { success: false, message: 'Users not found' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to retrieve users' }
     }
  */
  getUsersByRole
);

router.delete(
  "/",
  isAuthenticated,
  validate(userTypeValidationRules()),
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Delete all users'
     #swagger.description = 'Permanently removes all users from the system. Use with caution!'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.responses[200] = {
       description: 'All users deleted successfully',
       schema: {
         success: true,
         message: 'All users deleted successfully',
         data: {
           deletedCount: 10
         }
       }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to delete all users' }
     }
  */
  deleteAllUsers
);

router.put(
  "/:_id",
  isAuthenticated,
  validate(userUpdateValidationRules()),
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Update user by ID'
     #swagger.description = 'Updates a user\'s information by their MongoDB _id'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['_id'] = {
       in: 'path',
       description: 'MongoDB _id of the user',
       required: true,
       type: 'string',
       example: '507f1f77bcf86cd799439011'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated user information',
       required: true,
       schema: {
         type: 'object',
         properties: {
           username: { type: 'string', example: 'john_doe_updated' },
           email: { type: 'string', example: 'john.updated@example.com' },
           fullName: { type: 'string', example: 'John Updated Doe' },
           role: { type: 'string', enum: ['SUPERADMIN', 'ADMIN', 'USER', 'ORG'] }
         }
       }
     }
     #swagger.responses[200] = {
       description: 'User updated successfully',
       schema: {
         success: true,
         message: 'User updated successfully',
         data: {
           _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
           userID: 'SM-00001',
           username: 'john_doe_updated',
           email: 'john.updated@example.com',
           fullName: 'John Updated Doe',
           role: 'USER'
         }
       }
     }
     #swagger.responses[400] = {
       description: 'Validation error',
       schema: { success: false, message: 'Validation error' }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[404] = {
       description: 'User not found',
       schema: { success: false, message: 'User not found' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to update user' }
     }
  */
  updateUserById
);

module.exports = router;


