const express = require('express');
const router = express.Router();
const passport = require('../config/passport.js');
const localAuthController = require('../controllers/auth.controller.js');
const { userCreateValidationRules } = require('../validators/auth.validator.js');
const validate = require('../middlewares/validation.middleware.js');
const isAuthenticated = require('../middlewares/auth.middleware.js');

// Local authentication routes
router.post(
  '/register',
  validate(userCreateValidationRules()),
  /* #swagger.tags = ['Authentication'] */
  /* #swagger.description = 'Endpoint to register a new user' */
  localAuthController.register
);

router.post(
  '/login',
  passport.authenticate('local'),
  /* #swagger.tags = ['Authentication'] */
  /* #swagger.description = 'Endpoint to login an existing user' */
  localAuthController.loginSuccess
);

router.post(
  '/logout',
  isAuthenticated,
  /* #swagger.tags = ['Authentication'] */
  /* #swagger.description = 'Endpoint to logout the current user' */
  localAuthController.logout
);

// GitHub authentication routes
router.get('/github', 
  /* #swagger.tags = ['Authentication'] */
  /* #swagger.description = 'Endpoint to initiate GitHub authentication' */
  passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login.html' }),
  /* #swagger.tags = ['Authentication'] */
  /* #swagger.description = 'Callback endpoint for GitHub authentication' */
  (req, res) => {
    // Successful authentication, redirect to dashboard or wherever.
    res.redirect('/dashboard.html');
  }
);

// Google authentication routes
router.get('/google', 
  /* #swagger.tags = ['Authentication'] */
  /* #swagger.description = 'Endpoint to initiate Google authentication' */
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login.html' }),
  /* #swagger.tags = ['Authentication'] */
  /* #swagger.description = 'Callback endpoint for Google authentication' */
  (req, res) => {
    // Successful authentication, redirect to dashboard or wherever.
    res.redirect('/dashboard.html');
  }
);

module.exports = router;
