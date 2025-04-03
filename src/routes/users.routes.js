const express = require('express');
const router = express.Router();
const passport = require('../config/passport.js');
const localAuthController = require('../controllers/auth.controller.js');
const { userCreateValidationRules } = require('../validators/auth.validator.js');
const validate = require('../middlewares/validation.middleware.js');
const isAuthenticated = require('../middlewares/auth.middleware.js');

/* 
#swagger.tags = ['Authentication']
#swagger.description = 'Authentication endpoints for user registration, login, and OAuth providers'
*/

// Local authentication routes
router.post(
  '/register',
  validate(userCreateValidationRules()),
  /* #swagger.tags = ['Authentication']
     #swagger.summary = 'Register new user'
     #swagger.description = 'Creates a new user account with email and password'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'User registration data',
       required: true,
       schema: {
         type: 'object',
         required: ['email', 'password', 'username', 'fullName'],
         properties: {
           email: {
             type: 'string',
             example: 'john.doe@example.com',
             description: 'Valid email address'
           },
           password: {
             type: 'string',
             example: 'StrongP@ss123',
             description: 'Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special)'
           },
           username: {
             type: 'string',
             example: 'john_doe',
             description: 'Username (3-20 chars, alphanumeric and underscore)'
           },
           fullName: {
             type: 'string',
             example: 'John Doe',
             description: 'Full name (3-50 characters)'
           }
         }
       }
     }
     #swagger.responses[201] = {
       description: 'User registered successfully',
       schema: {
         success: true,
         message: 'Registration successful'
       }
     }
     #swagger.responses[400] = {
       description: 'Validation error',
       schema: {
         success: false,
         message: 'Validation error',
         error: ['Email is required', 'Password is too weak']
       }
     }
     #swagger.responses[409] = {
       description: 'Duplicate entry error',
       schema: {
         success: false,
         message: 'Duplicate entry',
         error: ['Email already exists', 'Username already taken']
       }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: {
         success: false,
         message: 'Failed to register user'
       }
     }
  */
  localAuthController.register
);

router.post(
  '/login',
  passport.authenticate('local'),
  /* #swagger.tags = ['Authentication']
     #swagger.summary = 'Login user'
     #swagger.description = 'Authenticates user with email and password'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Login credentials',
       required: true,
       schema: {
         type: 'object',
         required: ['email', 'password'],
         properties: {
           email: {
             type: 'string',
             example: 'john.doe@example.com'
           },
           password: {
             type: 'string',
             example: 'StrongP@ss123'
           }
         }
       }
     }
     #swagger.responses[200] = {
       description: 'Login successful',
       schema: {
         success: true,
         message: 'Login successful',
         data: {
           user: {
             userID: 'SM-00001',
             username: 'john_doe',
             email: 'john.doe@example.com'
           }
         }
       }
     }
     #swagger.responses[401] = {
       description: 'Unauthorized access',
       schema: {
         success: false,
         message: 'Incorrect email or password'
       }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: {
         success: false,
         message: 'Error during login'
       }
     }
  */
  localAuthController.loginSuccess
);

router.post(
  '/logout',
  isAuthenticated,
  /* #swagger.tags = ['Authentication']
     #swagger.summary = 'Logout user'
     #swagger.description = 'Logs out the currently authenticated user and invalidates their session'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.responses[200] = {
       description: 'Logout successful',
       schema: {
         success: true,
         message: 'Logged out successfully'
       }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: {
         success: false,
         message: 'Not authenticated'
       }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: {
         success: false,
         message: 'Error during logout'
       }
     }
  */
  localAuthController.logout
);

// GitHub authentication routes
router.get('/github', 
  /* #swagger.tags = ['Authentication']
     #swagger.summary = 'GitHub OAuth login'
     #swagger.description = 'Initiates GitHub OAuth authentication flow by redirecting to GitHub login page'
     #swagger.responses[302] = {
       description: 'Redirects to GitHub authorization page'
     }
  */
  passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login.html' }),
  /* #swagger.tags = ['Authentication']
     #swagger.summary = 'GitHub OAuth callback'
     #swagger.description = 'Handles the callback from GitHub OAuth authentication'
     #swagger.responses[302] = {
       description: 'Redirects to dashboard on success, login page on failure'
     }
     #swagger.responses[400] = {
       description: 'OAuth error',
       schema: {
         success: false,
         message: 'GitHub authentication failed'
       }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: {
         success: false,
         message: 'Error during GitHub authentication'
       }
     }
  */
  (req, res) => res.redirect('/dashboard.html')
);

// Google authentication routes
router.get('/google', 
  /* #swagger.tags = ['Authentication']
     #swagger.summary = 'Google OAuth login'
     #swagger.description = 'Initiates Google OAuth authentication flow by redirecting to Google login page'
     #swagger.responses[302] = {
       description: 'Redirects to Google authorization page'
     }
  */
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login.html' }),
  /* #swagger.tags = ['Authentication']
     #swagger.summary = 'Google OAuth callback'
     #swagger.description = 'Handles the callback from Google OAuth authentication'
     #swagger.responses[302] = {
       description: 'Redirects to dashboard on success, login page on failure'
     }
     #swagger.responses[400] = {
       description: 'OAuth error',
       schema: {
         success: false,
         message: 'Google authentication failed'
       }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: {
         success: false,
         message: 'Error during Google authentication'
       }
     }
  */
  (req, res) => res.redirect('/dashboard.html')
);

module.exports = router;

