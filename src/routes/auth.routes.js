// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const passport = require('../config/passport.js');
const localAuthController = require('../controllers/auth.controller.js');
const { userCreateValidationRules } = require('../validators/auth.validator.js');
const validate = require('../middlewares/validation.middleware.js');

// Local Authentication
router.post(
  '/register',
  validate(userCreateValidationRules()),
  /* #swagger.tags = ['Auth'] */
  /* #swagger.description = 'Endpoint to register a new user' */
  /* #swagger.responses[201] = { description: 'Registration successful' } */
  /* #swagger.responses[400] = { description: 'Validation error' } */
  /* #swagger.responses[409] = { description: 'Email already exists' } */
  localAuthController.register
);

router.post(
  '/login',
  passport.authenticate('local'),
  /* #swagger.tags = ['Auth'] */
  /* #swagger.description = 'Endpoint to login a user' */
  /* #swagger.responses[200] = { description: 'Login successful' } */
  /* #swagger.responses[401] = { description: 'Authentication failed' } */
  localAuthController.loginSuccess
);

// GitHub Authentication
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  /* #swagger.tags = ['Auth'] */
  /* #swagger.description = 'GitHub authentication endpoint' */
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  /* #swagger.tags = ['Auth'] */
  /* #swagger.description = 'GitHub authentication callback endpoint' */
  /* #swagger.responses[200] = { description: 'GitHub login successful' } */
  /* #swagger.responses[401] = { description: 'GitHub authentication failed' } */
  localAuthController.githubSuccess
);

// Google Authentication
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  /* #swagger.tags = ['Auth'] */
  /* #swagger.description = 'Google authentication endpoint' */
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  /* #swagger.tags = ['Auth'] */
  /* #swagger.description = 'Google authentication callback endpoint' */
  /* #swagger.responses[200] = { description: 'Google login successful' } */
  /* #swagger.responses[401] = { description: 'Google authentication failed' } */
  localAuthController.googleSuccess
);

// Logout
router.post(
  '/logout',
  /* #swagger.tags = ['Auth'] */
  /* #swagger.description = 'Endpoint to logout a user' */
  /* #swagger.responses[200] = { description: 'Logged out successfully' } */
  (req, res) => {
    req.logout(() => {
      res.status(200).json({ message: 'Logged out successfully' });
    });
  }
);

module.exports = router;
