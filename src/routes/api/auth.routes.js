// src/api/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const passport = require('../../config/passport');
const localAuthController = require('../../controllers/auth.controller.js');
const { userCreateValidationRules } = require('../../validators/auth.validator');
const validate = require('../../middlewares/validation.middleware');
// Local Authentication
router.post('/register', validate(userCreateValidationRules()),localAuthController.register); 
router.post('/login', passport.authenticate('local'), localAuthController.loginSuccess); 
// GitHub Authentication
router.get('/github', passport.authenticate('github', { scope: ['user:email'] })); 
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), localAuthController.githubSuccess); 

// Google Authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] })); 
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), localAuthController.googleSuccess); 

// Logout
router.post('/logout', (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Logged out successfully' }); 
  });
});

module.exports = router;